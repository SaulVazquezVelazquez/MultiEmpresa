<?php
use multiEmpresa\multiEmpresaController as ClassControllermultiEmpresa;
require_once  __DIR__ ."../../controller/empresaUsuarioCtrl.php";

$data = $_POST;

$controller = new ClassControllermultiEmpresa\multiEmpresaController();
$result = $controller->eliminarEmpleado($data);
echo $result;

?>