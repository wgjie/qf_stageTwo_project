<?php
include('mysql.php');
$res = mysqli_query($con,"select * from region where pid=1 limit 0,3");
$arr = [];
while($row = mysqli_fetch_assoc($res)){
    $arr[] = $row;
}
echo json_encode([
    "meta"=>[
        "status"=>0,
        "msg"=>"数据请求成功"
    ],
    "data"=>$arr
]);