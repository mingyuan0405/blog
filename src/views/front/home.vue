<template>
    <Content :style="{'background-color':'rgb(241, 242, 244)','min-height':min_height+'px','max-height':min_height+'px','overflow-y':'auto'}">
        <div id="allmap" :style="{width:'100%','min-height':min_height+'px'}"> </div>
        <!-- <div style="position: fixed;top: 40px;right: 40px;width:15%;padding:20px;border-left: 1px solid rgb(219, 224, 231)" :style="{'min-height':(min_height-40)+'px','background-color':'rgb(241, 242, 244)'}">
            <span>访问量排序：</span>
            <ul style="list-style-type:none;">
                <li>
                    <span>1</span><span>vue-cli 框架</span>
                </li>
            </ul>
        </div> -->
    </Content>
</template>

<script lang="ts">
import inMap from 'inmap';
import { Component, Vue, Watch } from 'vue-property-decorator';

@Component
export default class Home extends Vue {
    $user : any;
    $store : any;
    is_com : boolean = true;
    min_height: any = document.documentElement.clientHeight;
    inmaps : any;
    overlay : any;

    created(){
        if (this.min_height > 650) {
            this.is_com = false;
        }
    }

    get list(): any {
        let SocketRes = this.$store.state.SocketRes;
        let data = [];
        if(SocketRes.areas && SocketRes.areas.length > 0){
            SocketRes.areas.forEach((item)=>{
                data.push({
                    count:item.count+5,
                    geometry:{"type":"Point","coordinates":item.coordinates},
                    style:{  //样式配置
                        color:SocketRes.ip == this.$user.ip ? 'red' : item.color
                    },
                    name: "name"
                });
            })
        }
        return data;
    }
    mounted(){
        this.initMap();
        window.onresize = ()=>{
            this.min_height = document.documentElement.clientHeight;
        };
    }
    initMap(){
        this.inmaps = new inMap.Map({
            id: 'allmap',
            skin: "Blueness",
            center: this.is_com ? [115.675356, 37.737018] : [130.566556, 34.147557], //地图中心点lng
            zoom: {
                value: 5, //当前地图级别
                show: false, //放大缩小按钮显示
                max: 18,
                min: 3
            },
        })

        this.overlay = new inMap.PointAnimationOverlay({
            style:{
                fps:4,        //   动画帧数    Number
                color:'red' ,  //   颜色    rgba
                size :24,      //   圆点大小    Number
                speed : 0.6    //
            },
            data: this.list,
            event: {
                onMouseClick: function (item, event) {
                    alert(1)
                    //能获取当前点的信息
                }
            }
        })
        this.inmaps.add(this.overlay);
    }

    @Watch("list")
    renderMap(){
        this.overlay.setData(this.list);
    }



}
</script>

