<template>
     <Content :style="{'background-color':'#363e4f','min-height':min_height+'px','max-height':min_height+'px','overflow-y':'auto',padding:'40px'}">
        <Row  :style="{'min-height':(min_height-80)+'px','max-height':(min_height-80)+'px','overflow-y':'auto'}" v-show="data.length">
            <Col span="6" style="padding:20px 0px;">
                <Collapse simple>
                    <Panel :name="item.id+''" v-for="item in data">
                        {{item.name}}
                        <p slot="content">
                            <span :class="{essay_name : true,active_essay_name : sitem.id == active_id}" v-for="(sitem,index) in item.list" @click="turn(sitem.id)">
                                {{index+1}}、&nbsp;{{sitem.name}}
                            </span>
                        </p>
                    </Panel>
                </Collapse>
            </Col>
            <Col span="18">
                <div class="turn_content" :style="{padding:'0 20px',width:'100%','margin-left':'10%',color:'#000000'} ">
                    <div v-for="(item,index) in pageList" width="100%">
                        <div :ref="'tool'+index" style="display:none"></div>
                        <div class="essay_content" :ref="'editor'+index" :style="{'background-color':'rgb(241, 242, 244)','min-height':(min_height-80)+'px','max-height':(min_height-80)+'px','overflow-y':'auto',fontSize:'12px',margin:'20px'}">
                        </div>
                    </div>
                </div>
            </Col>
        </Row>
    </Content>
</template>

<script lang="ts">
import E from 'wangeditor'
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Essay extends Vue {
    axios : any;
    api : any;
    min_height: any = document.documentElement.clientHeight;
    content =  '';
    data = [];
    active_id = 0;
    pageList = [];

    mounted(){
        this.search();
        window.onresize = ()=>{
            this.min_height = document.documentElement.clientHeight;
        };
    }
    search(){
        this.axios.post(this.api+'essay/index').then((response)=>{
            this.data = response.data.data;
            let page = 0;
            this.data.forEach((item,index)=>{
                item.list.forEach((sitem)=>{
                    this.pageList[page] = sitem.id;
                    if (page == 0) {
                        this.active_id = sitem.id;
                    }
                    page ++ ;
                })
            });
            this.$nextTick(() => {
                let n = 0;
                this.data.forEach((item,index)=>{
                    item.list.forEach((sitem)=>{
                        let content = '<div style="border-bottom:1px solid #e2d5d1;padding:15px"><span style="color:#272631;font-size:18px;font-family:\'楷体\'"><b>'+sitem.name+'</b></span>';
                        content += '<span style="color:#f78b04;font-size:8px;padding:0 20px;font-family:\'楷体\'">(时间： '+sitem.create_time+'  |  ';
                        content += '访问量： '+sitem.hits+')</span></div><br/>';
                        content += sitem.content;
                        this.rendEditor(n,content);
                        n ++ ;
                    })
                });
            });
            this.$nextTick(() => {
                $('.turn_content').turn({
                    pages:page-1,
                    width:'90%',
                    height:this.min_height-100,
                    elevation: 500,
                    duration:2000,
                    display: 'single',
                    gradients: true,
                    autoCenter: true,
                });
            });
        })
    }
    turn(id){
        this.active_id = id;
        for (let i = 0; i < this.pageList.length; ++i) {
            if (this.pageList[i] == id) {
                $('.turn_content').turn('page',i+1);
                return false;
            }
        }
    }
    rendEditor(page : any,html : string = ''){
        let editor = new E(this.$refs['tool'+page],this.$refs['editor'+page]);
        editor.create();
        editor.txt.html(html);
    }
}
</script>
<style scoped>
    .essay_name{display: block;cursor: pointer;padding:8px 20px;color:#fff}
    .active_essay_name{color:#ff6c37;font-weight:600;background: #172037;}
    .essay_name:hover{color:#f39573;font-weight:600}
</style>
