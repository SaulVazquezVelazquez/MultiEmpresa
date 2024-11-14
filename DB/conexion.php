<?php

namespace conexionDB\Code;
class ConexionDB {
    public $serverName;
    public $serverUser;
    public $serverPassword;
    public $serverDataBaseName;

    function __construct(){
        $this->serverName = 'localhost';
        $this->serverUser = 'root';
        $this->serverPassword = '';
        $this->serverDataBase = 'bdmultiempresa';
        $this->serverCharacter = 'UTF-8';
    }

    function getConectaDB(){
        $conexion = mysqli_connect( $this->serverName, $this->serverUser,$this->serverPassword, $this->serverDataBase );
        if( $conexion ) {
            return $conexion;
        }else{
            die( print_r( mysqli_errors(), true));
        }
    }
    function sqlDesconectaDB( $conexion ){
        mysqli_close( $conexion );
    }

    function sqlLiberaStmt( $stmt ){
        mysqli_free_stmt( $stmt );
    }
}
?>