<?php
namespace multiEmpresa\multiEmpresaController;

use multiEmpresa\multiEmpresaModel AS ClaseMultiEmpresaModelo;
require_once __DIR__ . '../../model/multiEmpresasM.php';

class multiEmpresaController {
    function getConexionModelClass(){
        return $model_class = new ClaseMultiEmpresaModelo\multiEmpresaModel();
    }

    function comboEmpresa( $data ){
        $model_mascotas = $this->getConexionModelClass();

        $result_model = $model_mascotas->comboEmpresa($data);
        return $result_model;
    }

    function obtenerInfoEmpresa( $data ){
        $model_mascotas = $this->getConexionModelClass();

        $result_model = $model_mascotas->obtenerInfoEmpresa($data);
        return $result_model;
    }

    function guardarEmpleado( $data ){
        $model_mascotas = $this->getConexionModelClass();

        $result_model = $model_mascotas->guardarEmpleado($data);
        return $result_model;
    }

    function eliminarEmpleado( $data ){
        $model_mascotas = $this->getConexionModelClass();

        $result_model = $model_mascotas->eliminarEmpleado($data);
        return $result_model;
    }
}