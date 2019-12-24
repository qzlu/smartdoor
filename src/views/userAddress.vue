<template>
    <div class="user-address">
        <div class="project-tree l">
            <div class="project-list"> 
            </div>
            <div class="tree-content">
                <el-scrollbar>
                    <el-tree
                        ref="tree"
                       :data="treeData"
                       :props="treeProp"
                       node-key='FGUID'
                       highlight-current
                       default-expand-all
                       @node-click = 'handleClick'
                       :expand-on-click-node='false'
                    >
                        <template v-slot="{node,data}">
                            <span class="node-row">
                                <i v-if="data.FAccessGUID" class="iconfont icon-EntranceGuard"></i>{{node.label}}
                            </span>
                        </template>
                    </el-tree>
                </el-scrollbar>
            </div>
        </div>
        <div class="user-address-main">
            <Table
              ref="table"
              :tableLabel="tableLabel"
              :getData="queryData"
              @beforeAdd = 'beforeAdd'
              @editItem = 'editItem'
              :deleteRow = 'deleteItem' 
              :exportData="exportFile" 
              @submit="addOrUpdate"
            >
            <li slot="operation" class="r" style="position:absolute;top:-90px;right:0px;">
                <span class="label">选择项目</span>
                <el-select v-model="project" value-key="ProjectID" @change="selectProject">
                    <el-option v-for="item in projectList" :key="item.ProjectID" :value="item" :label="item.ProjectName"></el-option>
                </el-select>
            </li>
<!--                 <li slot="operation" class="r">
                    <span class="label">项目名称</span>
                    <el-input></el-input>
                </li> -->
                <el-form slot="dialog" :model="addData"  ref="form">
                        <el-form-item label="节点名称"  prop="FAddressName" :rules="[{ required: true, message: '请输入'}]">
                            <el-input  v-model="addData.FAddressName"></el-input>
                        </el-form-item>
                        <el-form-item label="是否户址"  prop="FAddressType" :rules="[{ required: true, message: '请输入'}]">
                            <el-select v-model="addData.FAddressType">
                                <el-option :value="1" label="是"></el-option>
                                <el-option :value="2" label="否"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="户址">
                           <el-input  v-model="addData.FAddressDetail"></el-input>
                        </el-form-item>
                        <el-form-item label="关联设备">
                            <el-select v-model="addData.FAccessGUID">
                                <el-option v-for="item in deviceList" :key="item.FGUID" :value="item.FGUID" :label="item.AccessName"></el-option>
                            </el-select>
                        </el-form-item>
                </el-form>
            </Table>
        </div>
    </div>
