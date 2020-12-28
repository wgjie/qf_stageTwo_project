<?php
header("content-type:text/html;charset=utf8");
$username = $_POST['username'];
$password = $_POST['pass'];
include('mysql.php');
$res = mysqli_query($con,"update admin set password='$password' where username='$username'");
if($res){
    $arr = [
        "meta"=>[
            "status"=>0,
            "msg"=>'修改成功'
        ]
    ];
}else{
    $arr = [
        "meta"=>[
            "status"=>1,
            "msg"=>'修改失败'
        ]
    ];
}
echo json_encode($arr);