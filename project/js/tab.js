class Tab{
    constructor(classname){
        this.container = document.querySelector("."+classname);
        this.ulis = this.container.querySelectorAll('ul li')
        this.olis = this.container.querySelectorAll('ol li')
    }
    init(){
        for(let i=0;i<this.ulis.length;i++){
            this.ulis[i].onclick = this.effect(i)
        }
    }
    effect(i){
        let that = this;
        return function(){
            for(let j=0;j<that.ulis.length;j++){
                that.ulis[j].className = '';
                that.olis[j].className = ''
            }
            that.ulis[i].className = 'active';
            that.olis[i].className = 'active';
        }
    }
}
(new Tab('tab')).init()