<?php
require_once("condb.php");
$conn = dbcon();
// $act = $_POST["act"];
$sql = "SELECT id, menuName, Price, imgMenu FROM Menu WHERE id";
echo getDB($sql,$conn);


    
?>