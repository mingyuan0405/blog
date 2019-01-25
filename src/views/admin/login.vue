<template>
    <Content :style="{'background-color':'#272631','min-height':min_height+'px','max-height':min_height+'px','overflow-y':'auto'}">
        <div style="width:350px;margin-left: 36%;margin-top: 17%;color: red">
            <Form :model="model" :label-width="80">
                <FormItem label="访问">
                    <Select v-model="model.type">
                        <Option value="1">游客</Option>
                        <Option value="2">管理员</Option>
                    </Select>
                </FormItem>
                <FormItem label="用户名">
                    <Input v-model="model.username" placeholder=""></Input>
                </FormItem>
                <FormItem label="密码">
                    <Input type="password" v-model="model.password" placeholder=""></Input>
                </FormItem>
                <FormItem style="float: right">
                    <Button @click="$router.push('/')">退出</Button>
                    <Button style="margin-left: 8px" type="primary" @click="login">登录</Button>
                </FormItem>
            </Form>
        </div>
    </Content>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Login extends Vue {
    $user : any;
    $router : any;
    min_height: any = document.documentElement.clientHeight;
    model = {username:'',password:'','type':'1'}

    mounted(){
        window.onresize = ()=>{
            this.min_height = document.documentElement.clientHeight;
        };
    }
    login(){
        if (this.model.username == 'admin' && this.model.password == 'admin' && this.model.type == '2') {
            localStorage.setItem('TOKEN_BLOG', 'MINGMINGYUANYUAN');
            this.$user.type = 1;
        }else{
            localStorage.setItem('TOKEN_BLOG', 'YUEZOUYUEYUAN');
            this.$user.type = 2;
        }
        this.$router.push('/essaies');
    }
}
</script>
