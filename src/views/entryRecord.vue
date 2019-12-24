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
          @submit="addOrUpdate"
        >
            <template slot="operation">
                <li class="r">
                    <span class="label">出入时间</span>
                    <el-input v-model="userName" placeholder="请输入"></el-input>
                </li>
                <li class="r">
                    <span class="label">门禁名称</span>
                    <el-input v-model="userName" placeholder="请输入"></el-input>
                </li>
                <li class="r">
                    <span class="label">用户姓名</span>
                    <el-input v-model="userName" placeholder="请输入"></el-input>
                </li>
                <li class="l">
                    <span class="label">用户类型</span>
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
                    prop:'ProjectName',
                    label:'项目名称'
                },
                {
                    prop: 'FSimpleName',
                    label: '用户类型',
                },
                {
                    prop: 'FAddress',
                    label: '用户姓名',
                },
                {
                    prop: 'FAddress',
                    label: '门禁类型',
                },
                {
                    prop: 'FAddress',
                    label: '出入时间',
                },
                {
                    prop: 'FAddress',
                    label: '结果',
                },
                {
                    prop: 'FAddress',
                    label: '授权人',
                }
            ],
            userName:''
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
                SearchKey:that.filterText
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
    }
}
</script>