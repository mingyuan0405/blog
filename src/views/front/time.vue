<template>
    <Content :style="{'background-color':'rgb(54, 62, 79)','min-height':height+'px','max-height':height+'px','overflow-y':'auto','width':'100%'}" id="time-content" postion="absolute">
        <canvas id="canvas" :height="height-5+'px'" :width="width+'px'" />
        <div class="time" :style="{height:height/2+'px',top:0,padding:'0 100px'}">
            <div class="time_block" :style="{opacity : op1}">
                <div class="time_block_content">
                    <div class="time_date">2018年12月13日</div>
                    <div class="time_body">博客v0.0.0版本，准备开发一个博客网站: 《越走，越远》。</div>
                    <img  src="../../assets/image/winter.jpg" :style="{width:'80%',marginTop:'5px'}" >
                </div>
            </div>
        </div>
        <div class="time" :style="{height:height/2+'px',bottom:0,padding:'0 200px'}">
            <div class="time_block" :style="{opacity : op2}">
                <div class="time_block_content" style="top: 20px;">
                    <div class="time_date">2019年1月25日</div>
                    <div class="time_body">博客v1.0.0 版本发布， Vue-cli,Iview,Typescript,Less 组合构建前端框架，Yii2 框架搭建后端 。</div>
                    <img  src="../../assets/image/1.jpg" :style="{width:'80%'}" >
                </div>
            </div>
        </div>
        <div class="time" :style="{top:height/2+'px',height:'22px',fontSize:'5px',color:'#c5e0e2'}">
            <span v-for="t in 120" v-if="t%3 == 0 && t > 10 && x > (t-12)*90 && x > 50" :style="{marginLeft: t > 12 ? '200px' : '20px' }">
                {{(2018+(t%12 ? Math.floor(t/12) : (Math.floor(t/12)-1))) + '.' + ((t-Math.floor(t/12)*12) ? (t-Math.floor(t/12)*12) : 12)}}
            </span>
        </div>
    </Content>
</template>


<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Login extends Vue {
    height: any = document.documentElement.clientHeight;
    width: any = 0;
    ctx : any;
    step : number = 0;

    x : number = 10;
    y : number = this.height / 2;

    ty1 : number = this.height / 2;
    op1 : number = 0;
    ty2 : number = this.height / 2;
    op2 : number = 0;


    ty3 : number = this.height / 2;
    ty4 : number = this.height / 2;
    ty5 : number = this.height / 2;
    ty6 : number = this.height / 2;

    mounted(){
        this.height = document.documentElement.clientHeight;
        this.width = document.getElementById('time-content').offsetWidth;
        window.onresize = ()=>{
            this.height = document.documentElement.clientHeight;
            this.width = document.getElementById('time-content').offsetWidth;
        };
        this.$nextTick(() => {
            this.ctx = document.getElementById('canvas').getContext('2d');
            this.initCtx();
            this.frame();
        });
    }
    initCtx(){
        this.ctx.beginPath();
        this.ctx.rect(0, 0, this.width-2,this.height-2);
        this.ctx.fillStyle = 'rgb(54, 62, 79)';
        this.ctx.fill();
    }
    frame(){
        this.update();
        window.requestAnimationFrame(()=>{if(this.x<this.width)this.frame()});
    }
    update(){
        this.step ++ ;
        // this.initCtx();
        this.drow();
        this.drowTime();
    }
    drow(){
        this.x += 1 ;
        //this.y += 1 ;
        if((Number.isInteger(this.x/10) && this.x > 900) || this.x < 900)
            this.drowPoint(this.x,this.y);


    }
    drowTime(){

        if(this.x > 100 && this.ty1 >= this.y-200){
            this.ty1 -- ;
            this.op1 = (this.y-this.ty1)/300;
            this.drowPoint(100,this.ty1,50,this.ty1 == this.y-200)
        }
        if(this.x > 300 && this.ty3 >= this.y-280){
            this.ty3 -- ;
            this.drowPoint(300,this.ty3,40,this.ty3 == this.y-280)
        }
        if(this.x > 500 && this.ty5 >= this.y-260){
            this.ty5 -- ;
            this.drowPoint(500,this.ty5,160,this.ty5 == this.y-260)
        }

        if(this.x > 200 && this.ty2 <= this.y+260){
            this.ty2 ++ ;
            this.op2 = (this.ty2-this.y)/300;
            this.drowPoint(200,this.ty2,20,this.ty2 == this.y+260)
        }
        if(this.x > 400 && this.ty4 <= this.y+220){
            this.ty4 ++ ;
            this.drowPoint(400,this.ty4,130,this.ty4 == this.y+220)
        }
    }
    drowPoint(x:number,y:number,col:number = 200,t : boolean = false){

        let r = t ? 3 : 1;
        if (t) {
            col += 10;
        }
        this.ctx.save();
        this.ctx.shadowBlur = 5;
        this.ctx.shadowColor = 'hsla(' + col + ', 100%, 50%, 1)';
        // this.ctx.beginPath();
        // this.ctx.arc(x, y, 1*r, 0, 2 * Math.PI, false);
        // this.ctx.fillStyle = 'hsla(' + (col+20) + ', 80%, 50%, 0.2)';
        // this.ctx.fill();
        // this.ctx.beginPath();
        // this.ctx.arc(x, y, 1*r, 0, 2 * Math.PI, false);
        // this.ctx.fillStyle = 'hsla(' + (col-10) + ', 90%, 60%, 0.6)';
        // this.ctx.fill();
        this.ctx.beginPath();
        this.ctx.arc(x, y, 1*r, 0, 2 * Math.PI, false);
        this.ctx.fillStyle = 'hsla(' + (col-20) + ', 100%, 75%, 1)';
        this.ctx.fill();
        this.ctx.restore();
    }
}
</script>
<style type="text/css" scoped>
    .time{position:absolute;left:0px;z-index:1;color: #fff;text-align: justify; text-justify: inter-ideograph; text-indent: 1em;overflow: hidden;text-overflow: ellipsis;}
    .time_block{height:100%;width:200px;position: relative;}
    .time_block_content{position:absolute;bottom: 0px;padding: 10px}
    .time_body{margin-top: 10px;width: 170px;word-wrap:break-word;}
</style>
