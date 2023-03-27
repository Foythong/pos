<?php
    require_once("condb.php");
    $conn = dbcon();
    $act = $_POST["act"];
    
    $request = json_decode(file_get_contents("php://input")); //แปลงjson obj ให้เป็น json php
    $act = $request->act;
    $sum = $request->sum;

if($act == 'all_menu'){
    $sql = "SELECT COUNT(menuName) as allMenu FROM Menu";
    echo getDB($sql,$conn);
  }

if($act == 'all_admin'){
    $sql = "SELECT COUNT(Username) as all_Admin FROM formMember where memType = 'admin'";
    echo getDB($sql,$conn);
  }

if($act == 'all_memBer'){
    $sql = "SELECT COUNT(Username) as all_mem FROM formMember where memType = 'member'";
    echo getDB($sql,$conn);
  }

  if($act == 'all_order'){
    $sql = "SELECT SUM(Price) as today_sum FROM `Summary` where Order_date";
    echo getDB($sql,$conn);
  }


?>