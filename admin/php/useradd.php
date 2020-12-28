<?php
header("content-type:text/html;charset=utf8");
$username = $_POST['username'];
$password = $_POST['pass'];
include('mysql.php');
$res = mysqli_query($con,"select * from admin where username='$username'");
$row = mysqli_fetch_assoc($res);
if($row){
    $arr = [
        "meta"=>[
            "status"=>2,
            "msg"=>'用户名被占用'
        ]
    ];
}else{
    $res = mysqli_query($con,"insert admin(username,password) values('$username','$password')");
    if($res){
        $arr = [
            "meta"=>[
                "status"=>0,
                "msg"=>'新增成功'
            ]
        ];
    }else{
        $arr = [
            "meta"=>[
                "status"=>1,
                "msg"=>'新增失败'
            ]
        ];
    }
}
echo json_encode($arr);