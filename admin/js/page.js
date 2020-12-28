function Page(classname,options={}){
    this.options = options; // 将传进来的参数作为对象的属性
    this.container = document.querySelector("."+classname);
    this.box = document.createElement("div");
    this.box.onmouseover = function(){
        this.style.cursor = 'pointer';
    }
    this.container.appendChild(this.box);
    this.currentPage = 1
    this.list = null
    // 给自己创建好的大盒子设置样式
    this.setStyle(this.box,{
        width:'100%',
        height:'50px',
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    });
    // 设置默认参数
    this.default = {
        language:{
            first:'首页',
            prev:"上一页",
            list:'',
            next:'下一页',
            last:'尾页'
        },
        pageInfo:{
            total:100,
            pageSize:10
        }
    }
    // 将传进来的参数替换掉自定义的默认值
    this.setDefault()
    // 显示函数赋值
    this.show = options.show || function(){}
    // 计算总页数
    this.totalPage = Math.ceil(this.default.pageInfo.total/this.default.pageInfo.pageSize)
    // 根据this.default.language，创建上一页、下一页等div
    this.createDiv()
    // 创建页码的方法
    this.createPage()
    // 点击按钮让分页动起来
    this.click()
    // 设置禁用项
    this.setDisabled()
    // 创建搜索框和按钮
    this.search()
    // 调用显示方法
    this.show(this.currentPage)
}
// 创建搜索框和按钮
Page.prototype.search = function(){
    var input = document.createElement("input");
    input.setAttribute('type','number')
    this.box.appendChild(input)
    this.setStyle(input,{
        width:'50px',
        height:'27px',
        marginLeft:'5px',
        paddingLeft:'6px',
        outline:'none',
        border:'none',
        border:'1px solid'
    })
    var btn = document.createElement("button");
    btn.innerText = '跳转'
    this.box.appendChild(btn)
    this.setStyle(btn,{
        marginLeft:'10px',
        border:"none",
        border:'1px solid #000',
        height:'30px',
        outline:'none',
        backgroundColor:'pink'
    })
}
// 设置禁用项
Page.prototype.setDisabled = function(){
    if(this.currentPage===1){
        this.box.firstElementChild.setAttribute('disabled',true)
        this.box.firstElementChild.style.backgroundColor = '#ccc';
        this.box.firstElementChild.nextElementSibling.setAttribute('disabled',true)
        this.box.firstElementChild.nextElementSibling.style.backgroundColor = '#ccc';
    }else{
        this.box.firstElementChild.setAttribute('disabled',false)
        this.box.firstElementChild.style.backgroundColor = 'transparent';
        this.box.firstElementChild.nextElementSibling.setAttribute('disabled',false)
        this.box.firstElementChild.nextElementSibling.style.backgroundColor = 'transparent';
    }
    if(this.currentPage===this.totalPage){
        this.box.children[3].setAttribute('disabled',true)
        this.box.children[4].setAttribute('disabled',true)
        this.box.children[3].style.backgroundColor = '#ccc';
        this.box.children[4].style.backgroundColor = '#ccc';
    }else{
        this.box.children[3].setAttribute('disabled',false)
        this.box.children[4].setAttribute('disabled',false)
        this.box.children[3].style.backgroundColor = 'transparent';
        this.box.children[4].style.backgroundColor = 'transparent';
    }
}
// 点击按钮动起来
Page.prototype.click = function(){
    this.box.onclick = e=>{
        var e = e || window.event;
        var target = e.target || e.srcElement;
        if(target.className === 'first' && target.getAttribute('disabled')!=='true'){
            this.currentPage = 1
            this.createPage()
        }else if(target.className === 'last' && target.getAttribute('disabled')!=='true'){
            this.currentPage = this.totalPage
            this.createPage()
        }else if(target.className === 'prev' && target.getAttribute('disabled')!=='true'){
            this.currentPage--;
            this.createPage()
        }else if(target.className === 'next' && target.getAttribute('disabled')!=='true'){
            this.currentPage++;
            this.createPage()
        }else if(target.nodeName === 'P' && this.currentPage!==target.innerText-0){
            this.currentPage = target.innerText-0
            this.createPage()
        }else if(target.tagName === 'BUTTON' && target.previousElementSibling.value-0!==this.currentPage){
            if(target.previousElementSibling.value-0<=1){
                target.previousElementSibling.value = 1
            }else if(target.previousElementSibling.value-0>=this.totalPage){
                target.previousElementSibling.value = this.totalPage
            }
            this.currentPage = target.previousElementSibling.value-0
            this.createPage()
        }
        this.show(this.currentPage)
        this.setDisabled()
    }
}
// 创建页码
Page.prototype.createPage = function(){
    this.list.innerHTML = '';
    if(this.totalPage>=5){
        if(this.currentPage<=3){
            for(var i=1;i<=5;i++){
                var p = document.createElement("p");
                p.innerText = i;
                // 放到list里面
                this.list.appendChild(p)
                this.setStyle(p,{
                    margin:'5px',
                    padding:'5px',
                    border:'1px solid'
                })
                if(i==this.currentPage){
                    p.style.backgroundColor = 'orange';
                }
            }
        }else if(this.currentPage>=this.totalPage-2){
            for(var i=this.totalPage-4;i<=this.totalPage;i++){
                var p = document.createElement("p");
                p.innerText = i;
                // 放到list里面
                this.list.appendChild(p)
                this.setStyle(p,{
                    margin:'5px',
                    padding:'5px',
                    border:'1px solid'
                })
                if(i==this.currentPage){
                    p.style.backgroundColor = 'orange';
                }
            }
        }else{
            for(var i=this.currentPage-2;i<=this.currentPage+2;i++){
                var p = document.createElement("p");
                p.innerText = i;
                // 放到list里面
                this.list.appendChild(p)
                this.setStyle(p,{
                    margin:'5px',
                    padding:'5px',
                    border:'1px solid'
                })
                if(i==this.currentPage){
                    p.style.backgroundColor = 'orange';
                }
            }
        }
    }else{
        for(var i=1;i<=this.totalPage;i++){
            var p = document.createElement("p");
            p.innerText = i;
            // 放到list里面
            this.list.appendChild(p)
            this.setStyle(p,{
                margin:'5px',
                padding:'5px',
                border:'1px solid'
            })
            if(i==this.currentPage){
                p.style.backgroundColor = 'orange';
            }
        }
    }
}
// 创建div
Page.prototype.createDiv = function(){
    for(var attr in this.default.language){
        var div = document.createElement("div");
        div.innerText = this.default.language[attr]
        this.box.appendChild(div)
        div.className = attr
        if(attr=='list'){
            this.list = div
            this.setStyle(div,{
                display:'flex',
                'justify-content':'center',
                'align-items':'center'
            })
        }else{
            this.setStyle(div,{
                margin:'5px',
                padding:'5px',
                border:'solid 1px'
            })
        }
        
    }
}
// 设置默认值的方法
Page.prototype.setDefault = function(){
    for(var attr in this.options.language){
        this.default.language[attr] = this.options.language[attr]
    }
    for(var attr in this.options.pageInfo){
        this.default.pageInfo[attr] = this.options.pageInfo[attr]
    }
}   
// 设置样式的方法
Page.prototype.setStyle = function(ele,styleObj){
    for(var attr in styleObj){
        ele.style[attr] = styleObj[attr];
    }
}

/**************************** 调用的模板 ***************************/

/*
var page = new Page('fenye',{
    language:{
        first:'|<<',
        prev:"<<",
        next:'>>',
        last:'>>|'
    },
    pageInfo:{
        total:arr.length,
        pageSize:pageSize
    },
    show:function(currentPage){
        var brr = arr.slice((currentPage-1)*pageSize,currentPage*pageSize)
        var str = '';
        for(var i=0;i<brr.length;i++){
            str += `
                <tr>
                    <td>${brr[i].name}</td>
                    <td>${brr[i].sex}</td>
                    <td>${brr[i].age}</td>
                </tr>
            `
        }
        document.querySelector("tbody").innerHTML = str;
    }
});

*/