</template>
<script>
import Table from '@/components/Table.vue'
export default {
    data(){
        return{
            tableLabel:[
                {
                    prop:'ProjectName',
                    label:'项目全称'
                },
                {
                    prop: 'FAddressName',
                    label: '节点名称',
                },
                {
                    prop: 'FAddressType',
                    label: '是否户址',
                    formatter:row => row.FAddressType == 1?'是':'否',
                    width:120
                },
                {
                    prop:'FAddressDetail',
                    label:'户址'
                },
                {
                    prop: 'AccessName',
                    label: '关联设备',
                }
            ],
            projectList:[],
            project:null,
            treeData:[],
            treeProp:{
                children:'ChildList',
                label:'FAddressName'
            },
            activeNode:{},
            addData:{
                FGUID:'',
                FParentGUID:'',
                FAddressName:'',
                FAddressDetail:'',
                FAddressType:'',
                FAccessGUID:""
            },
            deviceList:[]
        }
    },
    components:{
        Table
    },
    created(){
        this.queryUserProject()
    },
    methods:{
        /**
         * 查询数据
         * @param {Vue Component} that 传入子组件
         */
        queryData(that){
            let param = {
                PageIndex:that.pageIndex,
                PageSize:10,
                ProjectID:this.project?this.project.ProjectID:0,
                FGUID:this.activeNode.FGUID||''
            }
            return this.$post('/AddressNode/QueryPageAddressNode',param,true)
        },
        /**
         * 113.查询户址树形数据
         */
        queryAddressNodeTree(){
            this.$post('/AddressNode/QueryAddressNodeTree',{ProjectID:this.project.ProjectID})
            .then((result) => {
                this.treeData =[
                    {
                        FAddressName:this.project.ProjectName,
                        FGUID:'00000000-0000-0000-0000-000000000000',
                        ChildList:result.FObject || []
                    }
                ]
                this.activeNode = this.treeData[0] || {}
                this.$refs.table.queryData()
                this.$nextTick(() => {
                    this.$refs.tree.setCurrentKey(this.activeNode)
                })
            }).catch((err) => {
                
            });
        },
        /**
         * 查询门禁列表
         */
        queryProjectTAccess(){
            this.$post('/Access/QueryProjectTAccess',{ProjectID:this.project.ProjectID})
            .then((result) => {
                console.log(result)
                this.deviceList = result.FObject || []
            }).catch((err) => {
                
            });
        },
        /**
         * 查询用户项目列表
         */
        queryUserProject(){
            this.$post('/Project/QueryUserProject')
            .then((result) => {
                this.projectList = result.FObject || []
                let project = this.projectList[0]
                if(project){
                    this.project = project
                    this.queryAddressNodeTree()
                    this.queryProjectTAccess()
                }
            }).catch((err) => {
                
            });
        },
        selectProject(project){
            this.queryProjectTAccess()
            this.queryAddressNodeTree()
        },
        handleClick(node){
            this.activeNode = node
            this.$refs.table.queryData()
        },
        beforeAdd(){
            this.addData = {...this.defaultAddData}
        },
        editItem(row){
            Object.keys(this.addData).forEach(key => {
                this.addData[key] = row[key]
            })
        },
        async addOrUpdate(){
            this.addData.FParentGUID = this.activeNode.FGUID
            await new Promise(resolve => {
                this.$refs.form.validate((valid) => {
                  if (valid) {
                      resolve()
                  } 
                });
            })
            this.$post('/AddressNode/AddOrUpdateTAddressNode',{TAddressNode:{...this.addData},ProjectID:this.project.ProjectID})
            .then((result) => {
                console.log(result)
                this.$message({
                    type:'success',
                    message:'操作成功'
                })
                this.$refs.table.show = false
                this.queryAddressNodeTree()
            }).catch((err) => {
                this.$message({
                    type:'error',
                    message:'操作失败'
                })
            });

        },
        deleteItem(row){
            return this.$post('/AddressNode/DeleteTAddressNode',{FGUID:row.FGUID})
        },
        exportFile(){

        },

    }
}
</script>
<style lang="scss">
.user-address{
    .project-tree{
        width: 300px;
        height: 914px;
        background: white;
        .project-list{
            margin-top: 36px;
            padding-left: 12px;
            text-align: left;
            .el-select{
            }
            .el-input{
                &__inner{
                    width: 248px;
                    height: 47px;
                    font-size: 22px;
                    color: #2C2C2C;
                }
            }
        }
        .tree-content{
            height: 880px;
            margin-top: 29px;
            position: relative;
            font-size: 18px;
            .el-scrollbar__wrap{
               overflow-x: hidden;
            }
            .el-tree{
                background: none;
                color: #2C2C2C;
                font-size: 22px;
                .el-tree-node:focus {
                    >.el-tree-node__content {
                        background:#31BA8B;
                    }
                }
                &-node__content{
                    height: 54px;
                    line-height: 54px;
                    .el-tree-node__expand-icon{
                        margin-left: 20px;
                    }
                    .iconfont{
                        vertical-align: middle;
                        font-size: 24px;
                        color: #31BA8B
                    }
                }
                &-node__content:hover {
                    background:#31BA8B;
                    .iconfont{
                        color: white;
                    }
                }
                .el-tree-node__label{
                    font-size: 18px;
                }
                .el-tree-node__expand-icon{
                    font-size: 20px;
                }
            }
            .el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content{
                background:#31BA8B;
                .iconfont{
                    color: white;
                }
            }
            .el-tree.checked {
                color: #31BA8B;
                .iconfont{
                    color: white;
                }
            }
        }
    }
    &-main{
        margin-left: 310px;
    }
}
    
</style>