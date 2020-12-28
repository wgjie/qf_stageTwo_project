$('form').submit(function(){
    if($('[name="username"]').val()===''){
        layer.msg('用户名不能为空',{
            time:1000
        })
        return false;
    }
    if($('[name="password"]').val()===''){
        layer.msg('密码不能为空',{
            time:1000
        })
        return false;
    }
    $.ajax({
        url:'./php/login.php',
        data:$('form').serialize(),
        dataType:'json',
        type:"post",
        success:function(res){
            var {meta:{status,msg}} = res;
            if(status==0){
                setCookie('adminName',$('[name="username"]').val(),7200)
                var msgindex = layer.msg(msg)
                setTimeout(function(){
                    layer.close(msgindex)
                    location.href = 'index.html';
                },1500)
            }else{
                layer.msg(msg,{
                    time:2000
                })
            }
        }
    })
    return false;
})