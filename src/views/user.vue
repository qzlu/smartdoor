<template>
    <div>
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
            <template slot="operation">
                <li class="r">
                    <span class="label">用户姓名</span>
                    <el-input v-model="userName" placeholder="请输入"></el-input>
                </li>
                <li class="r">
                    <span class="label">户址</span>
                    <el-input v-model="userAddress" placeholder="请输入"></el-input>
                </li>
            </template>
            <template v-slot:row-operation="{row}">
                <span @click="resetPassword(row)">重置</span>
            </template>
            <el-form slot="dialog" :model="addData"  ref="form">
                    <el-form-item label="项目全称" prop="ProjectIDs" :rules="[{ required: true, message: '请输入'}]">
                        <el-select v-model="addData.ProjectIDs" @change="queryAddressNodeTree">
                            <el-option v-for="item in projectList" :key="item.ProjectID" :value="item.ProjectID" :label="item.ShortName"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="用户姓名"  prop="FUserName" :rules="[{ required: true, message: '请输入'}]">
                        <el-input  v-model="addData.FUserName"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号码" prop="FTelephone" :rules="FTelephoneRule">
                        <el-input v-model="addData.FTelephone"></el-input>
                    </el-form-item>
                    <el-form-item label="用户类型"  prop="FUserType" :rules="[{ required: true, message: '请输入'}]">
                        <el-select v-model="addData.FUserType">
                            <el-option :value="0" label="物业"></el-option>
                            <el-option :value="1" label="业主"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="户址" prop="FAddressDetail">
                        <el-cascader
                        v-model="addData.FAddressDetail"
                        :options="treeData"
                        :props="{ checkStrictly: true,children:'ChildList',label:'FAddressName',value:'FAddressDetail',disabled:'disable',leaf:'leaf' }"
                        clearable>
                        </el-cascader>
                    </el-form-item>
            </el-form>
            <el-table-column label="门禁权限" width="120">
                <template v-slot="{row}">
                    <el-button @click="updateUser(row)" class="primary">授权</el-button>
                </template>
            </el-table-column>
        </Table>
        <el-dialog title="授权" top="50px" :close-on-click-modal="false" append-to-body :visible.sync="show" width="949px" class="zw-dialog transfer">
            <div class="transfer-content">
                <div class="transfer-item">
                    <h5>未授权门禁</h5>
                    <div class="filter-box">
                        <el-input
                          placeholder="搜索关键字"
                          v-model="filterText">
                          <i class="el-icon-search" slot="suffix"></i>
                        </el-input>
                    </div>
                    <div class="tree-content">
                        <el-scrollbar>
                            <el-tree
                                ref="tree"
                                show-checkbox
                               :data="treeData"
                               :props="treeProp"
                               node-key='FGUID'
                               highlight-current
                               default-expand-all
                               :expand-on-click-node='false'
                            >
                                <template v-slot="{node,data}">
                                    <span class="node-row">
                                        {{node.label}}-<span class="device-name">{{data.AccessName}}</span>
                                    </span>
                                </template>
                            </el-tree>
                        </el-scrollbar>
                    </div>
                </div>
                <div class="transefer-btn">
                    <div @click="toLeft()"><i class="iconfont icon-Leftparentheses"></i></div>
                    <div @click="toRight()"><i class="iconfont icon-Rightparentheses"></i></div>
                </div>
                <div class="transfer-item">
                    <h5>
                        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">已授权门禁</el-checkbox>
                    </h5>
                    <el-checkbox-group class="checked-list" v-model="rightCheckedList" @change="handleCheckChange">
                        <p v-for="item in checkedNode" :key="item.FGUID">
                            <el-checkbox  :label="item" >{{item.AccessName}}</el-checkbox>
                        </p>
                    </el-checkbox-group>
                </div>
            </div>
            <div slot="footer">
                <el-button @click="show = false ">取消</el-button>
                <el-button class="primary"  @click="updateUserAddressNodeAccess()">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import Table from '@/components/Table.vue'
