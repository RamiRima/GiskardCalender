<?php
header('Access-Control-Allow-Origin:*');
header('Content-Type: application/json');

include_once '../../config/Database.php';
include_once '../../models/Reservations.php';

$database= new Database();
$db=$database->connect();

$reservations=new Reservations($db);

$reservations->date=isset($_GET['date'])?$_GET['date']:die();
$res= $reservations->readDay();
$num = $res->rowCount();;

if($num >0){
    $reservations_arr= array();
    $reservations_arr['data']= array();

    while($row = $res->fetch(PDO::FETCH_ASSOC)){
        extract($row);
        $reservations_item= array(
            'id' => $id,
            'start'=>$start,
            'end'=>$end,
            'date'=>$date,
            'title'=>$title,
            'email'=>$email
        );
     array_push($reservations_arr['data'],$reservations_item);   
    }

echo json_encode($reservations_arr);
}else{
echo json_encode(array('message'=>'No Reservations Found'));
}
?>