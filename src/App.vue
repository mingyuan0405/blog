<template>
    <div class="layout">
        <Layout :style="{minHeight: '100vh'}">
            <Sider style="position:relative;" :collapsed-width="0" draggable="true" v-model="isCollapsed" @on-select="" :width="!isCollapsed ? 240 : 0" v-show="$route.name != 'login'">
                <div class="contract"  @click="isCollapsed = !isCollapsed"><Icon color="#bfbec2" type="ios-undo-outline" size="15"/></div>
                <div :class="menuitemClasses('sider-header')">
                    <Avatar :class="menuitemClasses('layout-logo')" size="large" src="http://www.qoquo.com/blog/portrait.jpg" />
                    <div :class="menuitemClasses('blog-name')">{{blogname}}</div>
                </div>
                <Menu active-name="1-1" theme="dark" :active-name="$route.name" width="auto" :class="menuitemClasses('menu-item')" v-if="$user.type != 1">
                    <MenuItem name="home" to="/">
                        <Icon type="ios-school-outline" />
                        <span>地域</span>
                    </MenuItem>
                    <MenuItem name="essay" to="/essay">
                        <Icon type="ios-browsers-outline" />
                        <span>文章</span>
                    </MenuItem>
                    <MenuItem name="1-3">
                        <Icon type="ios-cube-outline" />
                        <span>项目</span>
                    </MenuItem>
                    <MenuItem name="tome" to="/time">
                        <Icon type="ios-navigate"></Icon>
                        <span>时间轴</span>
                    </MenuItem>
                    <MenuItem name="1-5" to="/login" >
                        <Icon type="md-person" />
                        <span>登录</span>
                    </MenuItem>
                </Menu>
                <Menu active-name="1-1" theme="dark" width="auto" :class="menuitemClasses('menu-item')" v-if="$user.type == 1" @on-select="logout">
                    <MenuItem name="1-1" to="/essaies">
                        <Icon type="ios-browsers-outline" />
                        <span>文章管理</span>
                    </MenuItem>
                    <MenuItem name="logout">
                        <Icon type="md-person" />
                        <span>退出</span>
                    </MenuItem>
                </Menu>
                <div style="position: fixed;bottom: 0px;padding: 5px 20px;color: rgba(255, 255, 255, 0.7)">
                    在线人数：{{visitor_number}}人
                    &nbsp;&nbsp; | &nbsp;&nbsp;
                    打开页面：{{essay_number}}个
                </div>
            </Sider>
            <Layout style="position:relative;">
                <div class="expand" v-show="isCollapsed" @click="isCollapsed = !isCollapsed"><Icon color="#bfbec2" type="md-expand" size="10"/></div>
                <router-view/>
            </Layout>
        </Layout>
        <Drawer
            title=""
            v-model="drawOpen"
            placement="right"
            width="420"
            :mask-closable="true"
            :mask="false"
            :closable="false"
        >
        </Drawer>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Watch} from 'vue-property-decorator';
import { getUserIP } from './library/functions';

@Component
export default class App extends Vue {
    $user : any;
    $refs : any;
    $router : any;
    $route : any;
    axios : any;
    $store : any;
    isCollapsed = false;
    key = '';
    blogname = '越走, 越远';
    visitor_number = 0;
    essay_number = 0;
    drawOpen = false;
    webSocket : any;
    said = '';
    barrage_data = [];
    user_ip = '';
    user_name = '';
    user_area = '';

    @Watch('isCollapsed')
    changeColl(){
        setTimeout(()=>{
            if (!this.isCollapsed) {
                this.blogname = '越走, 越远';
            }else{
                this.blogname = '远';
            }
        },200)
    }
    menuitemClasses(class_name) {
        return [
            class_name,
            this.isCollapsed ? 'collapsed-menu' : ''
        ]
    }
    mounted(){
        this.getUserName();
        this.getUserIp();
    }
    createSocket(){
        this.webSocket = new WebSocket("ws://132.232.53.224:300");
        this.webSocket.onopen = (event) => {
            this.webSocket.send("type=in&ip="+this.user_ip+"&name="+this.user_name+"&area="+this.user_area);
        };
        this.webSocket.onmessage = (event)=>{
            let res = JSON.parse(event.data);
            console.log(res)
            this.barrage_data.push({id:res.key,msg:res.msg}) ;
            this.visitor_number = res.ips.length;
            this.essay_number = res.count;
            this.$store.commit('restSock', res)
            // this.$nextTick(() => {
            //     let ul = this.$refs['barrage-ul'];
            //     ul.scrollTop = ul.scrollHeight;
            // })
        }
    }
    sendM(){
        if (this.said == '') return;
        this.webSocket.send("msg="+this.said);
        this.said = '';
    }
    logout(name){
        if (name == 'logout') {
            // let data = this.$store.state.SocketRes.areas;
            // data.areas = [{"count":6,coordinates:["116.395645","39.929986"],color:'#f3f333'},{"count":6,coordinates:["121.487899","31.249162"],color:'#8be58d'},{"count":5,coordinates:["117.210813","39.14393"],color:'#67c4df'}];
            // this.$store.commit('restSock', data)

            localStorage.removeItem('TOKEN_BLOG');
            this.$user.type = 0;
            this.$router.push('/')
        }
    }
    getUserName(){
        $.ajax({
            method: 'get',
            url:'http://pv.sohu.com/cityjson?ie=utf-8',
            dataType: "script",
        }).then(()=>{
            this.user_name = returnCitySN.cip;
            this.user_area = returnCitySN.cname;
        });
    }
    getUserIp(){
        getUserIP( (ip:string) => {
            this.user_ip =  ip;
            this.$user.ip = ip;
            this.createSocket();
        });
    }
}
</script>
<style scoped>
    .contract{
        position:absolute;right:0px;z-index:1;padding:2px;cursor:pointer;
        /* background:red; */
        /* animation:myfirst 5s; */
        /* animation-iteration-count: infinite; */
    }
    .expand{
        position:absolute;left:0px;z-index:1;padding:2px;cursor:pointer;
        /* background:red; */
        /* animation:myfirst 20s; */
        /* animation-iteration-count: infinite; */
    }

    @keyframes myfirst
    {
        0%    {background: red;}
        14.3% {background: orange;}
        28.6% {background: yellow;}
        42.9% {background: green;}
        57.2% {background: blue;}
        71.5% {background: indigo;}
        85.8% {background: purple;}
    }
</style>