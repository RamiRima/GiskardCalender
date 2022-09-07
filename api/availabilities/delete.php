<?php
header('Access-Control-Allow-Origin:*');
header('Content-Type: application/json');
header('AccessCOntrol-Allow-Methods: DELETE,POST');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');
include_once '../../config/Database.php';
include_once '../../models/Availabilities.php';

$database= new Database();
$db=$database->connect();

$availabilities=new Availabilities($db);

$data= json_decode(file_get_contents("php://input"));

$availabilities->id=$data->id;
if($availabilities->delete()==1){
    echo json_encode(array('message'=>'Deleted'));
}else{
    echo json_encode(array('message'=>'Not Deleted'));

}

?>