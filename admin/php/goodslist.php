<?php
header("content-type:text/html;charset=utf8");
include('mysql.php');
$res = mysqli_query($con,"select * from scenics");
$arr = [];
while($row = mysqli_fetch_assoc($res)){
    $arr[] = $row;
}
if(count($arr)>0){
    $data = [
        "meta"=>[
            "status"=>0,
            "msg"=>'获取数据成功'
        ],
        "data"=>$arr
    ];
}else{
    $data = [
        "meta"=>[
            "status"=>1,
            "msg"=>'获取数据失败'
        ],
        "data"=>null
    ];
}
echo json_encode($data);