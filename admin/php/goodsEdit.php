<?php
header("content-type:text/html;charset=utf8");
$id = $_POST['id'];
$goodsname = $_POST['goodsname'];
$cat = $_POST['cat'];
$price = $_POST['price'];
$imgs = $_POST['imgs'];
$introduce = $_POST['introduce'];
$stock = $_POST['stock'];
$isshowindex = $_POST['isshowindex'];
include('./mysql.php');
$res = mysqli_query($con,"update scenics set name='$goodsname',imgpath='$imgs',introduce='$introduce',stock=$stock,pid=$cat,isshowindex=$isshowindex where id=$id");
if($res){
    $arr = [
        "meta"=>[
            "status"=>0,
            "msg"=>"修改成功"
        ]
    ];
}else{
    $arr = [
        "meta"=>[
            "status"=>1,
            "msg"=>"修改成功"
        ]
    ];
}
echo json_encode($arr);