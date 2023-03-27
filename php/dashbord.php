<?php
require_once("condb.php");
$conn = dbcon();

$request = json_decode(file_get_contents("php://input")); //แปลงjson obj ให้เป็น json php
$act = $request->act;
$sum = $request->sum;


if($act == "select"){
    $sql = "SELECT Order_date, SUM(Price) as sum_price FROM Summary GROUP BY Order_date";
    echo getDB($sql,$conn);
}


if($act == "get"){
    echo $sum;
    $date = date("Y-m-d");
    $sql  = "INSERT INTO `Summary`(`Price`,`Order_date`) VALUES ('$sum','$date')";
    echo updateDB($sql,"เพิ่ม",$conn);
}

?>