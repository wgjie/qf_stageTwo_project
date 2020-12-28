function sendAjax(obj){
    // 请求地址处理
    if(!obj.url){ // 没有传
        throw new Error('请求地址不能为空')
    }
    // 地址传了就必须是字符串
    if(Object.prototype.toString.call(obj.url) !== '[object String]'){
        throw new Error('请求地址必须是字符串')
    }

    // 请求方式的处理
    if(!obj.method){
        obj.method = 'get';
    }
    // 传了以后就判断是否是get或post
    if(obj.method.toLowerCase()!=='get' && obj.method.toLowerCase()!=='post'){
        throw new Error('请求方式必须是get或post')
    }

    // 携带数据的处理
    if(obj.data){ // 如果有数据
        // 如果数据是字符串
        var str = '';
        if(Object.prototype.toString.call(obj.data) === '[object String]'){
            str = obj.data
        }else if(Object.prototype.toString.call(obj.data) === '[object Object]'){
            var f = '';
            for(var attr in obj.data){
                str += f + attr + '=' + obj.data[attr]
                f = '&'
            }
        }else{ // 其他类型的数据就报错
            throw new Error('数据类型必须是字符串或json对象')
        }

        if(obj.method.toLowerCase()==='get'){ // 如果请求方式是get
            obj.url += '?'+str // 将数据拼接在url后面
        }
    }

    // 是否异步的处理
    if(obj.async === undefined){
        obj.async = true
    }
    // 如果传了async，判断传的是不是布尔值
    if(Object.prototype.toString.call(obj.async) !== '[object Boolean]'){
        throw new Error('是否异步的参数必须是布尔值')
    }

    // 请求成功的参数
    if(!obj.success){
        throw new Error('成功后要执行的函数不能为空')
    }   
    // 传了success还要判断是不是函数类型
    if(Object.prototype.toString.call(obj.success) !== '[object Function]'){
        throw new Error('成功后要执行的函数必须是函数类型')
    }

    // 失败的函数
    if(!obj.error){
        obj.error = function(){}
    }
    // 传了error还要判断是不是函数类型
    if(Object.prototype.toString.call(obj.error) !== '[object Function]'){
        throw new Error('失败后要执行的函数必须是函数类型')
    }

    // 处理希望返回的数据类型
    if(!obj.dataType){
        obj.dataType = 'json';
    }
    // 创建ajax对象
    var xhr = new XMLHttpRequest();
    // 监听状态
    xhr.onreadystatechange = function(){
        // 判断完成
        if(xhr.readyState===4){
            // 判断成功
            if(xhr.status>=200 && xhr.status<300){
                // 判断希望响应的数据类型
                switch(obj.dataType){
                    case 'text':
                        var res = xhr.responseText;
                        obj.success(res)
                    break;
                    case 'xml':
                        var res = xhr.responseXML;
                        obj.success(res);
                    break;
                    case 'json':
                        var res = xhr.responseText;  
                        res = JSON.parse(res);  
                        obj.success(res)
                    break;
                    default:
                        throw new Error('希望响应的数据类型错误');   
                }
            }else{
                obj.error()
            }
        }
    }
    // 打开连接
    xhr.open(obj.method,obj.url,obj.async)
    // 
    if(obj.method.toLowerCase()==='post' && obj.data){ 
        xhr.setRequestHeader('content-type','application/x-www-form-urlencoded')
        xhr.send(str)
        return false;
    }
    xhr.send()
}

/************************ 调用模板 ************************/

/*
sendAjax({
    url:地址,
    method:请求方式, - 默认为get
    data:数据 - 可以是字符串，也可以是json对象,
    async:true/false, - 是否异步 - 默认true
    dataType:希望返回的数据类型, - text/xml/json - 默认是json
    success:function(res){  - 成功的回调函数

    },
    error:function(){ - 请求失败的回调函数

    }
})
*/

