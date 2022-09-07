<?php
header('Access-Control-Allow-Origin:*');
header('Content-Type: application/json');

include_once '../../config/Database.php';
include_once '../../models/Availabilities.php';

$database= new Database();
$db=$database->connect();

$availabilities=new Availabilities($db);

$availabilities->date=isset($_GET['date'])?$_GET['date']:die();
$res= $availabilities->readDay();
$num = $res->rowCount();;

if($num >0){
    $availavilities_arr= array();
    $availabilities_arr['data']= array();

    while($row = $res->fetch(PDO::FETCH_ASSOC)){
        extract($row);
        $availabilities_item= array(
            'id' => $id,
            'start'=>$start,
            'end'=>$end,
            'date'=>$date
        );
     array_push($availabilities_arr['data'],$availabilities_item);   
    }

echo json_encode($availabilities_arr);
}else{
echo json_encode(array('message'=>'No Availavilities Found'));
}
?>