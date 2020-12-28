<?php
header("content-type:text/html;charset=utf8");
$goodsname = $_POST['goodsname'];
$cat = $_POST['cat'];
$price = $_POST['price'];
$imgs = $_POST['imgs'];
$introduce = $_POST['introduce'];
$stock = $_POST['stock'];
$isshowindex = $_POST['isshowindex'];
include('./mysql.php');
$res = mysqli_query($con,"insert scenics(name,imgpath,introduce,price,stock,pid,isshowindex) values('$goodsname','$imgs','$introduce',$price,$stock,$cat,$isshowindex)");
if($res){
    $arr = [
        "meta"=>[
            "status"=>0,
            "msg"=>"新增成功"
        ]
    ];
}else{
    $arr = [
        "meta"=>[
            "status"=>1,
            "msg"=>"新增成功"
        ]
    ];
}
echo json_encode($arr);