<?php
header("content-type:text/html;charset=utf8");
$id = $_GET['id'];
include('mysql.php');
$res = mysqli_query($con,"select * from region where id=$id");
$row = mysqli_fetch_assoc($res);
if($row){
    $arr = [
        "meta"=>[
            "status"=>0,
            "msg"=>"获取数据成功"
        ],
        "data"=>$row
    ];
}else{
    $arr = [
        "meta"=>[
            "status"=>1,
            "msg"=>"获取数据失败"
        ],
        "data"=>null
    ];
}
echo json_encode($arr);