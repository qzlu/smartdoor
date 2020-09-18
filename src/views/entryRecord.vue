<template>
    <div>
        <Table
          ref="table"
          :showAdd="false"
          :showOperation="false"
          :tableLabel="tableLabel"
          :getData="queryData"
        >
            <template slot="operation">
                <li class="r">
                    <span class="label">出入时间</span>
                     <el-date-picker
                      v-model="time"
                      type="daterange"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期">
                    </el-date-picker>
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
                    <el-select v-model="userType">
                        <el-option v-for="(item,i) in userTypeList" :key="i" :value="i" :label="item"></el-option>
                    </el-select>
                </li>
            </template>
        </Table>
    </div>
</template>
<script>
import Table from '@/components/Table.vue'
import formatDate from '@/utils/formatDate.js'
export default {
    data(){
        return{
            tableLabel:[
                {
                    prop: 'UserTypeName',
                    label: '用户类型',
                },
                {
                    prop: 'UserName',
                    label: '用户姓名',
                    width:180
                },
                {
                    prop: 'VisitorTelephone',
                    label: '手机号码',
                },
                {
                    prop: 'TokenName',
                    label: '分享业主',
                },
                {
                    prop: 'AccessType',
                    label: '门禁类型',
                    formatter:row => row.AccessType == 1?'入户':'公共'
                },
                {
                    prop: 'FCreateTime',
                    label: '出入时间',
                    width:260
                },
                {
                    prop: 'FResult',
                    label: '结果',
                },
                {
                    prop: 'TokenName',
                    label: '授权人',
                }
            ],
            userTypeList:['全部','物业','业主','访客'],
            userName:'',
            accessName:'',
            userType:0,
            time:[new Date(),new Date()],
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
         * @param {Object} data 传入参数
         */
        queryData(data){
            let param = {
                ...data,
                FType:this.userType,
                FUserName:this.userName,
                AccessName:this.accessName,
                SDate:formatDate(this.time[0],'YYYY-MM-DD'),
                EDate:formatDate(this.time[1],'YYYY-MM-DD'),
            }
            return this.$post('/Users/QueryPageTEntryExitRecords',param,true)
        },
    }
}
</script>