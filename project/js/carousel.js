// 定义构造函数
function Carousel(classname){
    // 获取元素，作为对象属性
    this.box = document.querySelector("."+classname);
    this.ul = this.box.querySelector('ul')
    this.ol = this.box.querySelector('ol')
    this.leftBtn = this.box.querySelector('a.leftBtn')
    this.rightBtn = this.box.querySelector('a.rightBtn')
    this.index = 1
    this.flag = true
    this.timerId = null
}
// 操作ol
Carousel.prototype.handlerOl = function(){
    for(let i=0;i<this.ul.children.length;i++){
        let li = document.createElement("li");
        if(i===0){
            li.className = 'active';
        }
        this.ol.appendChild(li)
    }
    // 将带有active类名的ol下的li记录在一个属性active中
    this.active = this.ol.children[0]
}
// 给ul前后各复制一张图片
Carousel.prototype.handlerUl = function(){
    this.firstLi = this.ul.firstElementChild.cloneNode(true)
    let lastLi = this.ul.lastElementChild.cloneNode(true)
    this.ul.appendChild(this.firstLi)
    this.ul.insertBefore(lastLi,this.ul.children[0])
    this.ul.style.width = this.ul.children.length * this.firstLi.offsetWidth + "px"
    this.ul.style.left = -this.firstLi.offsetWidth + "px"
}
// 轮播的核心代码
Carousel.prototype.core = function(){
    move(this.ul,{
        left:-this.index*this.firstLi.offsetWidth
    },()=>{
        if(this.index==this.ul.children.length-1){
            this.index = 1
            this.ul.style.left = -this.index * this.firstLi.offsetWidth + "px"
        }
        if(this.index==0){
            this.index = this.ul.children.length-2
            this.ul.style.left = -this.index * this.firstLi.offsetWidth + "px"
        }
        this.active.className = '';
        this.ol.children[this.index-1].className = 'active';
        this.active = this.ol.children[this.index-1]
        this.flag = true
    })
}
// 给右按钮绑定单击事件
Carousel.prototype.rightClick = function(){
    this.rightBtn.onclick = ()=>{
        if(!this.flag){
            return false;
        }
        this.flag = false
        this.index++
        this.core()
    }
}
// 左键点击
Carousel.prototype.leftClick = function(){
    this.leftBtn.onclick = ()=>{
        if(!this.flag){
            return false
        }
        this.flag = false
        this.index--
        this.core()
    }
}
// 小圆点点击
Carousel.prototype.dotClick = function(){
    for(let i=0;i<this.ol.children.length;i++){
        this.ol.children[i].onclick = ()=>{
            if(!this.flag){
                return false;
            }
            this.flag = false
            this.index = i+1
            this.core()
        }
    }
}
// 自动轮播
Carousel.prototype.auto = function(){
    this.timerId = setInterval(()=>{
        if(!this.flag){
            return false;
        }
        this.flag = false
        this.index++
        this.core()
    },3000)
}
// 鼠标移入
Carousel.prototype.over = function(){
    this.box.onmouseover = ()=>{
        clearInterval(this.timerId)
    }
}
// 鼠标移出
Carousel.prototype.out = function(){
    this.box.onmouseout = ()=>{
        this.auto()
    }
}
// 初始化方法
Carousel.prototype.init = function(){
    this.handlerOl()
    this.handlerUl()
    this.rightClick()
    this.leftClick()
    this.dotClick()
    this.auto()
    this.over()
    this.out()
}
// new 他
var c = new Carousel('carousel')
c.init()