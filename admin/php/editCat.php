<?php
header("content-type:text/html;charset=utf8");
$pid = $_POST["pid"];
$name = $_POST['name'];
$id = $_POST['id'];
include('mysql.php');
$res = mysqli_query($con,"update region set name='$name',pid=$pid where id=$id");
if($res){
    $arr = [
        "meta"=>[
            "status"=>0,
            "msg"=>"修改成功"
        ],
        "data"=>null
    ];
}else{
    $arr = [
        "meta"=>[
            "status"=>1,
            "msg"=>"修改失败"
        ],
        "data"=>null
    ];
}
echo json_encode($arr);