// promise封装ajax
function pAjax(obj){
    return new Promise(function(resolve,reject){
        // 请求地址处理
        if(!obj.url){ // 没有传
            throw new Error('请求地址不能为空')
        }
        // 地址传了就必须是字符串
        if(Object.prototype.toString.call(obj.url) !== '[object String]'){
            throw new Error('请求地址必须是字符串')
        }

        // 请求方式的处理
        if(!obj.method){
            obj.method = 'get';
        }
        // 传了以后就判断是否是get或post
        if(obj.method.toLowerCase()!=='get' && obj.method.toLowerCase()!=='post'){
            throw new Error('请求方式必须是get或post')
        }

        // 携带数据的处理
        if(obj.data){ // 如果有数据
            // 如果数据是字符串
            var str = '';
            if(Object.prototype.toString.call(obj.data) === '[object String]'){
                str = obj.data
            }else if(Object.prototype.toString.call(obj.data) === '[object Object]'){
                var f = '';
                for(var attr in obj.data){
                    str += f + attr + '=' + obj.data[attr]
                    f = '&'
                }
            }else{ // 其他类型的数据就报错
                throw new Error('数据类型必须是字符串或json对象')
            }

            if(obj.method.toLowerCase()==='get'){ // 如果请求方式是get
                obj.url += '?'+str // 将数据拼接在url后面
            }
        }

        // 是否异步的处理
        if(obj.async === undefined){
            obj.async = true
        }
        // 如果传了async，判断传的是不是布尔值
        if(Object.prototype.toString.call(obj.async) !== '[object Boolean]'){
            throw new Error('是否异步的参数必须是布尔值')
        }

        // 处理希望返回的数据类型
        if(!obj.dataType){
            obj.dataType = 'json';
        }
        // 创建ajax对象
        var xhr = new XMLHttpRequest();
        // 监听状态
        xhr.onreadystatechange = function(){
            // 判断完成
            if(xhr.readyState===4){
                // 判断成功
                if(xhr.status>=200 && xhr.status<300){
                    // 判断希望响应的数据类型
                    switch(obj.dataType){
                        case 'text':
                            var res = xhr.responseText;
                            resolve(res)
                        break;
                        case 'xml':
                            var res = xhr.responseXML;
                            resolve(res);
                        break;
                        case 'json':
                            var res = xhr.responseText;  
                            res = JSON.parse(res);  
                            resolve(res)
                        break;
                        default:
                            throw new Error('希望响应的数据类型错误');   
                    }
                }else{
                    reject()
                }
            }
        }
        // 打开连接
        xhr.open(obj.method,obj.url,obj.async)
        // 
        if(obj.method.toLowerCase()==='post' && obj.data){ 
            xhr.setRequestHeader('content-type','application/x-www-form-urlencoded')
            xhr.send(str)
            return false;
        }
        xhr.send()
    })
}

/*********************** 调用模板 **********************/
/*
pAjax({
    url:'province.php', 
    data:{pid:res},
    dataType:'text'
}).then(function(res){
    console.log(res);
})
*/


// jsonp的封装
function jsonp(obj){
    // jsonp的核心代码
    // 创建script标签
    var script = document.createElement("script");
    // 给地址中添加cb这个键 - 设置回调函数
    obj.url += '?cb=cb'
    var time = +new Date()
    obj.url += '&_='+time;
    // 将传进来的obj.success函数绑定在全局并起名字叫cb
    window.cb = obj.success;
    // 将传入的参数拼接到地址后面
    var paramters = '';
    for(var attr in obj.data){
        paramters += '&' + attr + '=' + obj.data[attr]
    }
    obj.url += paramters
    // 设置src属性
    script.setAttribute('src',obj.url)
    // 将script放在head中
    document.head.appendChild(script);
    // 删掉script
    document.head.removeChild(script)
}

/*************** 调用模板 ******************* */
/*
jsonp({
    url:'https://www.baidu.com/sugrec',
    data:{
        pre:1,
        p:3,
        ie:"utf-8",
        json:1,
        prod:'pc',
        from:'pc_web',
        wd:wd,
        req:2,
        csor:1,
    },
    success:function(res){
        console.log(res);
        var data = res.g;
        var ul = document.body.querySelector('ul')
        if(ul){
            document.body.removeChild(ul)
        } 
        var ul = document.createElement("ul");
        for(var i=0;i<data.length;i++){
            var li = document.createElement("li");
            li.innerText = data[i].q;
            ul.appendChild(li)
        }
        document.body.appendChild(ul)
    }
});
*/