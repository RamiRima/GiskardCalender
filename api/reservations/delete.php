<?php
header('Access-Control-Allow-Origin:*');
header('Content-Type: application/json');
header('AccessCOntrol-Allow-Methods: DELETE,POST');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');
include_once '../../config/Database.php';
include_once '../../models/Reservations.php';

$database= new Database();
$db=$database->connect();

$reservations=new Reservations($db);

$data= json_decode(file_get_contents("php://input"));

$reservations->date=$data->date;
$reservations->start=$data->start;
$reservations->email=$data->email;
$num=$reservations->delete();
if($num==1){
    echo json_encode(array('message'=>'Deleted'));
}else{
    if($num==0){
    echo json_encode(array('message'=>'Not Deleted'));

    }
    else{
    echo json_encode(array('message'=>'Not Yours'));
    }
}
?>