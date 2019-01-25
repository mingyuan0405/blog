<template>
    <Content :style="{'background-color':'rgb(241, 242, 244)','min-height':min_height+'px','max-height':min_height+'px','overflow-y':'auto'}">
        <div :style="{padding:'20px 40px'}">
            <Menu mode="horizontal" @on-select="onSelect" class="doc-create" >
                <Submenu name="1">
                    <template slot="title">
                        <Icon type="ios-create-outline" />
                        操作
                    </template>
                    <MenuGroup title="分享" >
                        <MenuItem name="1-1" ><template><Icon type="ios-git-branch" />新建</template></MenuItem>
                        <MenuItem name="1-2" v-show="selected.id"><template><Icon type="ios-git-branch" />编辑</template></MenuItem>
                        <MenuItem name="1-3" v-show="selected.id"><template><Icon type="ios-git-branch" />删除</template></MenuItem>
                    </MenuGroup>
                    <MenuGroup title="分类">
                        <MenuItem name="2-1"><template><Icon type="ios-cube-outline"/>新建</template></MenuItem>
                        <MenuItem name="2-2"><template><Icon type="ios-cube-outline"/>编辑</template></MenuItem>
                        <MenuItem name="2-3"><template><Icon type="ios-cube-outline"/>删除</template></MenuItem>
                    </MenuGroup>
                </Submenu>
            </Menu>
            <div :style="{padding:'20px 134px',width:'60%'}">
                <Tree :data="treeData" :render="renderContent" ref="tree" empty-text="" @on-toggle-expand="expand"></Tree>
            </div>
        </div>
        <Drawer
            :title="menuDraw.title"
            v-model="menuDraw.show"
            placement="right"
            width="320"
            :mask-closable="true"
            :mask-style="{backgroundColor:''}"
            :mask="true"
            :closable="false"
            @on-close="resData"
        >
            <Form :model="menuModel" :label-width="80">
                <FormItem label="分类名称">
                    <Input v-model="menuModel.name" placeholder=""></Input>
                </FormItem>
                <FormItem style="float: right">
                    <Button type="primary" @click="update">{{menuDraw.button}}</Button>
                </FormItem>
            </Form>
        </Drawer>
        <Drawer
            :title="essayDraw.title"
            v-model="essayDraw.show"
            placement="right"
            width="55%"
            :mask-closable="true"
            :mask-style="{backgroundColor:''}"
            :mask="true"
            :closable="false"
            @on-close="resData"
        >
            <Form :model="essayModel" :label-width="80">
                <FormItem label="分享名称">
                    <Input v-model="essayModel.name" placeholder=""></Input>
                </FormItem>
                <FormItem label="分享内容">
                    <div ref="editor" :style="{height: (min_height-250)+'px'}"></div>
                </FormItem>
                <FormItem style="float: right">
                    <Button type="primary" @click="updateEssay">{{essayDraw.button}}</Button>
                </FormItem>
            </Form>
        </Drawer>
    </Content>
</template>

