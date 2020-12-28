<?php
header("content-type:text/html;charset=utf8");
$username = $_POST['username'];
$password = $_POST['password'];
$id = $_POST['id'];
include('mysql.php');
$res = mysqli_query($con,"select * from admin where username='$username'");
$row = mysqli_fetch_assoc($res);
if($row['id']!==$id && $row){
    $arr = [
        "meta"=>[
            "status"=>2,
            "msg"=>'用户名被占用'
        ]
    ];
}else{
    $res = mysqli_query($con,"update admin set username='$username',password='$password' where id=$id");
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
}
echo json_encode($arr);