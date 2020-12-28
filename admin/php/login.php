<?php
header("content-type:text/html;charset=utf8");
$username = $_POST['username'];
$password = $_POST['password'];
include('mysql.php');
$res = mysqli_query($con,"select * from admin where username='$username' and password='$password'");
$row = mysqli_fetch_assoc($res);
if($row){
    $arr = [
        "meta"=>[
            "status"=>0,
            "msg"=>'登录成功'
        ]
    ];
}else{
    $arr = [
        "meta"=>[
            "status"=>1,
            "msg"=>'用户名或密码错误'
        ]
    ];
}
echo json_encode($arr);