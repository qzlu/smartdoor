<template>
    <div>
        <Table
          ref="table"
          :showAdd='false'
          :tableLabel="tableLabel"
          :getData="queryData"
          @beforeAdd = 'beforeAdd'
          :deleteRow = 'deleteItem' 
          :exportData="exportFile" 
          @submit="addOrUpdate"
          @editItem ="editItem"
        >
            <li class="l" slot="operation-left">
               <el-button @click="beforeUpload">
                <el-upload
                    :disabled="!projectId"
                    :show-file-list = 'false'
                    :action="`${baseUrl}/UploadFile`"
                    :on-success="handleSuccess"
                    :data="{FAction:'UpLoadFile',FTokenID:token,FType:'addaccess',ProjectID:projectId}"
                >
                    <i class="iconfont icon-Godown"></i>
                    导入
                </el-upload>
                </el-button>
            </li>
            <template slot="operation">
                <li class="r">
                    <span class="label">设备类型</span>
                    <el-select v-model="deviceType">
                        <el-option :value="0" label="全部"></el-option>
                        <el-option :value="1" label="入户"></el-option>
                        <el-option :value="2" label="公共"></el-option>
                    </el-select>
                </li>
                <li class="r">
                    <span class="label">设备名称</span>
                    <el-input v-model="deviceName" placeholder="请输入"></el-input>
                </li>
            </template>
            <el-form slot="dialog" :model="addData"  ref="form">
                    <el-form-item label="设备名称" prop="AccessName" :rules="[{ required: true, message: '请输入'}]">
                        <el-input v-model="addData.AccessName"></el-input>
                    </el-form-item>
                    <el-form-item label="设备类型"  prop="AccessType" :rules="[{ required: true, message: '请输入'}]">
                        <el-select v-model="addData.AccessType">
                            <el-option :value="1" label="入户"></el-option>
                            <el-option :value="2" label="公共"></el-option>
                        </el-select>
                    </el-form-item>
            </el-form>
        </Table>
    </div>
</template>
<script>
import Table from '@/components/Table.vue'
import axios from 'axios'
export default {
    data(){
        return{
            tableLabel:[
                {
                    prop:'FGUID',
                    label:'设备ID'
                },
                {
                    prop: 'Address',
                    label: '物理地址',
                },
                {
                    prop: 'AccessMAC',
                    label: '设备MAC',
                    width:260
                },
                {
                    prop: 'AccessName',
                    label: '设备名称',
                    width:260
                },
                {
                    prop: 'AccessType',
                    label: '设备类型',
                    formatter:row => row.AccessType == 1?'入户':'公共',
                    width:120
                },
                {
                    prop: 'AccessVersion',
                    label: '固件版本',
                    width:120
                },
                {
                    prop: 'AccessPWD',
                    label: '密钥',
                }
            ],
            deviceType:0,
            deviceName:'',
            token:sessionStorage.getItem("FToken"),
            baseUrl:axios.defaults.baseURL,
            addData:{
                FGUID:'',
                ProjectID:'',
                Address:'',
                AccessMAC:'',
                AccessType:'',
                AccessName:'',
                AccessVersion:'',
                AccessPWD:'',
                FDetail:''
            },
            projectId:''
        }
    },
    components:{
        Table
    },
    created(){
    },
    methods:{
        /**
         * 查询数据
         * @param {Vue Component} that 传入子组件
         */
        queryData(data){
            this.projectId = data.ProjectID
            let param = {
                ...data,
                SearchKey:this.deviceName,
                AccessType:this.deviceType,
            }
            return this.$post('/Access/QueryPageAccessList',param,true)
        },
        beforeUpload(){
            if(!this.projectId){
                this.$message({
                    type:'warning',
                    message:'请先选择项目'
                })
            }
        },
        handleSuccess(res,file){
            if(res.Result===200){
                this.$message({
                    type:'success',
                    message:'导入成功'
                })
                this.$refs.table.queryData()
            }else{
                this.$message({
                    type:'error',
                    message:'导入失败'
                })
            }
        },
        beforeAdd(){

        },
        editItem(row){
            Object.keys(this.addData).forEach(key => {
                this.addData[key] = row[key]
            })
        },
        async addOrUpdate(){
            await new Promise(resolve => {
                this.$refs.form.validate((valid) => {
                  if (valid) {
                      resolve()
                  } 
                });
            })
            this.$post('/Access/UpdateDAccess',{TAccess:this.addData})
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
        deleteItem(row){
            return this.$post('/Access/DeleteDAccess',{FGUID:row.FGUID})
        },
        exportFile(){

        },

    }
}
</script>