export default {
    data(){
        const phoneNumbre = (rule, value, callback) => {
            var isPhone = /^0?1[3|4|5|7|8][0-9]\d{8}$/;//手机号码
            var isMob= /^([0-9]{3,4}-)?[0-9]{7,8}$/;// 座机格式
            if(isMob.test(value)||isPhone.test(value)){
                callback();
            }
            else{
               callback(new Error('请输入正确的电话号码'));
            }
        }
        return{
            tableLabel:[
                {
                    prop:'ProjectName',
                    label:'项目名称',
                    width:200
                },
                {
                    prop: 'FUserName',
                    label: '用户姓名',
                    width:120
                },
                {
                    prop: 'FTelephone',
                    label: '手机号码',
                    width:180
                },
                {
                    prop: 'FUserType',
                    label: '用户类型',
                    formatter:row => row.FUserType == 1?'业主':'物业',
                    width:120
                },
                {
                    prop: 'FAddressDetail',
                    label: '户址',
                },
            ],
            show:false,
            userName:'',
            userAddress:'',
            projectList:[],
            FTelephoneRule:[{required: true, validator: phoneNumbre}], //联系方式规则
            defaultAddData:{},
            addData:{
                FGUID:'',
                FUserName:'',
                FUserNickname:'',
                FDescribe:'',
                FUserType:'',
                FContacts:'',
                FTelephone:'',
                FIMG:'',
                FAddressDetail:'',
                ProjectIDs:''
            },
            filterText:'',
            treeData: [],
            treeProp:{
                children:'ChildList',
                label:'FAddressName',
                disabled:'disabled'
            },
            checkedNode:[],
            rightCheckedList:[],
            checkAll:false,
            isIndeterminate:false,
            activeUser:null,
            projectId:''
        }
    },
    components:{
        Table
    },
    created(){
        this.defaultAddData = {...this.addData}
        this.queryUserProject()
    },
    methods:{
        /**
         * 查询数据
         * @param {Object} data 传入参数
         */
        queryData(data){
            let param = {
                ...data,
                SearchKey:this.userName,
                DetailSearchKey:this.userAddress,
                FAddressDetail:this.userAddress,
            }
            return this.$post('/Users/QueryPageUsers',param,true)
        },
        formatterTree(treeData){
            treeData.forEach((item) =>{
                item.disabled = Boolean(item.disabled)
                if(item.ChildList&&item.ChildList.length>0){
                    this.formatterTree(item.ChildList)
                }else{
                    item.ChildList = null
                }
            })
            return treeData
        },
        /**
         * 113.查询户址树形数据
         */
        queryAddressNodeTree(id){
            return new Promise((resolve,reject) => {
                this.$post('/AddressNode/QueryAddressNodeTree',{ProjectID:id})
                .then((result) => {
                    let data = result.FObject || []
                    this.treeData = this.formatterTree(data)
                    resolve()
                }).catch((err) => {
                    reject()
                });
            })
        },
        /**
         * 查询用户项目列表
         */
        queryUserProject(){
            this.$post('/Project/QueryUserProject')
            .then((result) => {
                this.projectList = result.FObject || []
            }).catch((err) => {
                
            });
        },
        beforeAdd(){
            this.addData = {...this.defaultAddData}
            this.treeData = []
        },
        /**
         * 119.查询用户已授权户址
         * @param {} id 用户id
         */
        queryUserAddressNode(id){
            this.$post('/Users/QueryUserAddressNode',{FUserGUID:id})
            .then((result) => {
                let checkedList = result.FObject || []
                checkedList = checkedList.map(item => item.FGUID)
                this.$nextTick(() => {
                    this.$refs.tree.setCheckedKeys(checkedList)
                    this.toRight()
                })
            }).catch((err) => {
                
            });
        },
        toRight(){
            this.checkedNode = this.$refs.tree.getCheckedNodes()
            let halfChecked = this.$refs.tree.getHalfCheckedNodes()
            let checkedList = [...this.checkedNode,...halfChecked]
            this.checkedNode = checkedList.filter(item => !item.disabled)
        },
        toLeft(){
            this.rightCheckedList.forEach(item => {
                this.checkedNode = this.checkedNode.filter(obj => obj.FGUID != item.FGUID)
                this.$refs.tree.setChecked(item.FGUID,false)
            })
        },
        handleCheckAllChange(val) {
            this.rightCheckedList = val ? this.checkedNode : [];
            this.isIndeterminate = false;
        },
        handleCheckChange(value){
            let checkedCount = value.length;
            this.checkAll = checkedCount === this.checkedNode.length;
            this.isIndeterminate = checkedCount > 0 && checkedCount < this.checkedNode.length;
        },
        editItem(row){
            this.treeData = []
            this.checkedNode = []
            Object.keys(this.addData).forEach(key => {
                this.addData[key] = row[key]
            })
            this.addData.FAddressDetail = this.addData.FAddressDetail.split('-')
            this.addData.ProjectIDs = row.ProjectId
            this.queryAddressNodeTree(row.ProjectId)
        },
        /**
         * 点击授权
         */
        async updateUser(row){
            this.activeUser = row
            this.show = true
            await this.queryAddressNodeTree(row.ProjectId)
            this.queryUserAddressNode(row.FGUID)
        },
        /**
         * 118.用户授权
         */
        updateUserAddressNodeAccess(){
            let idStr = this.checkedNode.map(item => item.FGUID).join(',')
            this.$post('/Users/UpdateUserAddressNodeAccess',{FGUIDS:idStr,FUserGUID:this.activeUser.FGUID})
            .then((result) => {
                this.$message({
                    type:'success',
                    message:'操作成功'
                })
                this.show = false
            }).catch((err) => {
                this.$message({
                    type:'error',
                    message:'操作失败'
                })
            });
        },
        async addOrUpdate(){
            await new Promise(resolve => {
                this.$refs.form.validate((valid) => {
                  if (valid) {
                      resolve()
                  } 
                });
            })
            this.addData.FAddressDetail = this.addData.FAddressDetail&&this.addData.FAddressDetail.join('-')
            this.$post('/Users/AddOrUpdateUser',{TUsers:this.addData})
            .then((result) => {
                this.$message({
                    type:'success',
                    message:'操作成功'
                })
                this.$refs.table.show = false
                this.$refs.table.queryData()
            }).catch((err) => {
                this.$message({
                    type:'error',
                    message:'操作失败'
                })
            });
        },
        /**
         * 重置密码
         */
        async resetPassword(row){ 
            await this.$confirm(`确定重置密码？, 是否继续?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
            let param = {
                FUserGuid:row.FGUID,
                Pwd:'',
                NewPwd:'',
                FType:1
            }
            this.$post('/Users/UpdatePwd',param)
            .then((result) => {
                this.$message({
                    type:'success',
                    message:'重置成功'
                })
            }).catch((err) => {
                this.$message({
                    type:'error',
                    message:'重置失败'
                })
            });
        },
        deleteItem(row){
            return this.$post('/Users/DeleteUser',{FGUID:row.FGUID})
        },
        exportFile(){

        },

    }
}
</script>
<style lang="scss">
.zw-dialog.transfer{
    .el-dialog__body{
        .transfer-content{
            display: flex;
            justify-content: space-between;
            .transfer-item{
                width:440px;
                height:698px;
                border:1px solid rgba(193,192,192,1);
                border-radius:6px;
                overflow: hidden;
                h5{
                    height:56px;
                    line-height: 56px;
                    padding-left: 10px;
                    background:rgba(239,239,239,1);
                    border-radius:4px 4px 0px 0px;
                    .el-checkbox{
                        font-size: 22px;
                        color: #2C2C2C;
                        font-weight: 400;
                    }
                }
                .filter-box{
                    padding: 7px;
                    .el-input{
                        width: 100%;
                        &__innner{
                            width: 100%;
                            height: 40px;
                        }
                    }
                    .el-input__suffix{
                        line-height: 40px;
                        font-size: 20px;
                    }
                }
                .tree-content{
                    height: 580px;
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
                                font-size: 24px
                            }
                            .device-name{
                                color: #31BA8B
                            }
                        }
                        &-node__content:hover {
                            background:#31BA8B;
                            .device-name{
                                color: white
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
                        .device-name{
                            color: white
                        }
                    }
                    .el-tree.checked {
                        color: #31BA8B;
                        .device-name{
                            color: white
                        }
                    }
                }
                .el-checkbox-group.checked-list{
                    p{
                        line-height: 30px;
                        padding-left: 10px;
                        .el-checkbox{
                        font-size: 22px;
                        color: #31BA8B 
                        }
                    }
                }
            }
            .transefer-btn{
                display: flex;
                flex-direction: column;
                justify-content: center;
                >div{
                    width:34px;
                    height:38px;
                    line-height: 38px;
                    background:rgba(223,251,236,1);
                    border:1px solid rgba(49, 186, 139, 1);
                    border-radius:2px;
                    color: #31BA8B;
                    text-align: center;
                    font-weight: bolder;
                    cursor: pointer;
                    .iconfont {
                        font-size: 24px;
                    }
                }
                div+div{
                    margin-top: 20px;
                }
            }
        }
    }
}
</style>