$(document).ready(async function() {
    // Código jQuery cuando el documento está listo
    sessionStorage.setItem('empresa', '');
    llenarComboEmpresas();    

});

async function llenarComboEmpresas(empresa = "all") {
    const data = { 
        action : "llenarCombos",
        empresa : empresa,
    };

    $.ajax({
        type: "POST",
        url: "views/comboEmpresaView.php",
        data: data, 
        dataType: "JSON",
        success: function (response) {
            console.log("Response");
            console.log(response);

            let options;
            let template;

            if(response.status !== 500){
                let data = response.resp;
                console.log(data);

                data.forEach(element => {
                    options += `<option value = ${element.id_empresa}>${element.nombre_empresa}</option>`;
                });

                template = `<select class="form-control" id="slct_empresa" onChange ="obtenerInfoEmpresa()">    
                <option value = "">--- ---</option>
                ${options}
                </select>
                `;

                $("#div_slct_empresa").html(template);
            }else{
                console.error("Algo ocurrio");
            }



        }
    });
}

function imprimirPDF() {
    
    let empresaSession = sessionStorage.getItem('empresa');

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Usa autoTable para generar el PDF desde la tabla
    doc.autoTable({ html: '#table_empleados' });

    // Guarda el PDF con el nombre "tabla.pdf"
    doc.save('tabla.pdf');

    // if (empresaSession !== '') {
    //     console.log("Vamos a imprimir empleados" , empresaSession);    

    //     const data = { 
    //         action : "tableEmpleados",
    //         empresa : empresaSession,
    //     };
    
    //     $.ajax({
    //         type: "POST",
    //         url: "model/empresaUsuarioM.php",
    //         data: data, 
    //         dataType: "JSON",
    //         success: function (response) {
    //             console.log("Response Impr PDF");
    //             console.log(response);

    //             const { jsPDF } = window.jspdf;
    //             const doc = new jsPDF();
    
    //             // Usa autoTable para generar el PDF desde la tabla
    //             doc.autoTable({ html: '#miTabla' });
    
    //             // Guarda el PDF con el nombre "tabla.pdf"
    //             doc.save('tabla.pdf');
    //             // if(response.status !== 500){
    //             //     let data = response.resp;
    //             //     console.log(data);
    
    //             //     data.forEach(element => {
    //             //         template_body += `
    //             //         <tr>
    //             //             <th>${element['id_empleado']}</th>
    //             //             <td>${element['nombre']}</td>
    //             //             <td>${element['puesto']}</td>
    //             //             <td>${element['salario']}</td>
    //             //             <td>
    //             //             <button class = "btn btn-primary btn-block" onClick ='editarEmpleado(${JSON.stringify( element)})'>Editar</button>
    //             //             <button class = "btn btn-danger btn-block" onClick ="eliminarEmpleado(${element['id_empleado']})">Elimnar</button> 
    //             //             </td>
    //             //         </tr>
    //             //     `;
    //             //     });
    
    //             //     $("#body_empleados").html(template_body);
    //             // }
    
    //         }
    //     });
    // }
    
}

async function obtenerInfoEmpresa() {

    let empresaSession = $("#slct_empresa").val();
    sessionStorage.setItem('empresa' , empresaSession);

    if (empresaSession !== '') {
        $("#cont_empresa").prop('hidden' , false);
        $("#btn_impresion").prop('hidden' , false);
        $("#btn_nuevo").prop('hidden' , false);
        $("#nombre").val('');
        $("#puesto").val('');
        $("#salario").val('');
        
        const tablaEmp = await tableEmpleados(empresaSession);


    }else{
        $("#cont_empresa").prop('hidden' , true);
        $("#btn_impresion").prop('hidden' , true);
        $("#btn_nuevo").prop('hidden' , true);
        
    }
}


async function tableEmpleados(id_empresa) {
    const data = { 
        action : "tableEmpleados",
        empresa : id_empresa,
    };

    $.ajax({
        type: "POST",
        url: "views/obtenerInfoEmpresaView.php",
        data: data, 
        dataType: "JSON",
        success: function (response) {
            console.log("Response Table");
            console.log(response);

            let options;
            let template_body;

            if(response.status !== 500){
                let data = response.resp;
                console.log(data);

                data.forEach(element => {
                    template_body += `
                    <tr>
                        <th>${element['id_empleado']}</th>
                        <td>${element['nombre']}</td>
                        <td>${element['puesto']}</td>
                        <td>${element['salario']}</td>
                        <td>
                        <button class = "btn btn-primary btn-block" onClick ='editarEmpleado(${JSON.stringify( element)})'>Editar</button>
                        <button class = "btn btn-danger btn-block" onClick ="eliminarEmpleado(${element['id_empleado']})">Elimnar</button> 
                        </td>
                    </tr>
                `;
                });

                $("#body_empleados").html(template_body);
            }else{
                console.error("Algo ocurrio");
            }

        }
    });
}

function editarEmpleado(data_empleado) {

    console.log("edit empleado");
    console.log(data_empleado);
    $("#formEmpleado").prop('hidden' , false);

    $("#nombre").val(data_empleado.nombre);
    $("#nombre").attr('id_empleado' , data_empleado.id_empleado);
    $("#puesto").val(data_empleado.puesto);
    $("#salario").val(data_empleado.salario);

    $("#btn_guardar_empleado").attr('edit', true);

}

function guardarEmpleado() {

    let tipo_accion = $("#btn_guardar_empleado").attr('edit');

    let data;
    if (tipo_accion == "true") {
        data = { 
            action : "editEmpleado",
            id_empleado : $("#nombre").attr('id_empleado'),
            nombre : $("#nombre").val(),
            puesto: $("#puesto").val(),
            salario : $("#salario").val(),
        };
    }else{
        data = { 
            action : "registrarEmpleado",
            nombre : $("#nombre").val(),
            puesto: $("#puesto").val(),
            salario : $("#salario").val(),
            empresa : sessionStorage.getItem('empresa')
        };
    }


    $.ajax({
        type: "POST",
        url: "views/guardarEmpleadoView.php",
        data: data, 
        dataType: "JSON",
        success: function (response) {
            console.log("Response REg / edit");
            console.log(response);

            if(response.status !== 500){

                let empresa = sessionStorage.getItem('empresa')
                tableEmpleados(empresa);
                $("#nombre").val('');
                $("#puesto").val('');
                $("#salario").val('');
                alert("Exito");
                $("#btn_guardar_empleado").attr('edit', false);
            }else{
                console.error("Algo ocurrio");
            }

        }
    });
}


function nuevoEmpleado() {
    $("#formEmpleado").prop('hidden' , false);
    $("#btn_guardar_empleado").attr('edit', false);
    $("#nombre").val('');
    $("#puesto").val('');
    $("#salario").val('');
}

function eliminarEmpleado(id_empleado) {

    const data = { 
        action : "bajaEmpleado",
        id_empleado : id_empleado,
    };

    $.ajax({
        type: "POST",
        url: "views/eliminarEmpleadoView.php",
        data: data, 
        dataType: "JSON",
        success: function (response) {
            console.log("Response Table");
            console.log(response);

            if(response.status !== 500){

                let empresa = sessionStorage.getItem('empresa')
                tableEmpleados(empresa);
                alert("Exito Baja");
            }else{
                console.error("Algo ocurrio");
            }

        }
    });

}