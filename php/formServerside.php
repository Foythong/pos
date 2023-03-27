<?php
     require_once("condb.php");
    $table = 'formMember';
    $primaryKey = 'id';
    $columns = array(
        // array('db' => 'id', 'dt' => 0),
        array('db' => 'Fname', 'dt' => 0),
        array('db' => 'Lname', 'dt' => 1),
        array('db' => 'Phone', 'dt' => 2),
        array('db' => 'memType', 'dt' =>3),
        array(
            'db' => 'Images',
            'dt' => 4,
            'formatter' => function( $d, $row){
                return '<img src="../php/assets/uploadmem/'.$d.'" class="zoom" style="height: 45px;width: 45px;aling:middle;">'; 
            }
        ),
        array(
            'db'        => 'id',
            'dt'        => 5,
            'formatter' => function( $id, $row ) {
                return "<button type='button' onclick=showEdit('$id')  data-bs-toggle='modal' data-bs-target='#memModal'  style='background:orange;color:black;padding:10px 15px;border:none;border-radius: 10px;'>แก้ไข</button>
                "."  ".
                 "<button onclick=delRow('$id') style='background:#C70039 ;color:white;padding:10px 15px;border:none;border-radius: 10px;'>ลบ</button>";
              }
        )
    );

    $sql_details = array(
        'user' => 's64309030006',
        'pass' => '123456',
        'db' => 'P643_64309030006',
        'host' => 'localhost'
    );

    require('ssp.class.php');
    echo json_encode(SSP::simple($_GET,$sql_details,$table,$primaryKey,$columns));    
?>