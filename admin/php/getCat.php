<?php
header("content-type:text/html;charset=utf8");
include('mysql.php');
$pid = $_GET['pid'];
$res = mysqli_query($con,"select * from region where pid=$pid");
$arr = [];
while($row = mysqli_fetch_assoc($res)){
    $arr[] = $row;
}
if(count($arr)>0){
    $res = [
        "meta"=>[
            "status"=>0,
            "msg"=>"数据获取成功"
        ],
        "data"=>$arr
    ];
}else{
    $res = [
        "meta"=>[
            "status"=>1,
            "msg"=>"数据获取失败"
        ],
        "data"=>null
    ];
}
echo json_encode($res);