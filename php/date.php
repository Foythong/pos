<?php
 require_once("condb.php");
$conn = dbcon();


$date = date("d-m-Y");
$time = date("H:i:s");
     
    echo "Date ".$date." Time ".$time;
    
?>

