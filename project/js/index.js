var loadindex = layer.load(1, {
    shade: [0.5,'#333'] //0.1透明度的白色背景
});
async function syncFun(){
    var province = document.querySelector(".province");
    var provinceRes = await pAjax({
        url:'./php/province.php',
    })
    var {meta:{status,msg},data} = provinceRes;
    var str = '';
    for(var i=0;i<data.length;i++){
        str +=  `
            <li><a href="#">${data[i].name}</a></li>
        `
    }
    province.innerHTML = str;

    var beijing = document.querySelector(".beijing");
    var beijingRes = await pAjax({
        url:'./php/scenics.php',
        data:{pid:2}
    })
    var {meta:{status,msg},data} = beijingRes;
    var str = '';
    for(var i=0;i<data.length;i++){
        str += `
            <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12">
                <div class="thumbnail">
                    <img src="${data[i].imgpath.split('==========')[0]}" alt="...">
                    <div class="caption">
                        <h3>${data[i].name}</h3>
                        <p class="introduce">${data[i].introduce}</p>
                        <p>
                            <a href="./detail.html?id=${data[i].id}" class="btn btn-default" role="button">查看详情</a>
                        </p>
                    </div>
                </div>
            </div>
        `
    }
    beijing.innerHTML = str;


    var anhui = document.querySelector(".anhui");
    var anhuiRes = await pAjax({
        url:'./php/scenics.php',
        data:{pid:13}
    })
    var {meta:{status,msg},data} = anhuiRes;
    var str = '';
    for(var i=0;i<data.length;i++){
        str += `
            <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12">
                <div class="thumbnail">
                    <img src="${data[i].imgpath}" alt="...">
                    <div class="caption">
                        <h3>${data[i].name}</h3>
                        <p class="introduce">${data[i].introduce}</p>
                        <p>
                            <a href="./detail.html?id=${data[i].id}" class="btn btn-default" role="button">查看详情</a>
                        </p>
                    </div>
                </div>
            </div>
        `
    }
    anhui.innerHTML = str;
    layer.close(loadindex)
}

syncFun()