<script lang="ts">
import E from 'wangeditor'
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Essaies extends Vue {
    axios : any;
    api   : any;
    treeData : object[] = [];
    min_height: any = document.documentElement.clientHeight;
    selected   = {menu_id: 0,menu_name: '', id : 0, name : ''};
    menuDraw   = {title : '',show:false, button:""};
    menuModel  = {id:0,name:''};
    essayDraw  = {title : '',show:false, button:""};
    essayModel = {id:0,name:'',content:'',menu_id:0};
    type = '';
    relation = {};

    renderContent (h, { root, node, data }) {
        let is_parent = data.children != undefined;
        if (is_parent) {
            return h('span', {
                style: {
                    display: 'inline-block',
                    width: '100%',
                    cursor:'pointer',
                    fontSize:'16px',
                    fontWeight: 400,
                    padding:'10px 5px 10px 0',
                    borderTop:  data.index ? '1px solid #dcdee2' : ''
                },
                on: {
                    click: () => { this.getContent(root, node, data);data.expand = !data.expand }
                }
            }, [
                h('span',{
                    class:{"tree-active":data.id == this.selected.menu_id},
                    style: {
                        marginRight: '8px',
                    },
                }, [
                    h('Icon', {
                        props: {
                            type: data.id == this.selected.menu_id ? 'ios-cube' : 'ios-cube-outline',
                            size: 20,
                            color:data.id == this.selected.menu_id ? '#ff6c37' : '',
                        },
                        style: {
                            marginRight: '8px'
                        }
                    }),
                    data.title
                ]),
            ]);
        }else{
            return h('span', {
                style: {
                    display: 'inline-block',
                    width: '100%',
                    cursor:'pointer',
                    fontSize:'14px',
                    padding:'8px 5px 10px 0',
                    borderBottom:  data.id == this.selected.id ? '1px dashed #ff6c37' : ''
                },
                on: {
                    click: () => { this.getContent(root, node, data) }
                }
            }, [
                h('span',{
                    class:{"tree-active":data.id == this.selected.id},
                    style: {
                        marginRight: '8px',
                    },
                }, [
                    h('Icon', {
                        props: {
                            type: '',
                            size: 15
                        },
                        style: {
                            marginRight: '8px'
                        }
                    }),
                    h('span',
                        {
                            class:{"essay-name":true},
                            style: {
                                marginRight: '8px',
                                color:(data.id == this.selected.id ? '#ff6c37' : ''),
                            },
                        },[
                            (data.index + 1) +'.  ' +data.title
                        ]
                    )
                ]),
            ]);
        }
    };
    mounted(){
        this.search();
        window.onresize = ()=>{
            this.min_height = document.documentElement.clientHeight;
        };
    }
    search(){
        this.resData();
        this.axios.post(this.api+'essay/index').then((response)=>{
            let data = response.data.data;
            this.treeData = [];
            data.forEach((item, index) => {
                let subtree = {title: item.name, id: item.id,expand: false, children: [],index: index};
                item.list.forEach((sitem,sindex)=>{
                    subtree.children.push(
                       {title: sitem.name,id:sitem.id,index:sindex}
                    )
                    this.relation[sitem.id] = subtree;
                });
                this.treeData.push(subtree);
            })
            this.selected.menu_id = data[0].id;
            this.selected.menu_name = data[0].name;
        })
    }
    resData(){
        this.menuDraw = { title : '', show : false, button : '' };
        this.essayDraw = { title : '', show : false, button : '' };
        this.menuModel  = {id:0,name:''};
        this.essayModel = {id:0,name:'',content:'',menu_id:0};
        this.rendEditor()
    }
    rendEditor(html : string = ''){
        var editor = new E(this.$refs.editor)
        editor.customConfig.onchange = (html) => {
          this.essayModel.content = html
        }
        editor.create();
        editor.txt.html(html);
    }
    expand(node : any){
        if (this.selected.menu_id != node.id) {
            this.selected.id = 0;
            this.selected.name = '';
        }
        this.selected.menu_id = node.id;
        this.selected.menu_name = node.title;
    }
    getContent(root : any, node : any, data : any){
        if(data.children == undefined){
            this.selected.id = data.id;
            this.selected.name = data.title;
            this.selected.menu_id = this.relation[data.id].id;
            this.selected.menu_name = this.relation[data.id].name;
        }else{
            this.expand(data)
        }
    }
    onSelect(type){
        this.type = type;
        if (this.type == '2-1') {
            this.menuDraw = { title : '新建分类', show : true, button : '创建' };
        }
        if (this.type == '2-2') {
            this.menuModel.id = this.selected.menu_id;
            this.menuModel.name = this.selected.menu_name;
            this.menuDraw = { title : '编辑分类', show : true, button : '保存' };
        }
        if (this.type == '2-3') {
            this.menuModel.id = this.selected.menu_id;
            this.menuModel.name = '';
            this.menuDraw = { title : '删除分类(请输入:'+this.selected.menu_name+')', show : true, button : '删除' };
        }

        if (this.type == '1-1') {
            this.essayModel.menu_id = this.selected.menu_id;
            this.essayDraw = { title : '新建分享', show : true, button : '创建' };
        }
        if (this.type == '1-2' && this.selected.id) {
            this.essayModel.id = this.selected.id;
            this.essayDraw = { title : '编辑分享', show : true, button : '保存' };
            this.axios.post(this.api+'essay/get',this.essayModel).then((response : any)=>{
                let ret = response.data.data;
                this.essayModel.name = ret.name;
                this.essayModel.content = ret.content;
                this.rendEditor(ret.content)
            })
        }
        if (this.type == '1-3' && this.selected.id) {
            this.essayModel.id = this.selected.id;
            this.essayModel.name = '';
            this.essayDraw = { title : '删除分享(请输入:'+this.selected.name+')', show : true, button : '删除' };
            this.axios.post(this.api+'essay/get',this.essayModel).then((response : any)=>{
                let ret = response.data.data;
                this.essayModel.content = ret.content;
                this.rendEditor(ret.content)
            })
        }
    }
    update(){
        if (this.type == '2-1') {
            this.axios.post(this.api+'menu/create',this.menuModel).then((response : any)=>{
                this.menuDraw.show = false;
                let tree = {title: this.menuModel.name, id: response.data.data.id,expand: true, children: []};
                this.treeData.push(tree);
                this.selected.menu_id = response.data.data.id;
                this.selected.menu_name = this.menuModel.name;
                this.selected.id = '';
                this.selected.name = '';
                this.resData();
            })
        }
        if (this.type == '2-2') {
            this.axios.post(this.api+'menu/update',this.menuModel).then((response : any)=>{
                this.menuDraw.show = false;
                this.selected.menu_name = this.menuModel.name;
                this.resetTreeMenuName();
            })
        }
        if (this.type == '2-3') {
            this.menuModel.id = this.selected.menu_id;
            if (this.menuModel.name == this.selected.menu_name) {
                this.axios.post(this.api+'menu/delete',this.menuModel).then((response : any)=>{
                    this.search();
                })
            }
        }
    }
    updateEssay(){
        if (this.type == '1-1') {
            this.axios.post(this.api+'essay/create',this.essayModel).then((response : any)=>{
                this.essayDraw.show = false;
                this.treeData.forEach((item) => {
                    if (item.id == this.selected.menu_id) {
                        item.children.push({id: response.data.data.id,title:this.essayModel.name,index:item.children.length});
                        this.relation[response.data.data.id] = item;
                    }
                })
                this.selected.id = response.data.data.id;
                this.resData();
            })
        }
        if (this.type == '1-2' && this.selected.id) {
            this.axios.post(this.api+'essay/update',this.essayModel).then((response : any)=>{
                this.essayDraw.show = false;
                this.selected.name = this.essayModel.name;
                this.resetTreeEssayName();
            })
        }
        if (this.type == '1-3' && this.selected.id) {
            this.essayModel.id = this.selected.id;
            if (this.essayModel.name == this.selected.name) {
                this.axios.post(this.api+'essay/delete',this.essayModel).then((response : any)=>{
                    this.essayDraw.show = false;
                    let data = [];
                    this.treeData.forEach((item) => {
                        let subtree = {title: item.title, id: item.id,expand: item.expand, children: []};
                        let n = 0;
                        item.children.forEach((sitem)=>{
                            if (sitem.id != this.selected.id) {
                                subtree.children.push(
                                   {title: sitem.title,id:sitem.id,index:n}
                                )
                                this.relation[sitem.id] = subtree;
                                n++;
                            }
                        });
                        data.push(subtree);
                    })
                    this.treeData = data;
                })
            }
        }
    }
    resetTreeMenuName(){
        this.treeData.forEach((item) => {
            if (item.id == this.selected.menu_id) {
                item.title = this.selected.menu_name;
                return false;
            }
        })
    }
    resetTreeEssayName(){
        this.treeData.forEach((item,index) => {
            if (item.id == this.selected.menu_id) {
                item.children.forEach((sitem) => {
                    if (sitem.id == this.selected.id) {
                        sitem.title = this.selected.name;
                        return false;
                    }
                })
            }
        })
    }
}
</script>
<style scoped>
    .ivu-menu-light{background: #f1f2f4;}

    ivu-tree ul{margin-top: 30px}
</style>
