<?php
header('Access-Control-Allow-Origin:*');
header('Content-Type: application/json');
header('AccessCOntrol-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');
include_once '../../config/Database.php';
include_once '../../models/Reservations.php';

$database= new Database();
$db=$database->connect();

$reservations=new Reservations($db);

$data=json_decode(file_get_contents("php://input"));

$reservations->start=date('H:i:s',strtotime($data->start));
$reservations->end=date('H:i:s',strtotime($data->end));
$reservations->date=$data->date;
$reservations->title=$data->title;
$reservations->email=$data->email;

if($reservations->create()){
    echo json_encode(array('message'=>'Created'));
}else{
    echo json_encode(array('message'=>'Not Created'));

}

?>