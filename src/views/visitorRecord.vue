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
                    <span class="label">授权时间</span>
                    <el-date-picker
                      v-model="time"
                      type="daterange"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期">
                    </el-date-picker>
                </li>
                <li class="r">
                    <span class="label">是否有效</span>
                    <el-select v-model="state">
                        <el-option :value="0" label="全部"></el-option>
                        <el-option :value="1" label="有效"></el-option>
                        <el-option :value="2" label="无效"></el-option>
                    </el-select>
                </li>
                <li class="r">
                    <span class="label">授权用户</span>
                    <el-input v-model="userName" placeholder="请输入"></el-input>
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
                    prop:'FUserTypeName',
                    label:'授权用户类型'
                },
                {
                    prop: 'FUserName',
                    label: '授权用户姓名',
                },
                {
                    prop: 'FCreateTime',
                    label: '授权时间',
                    width:240
                },
                {
                    prop: 'FExpiresLength',
                    label: '授权有效期（s）',
                    width:190
                },
                {
                    prop: 'VisitorName',
                    label: '访客姓名',
                },
                {
                    prop: 'VisitorTelephone',
                    label: '联系电话',
                },
                {
                    prop: 'FDetail',
                    label: '来访事由',
                },
                {
                    prop: 'FState',
                    label: '状态',
                }
            
            ],
            time:[new Date(),new Date()],
            userName:'',
            state:0
        }
    },
    components:{
        Table
    },
    methods:{
        /**
         * 查询数据
         * @param {Object} data 传入子组件
         */
        queryData(data){
            let param = {
                ...data,
                FUserName:this.userName,
                SDate:formatDate(this.time[0],'YYYY-MM-DD'),
                EDate:formatDate(this.time[1],'YYYY-MM-DD'),
                FSate:this.state
            }
            return this.$post('/Project/QueryPageTAuthorization',param,true)
        }
    }
}
</script>