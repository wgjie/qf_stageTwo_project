<?php
header("content-type:text/html;charset=utf8");
$id = $_GET['id'];
include('mysql.php');
$res = mysqli_query($con,"delete from admin where id=$id");
if($res){
    $arr = [
        "meta"=>[
            "status"=>0,
            "msg"=>'删除成功'
        ]
    ];
}else{
    $arr = [
        "meta"=>[
            "status"=>1,
            "msg"=>'删除失败'
        ]
    ];
}
echo json_encode($arr);