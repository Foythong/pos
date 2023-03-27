<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT');
header('Access-Control-Allow-Headers: Content-Type');
require_once("condb.php");
$conn = dbcon();
$act = $_POST["act"];

if($act == "add_mem") {
    $valid_extensions = array('jpg','png','jpeg');
    $Username = $_POST["Username"];
    $Pass = md5($_POST["Pass"]);
    $memType = $_POST["memType"];
    $Fname = $_POST["Fname"];
    $Lname = $_POST["Lname"];
    $Phone = $_POST["Phone"];
    $target_dir = "assets/uploadmem/";
    $imgMem = basename($_FILES["Images"]["name"]); //เก็บชื่อไฟล์รูปที่อัพโหลด 
    $location =  $target_dir.$imgMem; 
    $fileImages = $_FILES["Images"]["tmp_name"];  //เก็บตำแหน่งของรูปที่อัพโหลด

    $imageFileType = strtolower(pathinfo($imgMem,PATHINFO_EXTENSION));  //เลือกประเภทไฟล์
    if($imgMem != null) {
        /* Check file extension */
        if(in_array($imageFileType,$valid_extensions)) {
            /* Upload file */
            if(move_uploaded_file($fileImages,$location)){
                $sql = "INSERT INTO formMember (`Username`, `Pass`, `Fname`, `Lname`, `Phone`, `memType`, `Images`) VALUES ('$Username','$Pass','$Fname','$Lname','$Phone','$memType','$imgMem')";
                // die ($sql);
                $result = updateDB($sql,"เพิ่ม",$conn);
                echo ($result);
            } else {
                $resp['status'] = 0;
                $resp['message'] = 'upload fail';
                $resp['icon'] = 'error';
                echo json_encode($resp);
            }
        } else {
            $resp['status'] = 0;
            $resp['message'] = 'Invalid file extension jpg,pan,jpeg';
            $resp['icon'] = 'error';
            echo json_encode($resp);
        }
    } else {
        $resp['status'] = 1000;
        $resp['message'] = 'Please enter a picture';
        $resp['icon'] = 'error';
        echo json_encode($resp);
    }
}


if ($act == "edit_mem") {
    $id = $_POST["id"];
    $Fname = $_POST["Fname"];
    $Lname = $_POST["Lname"];
    $Phone = $_POST["Phone"]; 
    $img = $_FILES["img"]; 
    $img_edit = basename($_FILES["img"]["name"]); //เก็บชื่อไฟล์รูปที่อัพโหลด
    $tmp = $_FILES["img"]["tmp_name"];  //เก็บตำแหน่งของรูปที่อัพโหลด
    //เมื่อไม่ได้แก้ไขรูปภาพ
    if ($img_edit == null) {
        $sql_img = "UPDATE `formMember` SET  Fname = '$Fname' ,  Lname = '$Lname' , Phone ='$Phone' WHERE id = '$id'";
        echo updateDB($sql_img, "edit", $conn);
        // die ($sql_img);
    } else {  //เมื่อแก้ไขรูปภาพ
        $path = "assets/uploadmem/";
        $valid_extensions = array('jpeg', 'jpg', 'png');
        // $final_image = rand(1000, 1000000) . $img_edit;
        // $img_path =  $final_image;
        $ext = strtolower(pathinfo($img_edit, PATHINFO_EXTENSION));
        if (in_array($ext, $valid_extensions)) {
            //ดึงข้อมูลรูป
            $selectimg = "SELECT `Images` FROM `formMember` WHERE id= $id";
            $result = json_decode(getDB($selectimg,$conn));

            if($result->status == 1){
                //ลบรูปภาพเก่าที่เคยลงไว้
                if(unlink($path.$result->data[0]->Images)){
                    if(move_uploaded_file($tmp,$path.$img_edit)){
                        $sql = "UPDATE `formMember` SET  Fname = '$Fname' ,  Lname = '$Lname' , Phone ='$Phone' , Images = '$img_edit' WHERE id = '$id'";
                        echo updateDB($sql,"edit",$conn);
                    }else{
                        //หากอัพเดทรูปไม่สำเร็จ
                        $msg['status'] = 0;
                        $msg['message'] = "upload image failed";
                        $msg['icon'] ="error";
                        echo json_encode($msg);
                    }
                }else{
                    //หากลบรูปไม่สำเร็จ
                    $msg['status'] = 0;
                    $msg['message'] ="delete image failed";
                    $msg['icon'] ="error";
                    echo json_encode($msg);
                }
            }
        }
    }
}



//ดึงข้อมูลมา
if ($act == 'select') {
    $id = $_POST["id"];
    $sql = "SELECT * FROM  `formMember` WHERE id = '$id'";
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
        echo json_encode($result->fetch_all(MYSQLI_ASSOC));
    } else {
        $resp['status'] = 0;
        $resp['message'] = $conn->error;
        echo json_encode($resp);
    }
}

//ลบ
if ($act == "del") {
    $id = $_POST["id"];
    $sql = "DELETE FROM formMember WHERE id = '$id'";
    echo updateDB($sql,"delete",$conn); 
}

?>