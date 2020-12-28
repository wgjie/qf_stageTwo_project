<?php
include('mysql.php');
$pid = $_GET['pid'];
$res = mysqli_query($con,"select * from scenics where pid=$pid and isshowindex=1");
$arr = [];
while($row = mysqli_fetch_assoc($res)){
    $arr[] = $row;
}
echo json_encode([
    "meta"=>[
        "status"=>0,
        "msg"=>"获取成功"
    ],
    "data"=>$arr
]);