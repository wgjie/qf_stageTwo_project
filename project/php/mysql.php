<?php
header("content-type:text/html;charset=utf8");
$con = mysqli_connect("localhost","root","root","project");
mysqli_query($con,"set names utf8");