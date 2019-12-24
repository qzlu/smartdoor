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
            <li slot="operation" class="r">
                <span class="label">项目名称</span>
                <el-input v-model="filterText"></el-input>
            </li>
            <el-form slot="dialog" :model="addData"  ref="form">
                    <el-form-item label="项目全称" prop="ProjectName" :rules="[{ required: true, message: '请输入'}]">
                        <el-input v-model="addData.ProjectName"></el-input>
                    </el-form-item>
                    <el-form-item label="项目简称"  prop="ShortName" :rules="[{ required: true, message: '请输入'}]">
                        <el-input  v-model="addData.ShortName"></el-input>
                    </el-form-item>
                    <el-form-item label="详细地址" prop="Address" :rules="[{ required: true, message: '请输入'}]">
                        <el-input v-model="addData.Address"></el-input>
                    </el-form-item>
            </el-form>
        </Table>
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
                    prop: 'ShortName',
                    label: '项目简称',
                },
                {
                    prop: 'Address',
                    label: '详细地址',
                }
            ],
            defaultAddData:{},
            addData:{
                ProjectID:0,
                ProjectName:'',
                ShortName:'',
                Address:'',
                BuildArea:0
            },
            filterText:''
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
        queryData(that){
            let param = {
                PageIndex:that.pageIndex,
                PageSize:10,
                SearchKey:this.filterText
            }
            return this.$post('/Project/QueryPageTProject',param,true)
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
            await new Promise(resolve => {
                this.$refs.form.validate((valid) => {
                  if (valid) {
                      resolve()
                  } 
                });
            })
            this.$post('/Project/AddOrUpdateTProject',{TProject:{...this.addData}})
            .then((result) => {
                console.log(result)
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
            return this.$post('/Project/DeleteTProject',{ProjectID:row.ProjectID})
        },
        exportFile(){

        },

    }
}
</script>