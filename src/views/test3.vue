<template>
    <div class="layout">
        <Layout :style="{minHeight: '100vh'}">
            <Sider collapsible :collapsed-width="78" v-model="isCollapsed" width="240">
                <div :class="menuitemClasses('sider-header')">
                    <Avatar :class="menuitemClasses('layout-logo')" size="large" src="https://i.loli.net/2017/08/21/599a521472424.jpg" />
                    <div :class="menuitemClasses('blog-name')">{{blogname}}</div>
                </div>
                <div :class="menuitemClasses('sider-search')">
                    <Input prefix="ios-search" v-model="key" size="large" :placeholder="!isCollapsed ? 'search...' : '...'" style="width: 100%" />
                </div>
                <Menu active-name="1-1" theme="dark" width="auto" :class="menuitemClasses('menu-item')">
                    <MenuItem name="1-1">
                        <Icon type="ios-school-outline" />
                        <span>首页</span>
                    </MenuItem>
                    <MenuItem name="1-2">
                        <Icon type="ios-browsers-outline" />
                        <span>文章</span>
                    </MenuItem>
                    <MenuItem name="1-3">
                        <Icon type="ios-cube-outline" />
                        <span>项目</span>
                    </MenuItem>
                    <MenuItem name="1-4">
                        <Icon type="ios-navigate"></Icon>
                        <span>项目</span>
                    </MenuItem>
                </Menu>
            </Sider>
            <Layout>
                <Content :style="{padding: '20px 50px','background-color':'#fafafa'}">
                    <Row :gutter="16" class="content" :style="{'min-height':min_height+'px','max-height':min_height+'px','overflow-y':'auto'}">
                        <Col :span="isCollapsed ? 18 : 16">
                            <Row :gutter="16">
                                <Col :span="isCollapsed ? 6 : 8">
                                    <div class="col-content">
                                        <div class="col-text">
                                            <img src="./assets/image/2.gif" width="100%" style="margin-top:10px">
                                        </div>
                                        <div class="col-body" style="padding-bottom:50%;">
                                            <Divider>
                                                <Icon type="ios-browsers" size="20"/>
                                            </Divider>
                                            <div class="col-title center">测试冒烟</div>
                                            <div class="col-date center">2009年1月14日</div>
                                        </div>
                                        <div class="col-list center">
                                            <Divider />
                                            喜欢
                                        </div>
                                    </div>
                                    <div class="col-content">
                                        <div class="col-body">
                                            <Divider>
                                                <Icon type="ios-browsers" size="20"/>
                                            </Divider>
                                            <div class="col-title center">api Ui组件命令</div>
                                            <div class="col-date center">2009年1月14日</div>
                                        </div>
                                        <div class="col-text">
                                            <img src="./assets/image/1.jpg" width="100%" style="margin-top:10px">
                                        </div>
                                        <div class="col-list center">
                                            <Divider />
                                            喜欢
                                        </div>
                                    </div>
                                </Col>
                                <Col :span="isCollapsed ? 6 : 8">
                                    <div class="col-content">
                                        <div class="col-body">
                                            <Divider>
                                                <Icon type="ios-browsers" size="20"/>
                                            </Divider>
                                            <div class="col-title center">api Ui组件命令</div>
                                            <div class="col-date center">2009年1月14日</div>
                                        </div>
                                        <div class="col-text">
                                            <img src="./assets/image/1.jpg" width="100%" style="margin-top:10px">
                                        </div>
                                        <div class="col-list center">
                                            <Divider />
                                            喜欢
                                        </div>
                                    </div>
                                    <div class="col-content">
                                        <div class="col-text">
                                            <img src="./assets/image/2.gif" width="100%" style="margin-top:10px">
                                        </div>
                                        <div class="col-body" style="padding-bottom:50%;">
                                            <Divider>
                                                <Icon type="ios-browsers" size="20"/>
                                            </Divider>
                                            <div class="col-title center">测试冒烟</div>
                                            <div class="col-date center">2009年1月14日</div>
                                        </div>
                                        <div class="col-list center">
                                            <Divider />
                                            喜欢
                                        </div>
                                    </div>
                                </Col>
                                <Col :span="isCollapsed ? 6 : 8">
                                    <div class="col-content">
                                        <div class="col-text">
                                            <img src="./assets/image/2.gif" width="100%" style="margin-top:10px">
                                        </div>
                                        <div class="col-body" style="padding-bottom:50%;">
                                            <Divider>
                                                <Icon type="ios-browsers" size="20"/>
                                            </Divider>
                                            <div class="col-title center">测试冒烟</div>
                                            <div class="col-date center">2009年1月14日</div>
                                        </div>
                                        <div class="col-list center">
                                            <Divider />
                                            喜欢
                                        </div>
                                    </div>
                                    <div class="col-content">
                                        <div class="col-body">
                                            <Divider>
                                                <Icon type="ios-browsers" size="20"/>
                                            </Divider>
                                            <div class="col-title center">api Ui组件命令</div>
                                            <div class="col-date center">2009年1月14日</div>
                                        </div>
                                        <div class="col-text">
                                            <img src="./assets/image/1.jpg" width="100%" style="margin-top:10px">
                                        </div>
                                        <div class="col-list center">
                                            <Divider />
                                            喜欢
                                        </div>
                                    </div>
                                </Col>
                                <Col :span="isCollapsed ? 6 : 8" v-show="isCollapsed">
                                    <div class="col-content">
                                        <div class="col-text">
                                            <img src="./assets/image/2.gif" width="100%" style="margin-top:10px">
                                        </div>
                                        <div class="col-body" style="padding-bottom:50%;">
                                            <Divider>
                                                <Icon type="ios-browsers" size="20"/>
                                            </Divider>
                                            <div class="col-title center">测试冒烟</div>
                                            <div class="col-date center">2009年1月14日</div>
                                        </div>
                                        <div class="col-list center">
                                            <Divider />
                                            喜欢
                                        </div>
                                    </div>
                                    <div class="col-content">
                                        <div class="col-body">
                                            <Divider>
                                                <Icon type="ios-browsers" size="20"/>
                                            </Divider>
                                            <div class="col-title center">api Ui组件命令</div>
                                            <div class="col-date center">2009年1月14日</div>
                                        </div>
                                        <div class="col-text">
                                            <img src="./assets/image/1.jpg" width="100%" style="margin-top:10px">
                                        </div>
                                        <div class="col-list center">
                                            <Divider />
                                            喜欢
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                        <Col :span="isCollapsed ? 6 : 8">
                            <div class="visitor-content" :style="{'min-height':min_height+'px',margin:'20px 10px'}">
                                <div class="visitor-list" >
                                     <Form :label-width="100">
                                        <FormItem label="实时人数：">
                                            {{visitor_number}}人
                                        </FormItem>
                                        <FormItem label="在线访问：">
                                            <Avatar size="small" class="visitor_photo" src="https://i.loli.net/2017/08/21/599a521472424.jpg" style="margin-left: 0px"/>
                                            <Avatar size="small" class="visitor_photo" style="background-color: #87d068" icon="ios-person" />
                                        </FormItem>
                                        <FormItem label="访问记录：">
                                            <Timeline>
                                                <TimelineItem color="green">发布1.0版本</TimelineItem>
                                                <TimelineItem color="green">发布2.0版本</TimelineItem>
                                                <TimelineItem color="red">严重故障</TimelineItem>
                                                <TimelineItem color="blue">发布3.0版本</TimelineItem>
                                            </Timeline>
                                        </FormItem>
                                    </Form>
                                </div>

                                <div class="barrage-content" style="padding:0 40px;">
                                    <div>
                                        <ul ref="barrage-ul" style="list-style-type:none;height:250px;max-height:250px;overflow-y:auto;">
                                            <li v-for="item in barrage_data">
                                                <span class="barrage_name">{{item.key}}</span>
                                                <span class="barrage_msg">{{item.msg}}</span>
                                            </li>
                                        </ul>
                                    </div>
                                    <Input  v-model="said" @on-enter="sendM" @on-click="sendM" search icon="ios-search"  placeholder="一起交流.." style="margin:20px 0" />
                                </div>
                            </div>
                        </Col>

                    </Row>
                </Content>
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

