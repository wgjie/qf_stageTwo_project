// 封装成函数
function move(ele,obj,endMove=function(){}){
    let k=0
    let i=0
    for(let attr in obj){
        i++
        let timerId = setInterval(function(){
            let target = obj[attr]; // -500
            if(attr=="opacity"){ 
                target *= 100
            }
            let l = getStyle(ele,attr) // -481.95
            if(attr=="opacity"){
                l = l*100
            }
            l = parseInt(l) // -481
            let speed = (target - l)/20 // 
            if(speed>0){
                speed = Math.ceil(speed)
            }else{
                speed = Math.floor(speed) // -1
            }
            l += speed // l=-482
            if(l==target){
                l=target
                if(attr=="opacity"){
                    ele.style[attr] = l/100
                }else{
                    ele.style[attr] = l + "px"; // -481.95
                }
                clearInterval(timerId)
                k++
                if(k==i){
                    // console.log("结束了");
                    // move(box,{top:0})
                    // 运动结束想要做的事情，不是固定的，有的时候可能要执行的代码要多一些，优点时候可能会少一点 - 函数
                    endMove()
                }
            }else{
                if(attr=="opacity"){
                    ele.style[attr] = l/100
                }else{
                    ele.style[attr] = l + "px"; // -481.95
                }
            }
            
        },20)
    }
}

// 获取样式中某一个属性
function getStyle(ele,attr){
    if(window.getComputedStyle){
        return window.getComputedStyle(ele)[attr]
    }else{
        return ele.currentStyle[attr];
    }
}