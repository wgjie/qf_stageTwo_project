$(function(){
    var username = getCookie('adminName')
    if(!username){
        var msgindex = layer.msg('请先登录')
        setTimeout(function(){
            layer.close(msgindex)
            window.parent.location.href = 'login.html';
        },1500)
    }else{
        $('.logininfo span').text(username)
    }
})