@Component
export default class App extends Vue {
    $refs : any;
    min_height: any = document.documentElement.clientHeight-40;
    isCollapsed = false;
    key = '';
    blogname = '越走, 越远';
    visitor_number = 0;
    drawOpen = false;
    webSocket : any;
    said = '';
    barrage_data = [];

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
        this.webSocket = new WebSocket("ws://127.0.0.1:300");
        this.webSocket.onopen = (event) => {
            this.webSocket.send("type=in");
        };
        this.webSocket.onmessage = (event)=>{
            let res = JSON.parse(event.data);
            this.barrage_data.push({id:res.key,msg:res.msg}) ;
            this.visitor_number = JSON.parse(event.data).count;
            this.$nextTick(() => {
                let ul = this.$refs['barrage-ul'];
                ul.scrollTop = ul.scrollHeight;
            })
        }
    }
    sendM(){
        if (this.said == '') return;
        this.webSocket.send("msg="+this.said);
        this.said = '';
    }
    doc = 'Running an independent studio allows me to work directly with you the client to create stunning visual projects tailored specifically to your unique brand vision. No pushy sales people here, just quality one-on-one time with a talented designer and web developer with 10+ years of hands on experience.';
}
</script>
<style scoped>
        .ivu-layout-content{
        .ivu-row{background-color:@contentColor;
            .col-content{width:100%;text-overflow: ellipsis;background-color:#fff;margin-top:20px;
                .col-body{padding:5px 20px 10px 20px;height:0px; padding-bottom:50%;overflow: hidden;
                    .col-title{font-size:16px;color: #2c2c33;font-family: "楷体";}
                    .col-date{font-size:2px;color: @siderSubFontColor;}
                    .col-text{text-align: justify; text-justify: inter-ideograph; text-indent: 2em;overflow: hidden;text-overflow: ellipsis;
                        font-size: 15px;font-weight: 400;
                    }
                }
                .col-list{padding:5px;
                    .ivu-divider-horizontal{margin:5px 0px}
                }
            }

            .visitor-content{background-color:#fff;
                .visitor-list{padding: 20px;
                    .visitor_photo{margin-left: 8px}
                    .ivu-timeline-item{padding: 0 0 5px 0;}
                }
                ::-webkit-scrollbar{width:0px}
            }
        }

    }
</style>