<template>
    <div class="layout">
        <Layout>
            <Header :style="{position: 'fixed', width: '100%'}">
                <Menu mode="horizontal" theme="dark" active-name="1">
                    <div @click="drawClose">
                        <Avatar class="layout-logo" src="https://i.loli.net/2017/08/21/599a521472424.jpg" />
                    </div>
                    <div class="layout-nav">
                        <MenuItem name="1">
                            <Icon type="ios-navigate"></Icon>
                            Item 1
                        </MenuItem>
                        <MenuItem name="2">
                            <Icon type="ios-keypad"></Icon>
                            Item 2
                        </MenuItem>
                        <MenuItem name="3">
                            <Icon type="ios-analytics"></Icon>
                            Item 3
                        </MenuItem>
                        <MenuItem name="4">
                            <Icon type="ios-paper"></Icon>
                            Item 4
                        </MenuItem>
                    </div>
                </Menu>
            </Header>
            <Content :style="{margin: '64px  0 0 0',minHeight: min_height+'px',backgroundImage:'url('+require('./assets/image/2.gif')+')',backgroundRepeat:'no-repeat', backgroundPosition:'center center','background-size': 'cover'}">

            </Content>
            <Footer class="layout-footer-center">2015-2019 &copy; MingYuan</Footer>
        </Layout>
        <Drawer
            title=""
            v-model="drawOpen"
            placement="left"
            width="320"
            :mask-closable="true"
            :mask="true"
            :closable="false"
        >
        </Drawer>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class App extends Vue {
    drawOpen:boolean = false;
    min_height:string = document.documentElement.clientHeight-64-2-69;

    mounted(){
        const that = this;
        window.onresize = ()=>{
            that.min_height = document.documentElement.clientHeight-64-2-69;
        };
        setTimeout(()=>{
            //this.drawClose()
        },1000*1.5)
    }
    drawClose(){
        this.drawOpen = true;
        setTimeout(()=>{
            this.drawOpen = false;
        },1000*1.5)
    }
}
</script>

.layout{border: 1px solid #d7dde4;background: #f5f7f9;position: relative;border-radius: 4px;overflow: hidden;
    .layout-logo{width: 30px;height: 30px;background: #5b6270;float: left;position: relative;top: 15px;left: 20px;}
    .layout-nav{width: 420px;margin: 0 auto;margin-right: 120px;}
    .layout-footer-center{text-align: center;}
    //.ivu-layout-header{height:128px;padding:50px;
    //  .ivu-menu-light{background:none;
    //      &.ivu-menu{position:unset}
    //  }
    //  .ivu-menu-horizontal{height:0px;}
    //}
}