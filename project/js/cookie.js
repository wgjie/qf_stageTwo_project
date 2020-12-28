/**
 * setCookie 设置cookie
 * @param {string} key cookie的键
 * @param {string} value cookie的值
 * @param {number} second 多少秒之后失效
 * @param {string} path 路径
 */
function setCookie(key,value,second,path='/'){
    var date = new Date()
    date.setTime(date.getTime() - 8*3600*1000 + second*1000)
    document.cookie = `${key}=${value};expires=${date};path=${path}`
}
/**
 * getCookie 根据键获取cookie的值
 * @param {string} key 删除的cookie的键
 * return 返回对应的值 - 字符串
 */
function getCookie(key){
    var str = document.cookie;
    var arr = str.split('; ')
    for(var i=0;i<arr.length;i++){
        var brr = arr[i].split('=')
        if(brr[0]==key){
            return brr[1]
        }
    }
}
/**
 * removeCookie 删除cookie
 * @param {string} key 删除的cookie的键
 * @param {string} path 删除的cookie的路径
 */
function removeCookie(key,path='/'){
    setCookie(key,null,-1,path)
}