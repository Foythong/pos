<?php
//    session_start(); 
   require_once("condb.php");
    $conn = dbcon();
     $act = $_POST["act"];
     if($act == 'login'){
         $time = time() + (86400 * 30);
         $Username = $_POST["Username"];
         $Pass = md5($_POST["Pass"]);
         
         $sql = "SELECT * FROM formMember WHERE Username = '$Username'";
         $result = json_decode(getDB($sql,$conn));
        //  echo json_encode($result);

         if($result->status == 1){
            $data = $result->data[0];
            // echo json_encode($data);
             if($data->Pass == $Pass){
                $User["username"] =  $data->Username;
                $User["userimg"] =  $data->Images;
                $User["memType"] =  $data->memType;
                // $User["User"] = $data->Fname;
                setcookie("User",json_encode($User),$time,"/");
                $msg['status'] = 1;
                $msg['message'] = "เข้าสู่ระบบ";
             }else{
                 $msg['status'] = 0;
                 $msg['message'] = "ไม่พบผู้ใช่งาน";
             }
         }else{
             $msg['status'] = 0;
             $msg['message'] = "ไม่สามารถเข้าถึงข้อมูลได้";
         }
         echo json_encode($msg);
     }

    //      if($act == "getSession"){
    //          $loginStatus['Username'] = $_SESSION['Username'];
    //          $loginStatus['Pass'] = $_SESSION['Pass'];
    //          $loginStatus['memType'] = $_SESSION['memType'];
    //          echo json_encode($loginStatus);
    //  }

 ?>
