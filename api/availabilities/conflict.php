<?php
header('Access-Control-Allow-Origin:*');
header('Content-Type: application/json');
header('AccessCOntrol-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');
include_once '../../config/Database.php';
include_once '../../models/Availabilities.php';

$database= new Database();
$db=$database->connect();

$availabilities=new Availabilities($db);

$data=json_decode(file_get_contents("php://input"));

$availabilities->start=date('H:i:s',strtotime($data->start));
$availabilities->end=date('H:i:s',strtotime($data->end));
$availabilities->date=$data->date;
echo $availabilities->start;

if($availabilities->conflict()==0){
    echo json_encode(array('message'=>'No Conflict'));
}else{
    echo json_encode(array('message'=>'Conflict'));

}
?>