<template>
    <div>
        <div class="home-left">
            <div class="my-article">
                <div class="my-article-content">
                    <div class="my-article-left">
                        <img src="../../assets/logo.png" width="80%" style="margin-top:10px">
                    </div>
                    <div class="my-article-right">
                        <div class="my-article-title">测试网络开始</div>
                        <div class="my-article-intr">
                            目前国内大多数IDC商家，如阿里云、腾讯云均有提供图片处理接口（鉴黄），如果服务器在国内，配合IDC自家的图片...
                        </div>
                    </div>
                </div>
            </div>
            <div class="my-article">
                <div class="my-article-content">
                    <div class="my-article-left">
                        <img src="../../assets/logo.png" width="80%" style="margin-top:10px">
                    </div>
                    <div class="my-article-right">
                        <div class="my-article-title">测试网络开始</div>
                        <div class="my-article-intr">
                            目前国内大多数IDC商家，如阿里云、腾讯云均有提供图片处理接口（鉴黄），如果服务器在国内，配合IDC自家的图片...
                        </div>
                    </div>
                </div>
            </div>
            <div class="my-article">
                <div class="my-article-content">
                    <div class="my-article-left">
                        <img src="../../assets/logo.png" width="80%" style="margin-top:10px">
                    </div>
                    <div class="my-article-right">
                        <div class="my-article-title">测试网络开始</div>
                        <div class="my-article-intr">
                            目前国内大多数IDC商家，如阿里云、腾讯云均有提供图片处理接口（鉴黄），如果服务器在国内，配合IDC自家的图片...
                        </div>
                    </div>
                </div>
            </div>
            <div class="my-article">
                <div class="my-article-content">
                    <div class="my-article-left">
                        <img src="../../assets/logo.png" width="80%" style="margin-top:10px">
                    </div>
                    <div class="my-article-right">
                        <div class="my-article-title">测试网络开始</div>
                        <div class="my-article-intr">
                            目前国内大多数IDC商家，如阿里云、腾讯云均有提供图片处理接口（鉴黄），如果服务器在国内，配合IDC自家的图片...
                        </div>
                    </div>
                </div>
            </div>
            <div class="my-article">
                <div class="my-article-content">
                    <div class="my-article-left">
                        <img src="../../assets/logo.png" width="80%" style="margin-top:10px">
                    </div>
                    <div class="my-article-right">
                        <div class="my-article-title">测试网络开始</div>
                        <div class="my-article-intr">
                            目前国内大多数IDC商家，如阿里云、腾讯云均有提供图片处理接口（鉴黄），如果服务器在国内，配合IDC自家的图片...
                        </div>
                    </div>
                </div>
            </div>
            <div class="my-article">
                <div class="my-article-content">
                    <div class="my-article-left">
                        <img src="../../assets/logo.png" width="80%" style="margin-top:10px">
                    </div>
                    <div class="my-article-right">
                        <div class="my-article-title">测试网络开始</div>
                        <div class="my-article-intr">
                            目前国内大多数IDC商家，如阿里云、腾讯云均有提供图片处理接口（鉴黄），如果服务器在国内，配合IDC自家的图片...
                        </div>
                    </div>
                </div>
            </div>
        </div>

           <!--  <Aplayer v-if="music.src" autoplay :music="{
                title: 'Preparation',
                artist: '123123',
                src: 'http://sc1.111ttt.cn/2018/1/03/13/396131232171.mp3',
                pic: require('../../assets/image/backgroud.jpg'),
              // lrc: '213123'
            }" :mini="true" width="500px">
            </Aplayer> -->

    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Aplayer from 'vue-aplayer'

@Component({
    components: {
        Aplayer
    },
})
export default class Home extends Vue {
    music:any = {};
    mounted(){
        this.music = {
            title: 'Preparation',
            artist: '123123',
            src: 'http://sc1.111ttt.cn/2018/1/03/13/396131232171.mp3',
            pic: '../../assets/image/backgroud.png',
          // lrc: '213123'
        }
    }
}
</script>
<style type="less" scoped>
    .home-left{padding:20px 50px;width:100%;}
    .my-article{width:45%;float:left;margin:10px}
    .my-article-content{float:left;padding:5px;background-color: #fff;}
    .my-article-left{width:30%;float:left}
    .my-article-right{width:60%;dispaly:inline;;float:left;font-size:13px;padding:2px}
    .my-article-title{padding:2px;font-size:14px;max-height:20px;overflow: hidden;text-overflow: ellipsis;}
    .my-article-intr{padding:6px 2px;max-height:80px;overflow: hidden;text-overflow: ellipsis;}
</style>