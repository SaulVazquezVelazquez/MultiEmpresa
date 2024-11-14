<?php
namespace multiEmpresa\multiEmpresaModel;

use conexionDB\Code AS ClaseConexionDB;

require_once ( __DIR__ . '../../DB/conexion.php' );

class multiEmpresaModel{ 

    function comboEmpresa($data) {
        $db = new ClaseConexionDB\ConexionDB();
        $conexion = $db->getConectaDB();

        $sql = "SELECT id_empresa , nombre_empresa FROM empresas";

        $stmt = mysqli_query($conexion, $sql);

        $array = [];

        if($stmt){
            $rowcount=mysqli_num_rows($stmt);   
            if ( $rowcount ) {
                while($row = mysqli_fetch_assoc($stmt)) {
                    $array[] =$row;
                }
        
                $resp = json_encode(['status' => 200, 'data' => $data , 'resp' => $array]);
            }
        }else {
            $resp = json_encode(['status' => 500, 'data' => $data , 'resp' => sqlsrv_errors( SQLSRV_ERR_ALL )]);
        }

        return $resp;
    }

    function obtenerInfoEmpresa($data) {
        $db = new ClaseConexionDB\ConexionDB();
        $conexion = $db->getConectaDB();

        $id_empresa = $data['empresa'];

        $sql = "SELECT id_empleado, nombre , puesto , salario , FK_id_empresa  FROM empleados where FK_id_empresa = $id_empresa AND status = 1";

        $stmt = mysqli_query($conexion, $sql);

        $array = [];

        if($stmt){
            $rowcount=mysqli_num_rows($stmt);   
            if ( $rowcount ) {
                while($row = mysqli_fetch_assoc($stmt)) {
                    $array[] =$row;
                }
        
                $resp = json_encode(['status' => 200, 'data' => $data , 'resp' => $array]);
            }
        }else {
            $resp = json_encode(['status' => 500, 'data' => $data , 'resp' => sqlsrv_errors( SQLSRV_ERR_ALL )]);
        }

        return $resp;
    }

    function guardarEmpleado($data) {

        $db = new ClaseConexionDB\ConexionDB();
        $conexion = $db->getConectaDB();

        
        if ($data['action'] == 'editEmpleado') {
            $nombre = $data['nombre'];
            $puesto = $data['puesto'];
            $salario = $data['salario'];
            $id_empleado = $data['id_empleado'];
            
            $sql = "UPDATE empleados SET nombre = '$nombre', puesto = '$puesto', salario = $salario WHERE id_empleado = $id_empleado";
    
            $stmt = mysqli_query($conexion, $sql);
    
            if ($stmt) {
                $resp = json_encode(['status' => 200, 'data' => $data , 'resp' => $sql ]);    
            }else {
                $resp = json_encode(['status' => 500, 'data' => $data , 'resp' => $sql ]);
            }

        }else{
            $nombre = $data['nombre'];
            $puesto = $data['puesto'];
            $salario = $data['salario'];
            $FK_id_empresa = $data['empresa'];
            
            $sql = "INSERT INTO empleados (nombre , puesto , salario , FK_id_empresa)
            VALUES ('$nombre' , '$puesto' , $salario , $FK_id_empresa)";
    
            $stmt = mysqli_query($conexion, $sql);
    
            if ($stmt) {
                $resp = json_encode(['status' => 200, 'data' => $data , 'resp' => $sql ]);    
            }else {
                $resp = json_encode(['status' => 500, 'data' => $data , 'resp' => sqlsrv_errors( SQLSRV_ERR_ALL )]);
            }
        }

        return $resp;
    }

    function eliminarEmpleado($data) {

        $db = new ClaseConexionDB\ConexionDB();
        $conexion = $db->getConectaDB();

        $id_empleado = $data['id_empleado'];
        
        $sql = "UPDATE empleados SET status = 0 WHERE id_empleado = $id_empleado";

        $stmt = mysqli_query($conexion, $sql);

        if ($stmt) {
            $resp = json_encode(['status' => 200, 'data' => $data , 'resp' => $sql]);    
        }else {
            $resp = json_encode(['status' => 500, 'data' => $data , 'resp' => sqlsrv_errors( SQLSRV_ERR_ALL )]);
        }

        return $resp;
    }
}