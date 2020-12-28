<?php
header("content-type:text/html;charset=utf8");
$pid = $_POST["pid"];
$name = $_POST['name'];
include('mysql.php');
$res = mysqli_query($con,"insert region(name,pid) values('$name',$pid)");
if($res){
    $arr = [
        "meta"=>[
            "status"=>0,
            "msg"=>"新增成功"
        ],
        "data"=>null
    ];
}else{
    $arr = [
        "meta"=>[
            "status"=>1,
            "msg"=>"新增失败"
        ],
        "data"=>null
    ];
}
echo json_encode($arr);