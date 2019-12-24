<template>
    <div>
        <Table
          ref="table"
          :showAdd="false"
          :showOperation="false"
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
                    <span class="label">授权时间</span>
                    <el-input v-model="userName" placeholder="请输入"></el-input>
                </li>
                <li class="r">
                    <span class="label">有效期</span>
                    <el-input v-model="userName" placeholder="请输入"></el-input>
                </li>
                <li class="r">
                    <span class="label">授权用户</span>
                    <el-input v-model="userAddress" placeholder="请输入"></el-input>
                </li>
            </template>
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
                    prop:'FGroupName',
                    label:'授权用户类型'
                },
                {
                    prop: 'FSimpleName',
                    label: '授权用户姓名',
                },
                {
                    prop: 'FAddress',
                    label: '授权时间',
                },
                {
                    prop: 'FAddress',
                    label: '授权时间',
                },
                {
                    prop: 'FAddress',
                    label: '状态',
                }
            
            ],
        }
    },
    components:{
        Table
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
                SearchKey:that.filterText,
                FUserName:'',
                FExpiresLength:'',
                FCreateTime:''
            }
            return this.$post('/Project/QueryPageTAuthorization',param,true)
        },
        beforeAdd(){

        },
        editItem(row){

        },
        addOrUpdate(){

        },
        deleteItem(row){

        },
        exportFile(){

        },

    }
}
</script>