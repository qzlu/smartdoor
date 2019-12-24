2<template>
    <div class="report">
        <h4 class="router-name"><span class="icon"></span>{{$route.meta.name}}</h4>
        <ul class="operation">
           <li class="l" v-if="showAdd">
               <el-button class="primary" :disabled="disabledAdd" @click="beforeAdd">
                   <i class="iconfont icon-Added"></i>新增
               </el-button>
           </li>
           <slot name='operation-left'></slot>
            <li class="l" v-if="exportData"><el-button :disabled="disabledExport"  @click="exportFile"><i class="iconfont icon-Export"></i>导出</el-button></li>
            <!-- <li class="l"><el-button @click="queryData"><i class="iconfont icon-Refresh"></i>刷新</el-button></li> -->
            <li class="r">
                <el-button class="primary" @click="queryData">
                   查询
                </el-button>
            </li>
            <slot name='operation'></slot>
       </ul>
       <el-dialog :title="type?'编辑':'新增'" :close-on-click-modal="false" append-to-body :visible.sync="show" :width="dialogWidth" class="zw-dialog">
            <slot name="dialog">
            </slot>
            <div slot="footer">
                <el-button @click="show = false ">取消</el-button>
                <el-button class="primary"  @click="submit()">确定</el-button>
            </div>
       </el-dialog>
       <div class="table-content">
            <el-table
               :data="tableData"
               border
               style="width: 100%"
               header-row-class-name="el-table-header"
               :row-class-name="tableRowClassName"
               >
               <el-table-column label="序号" width="70px">
                   <template slot-scope="scope">
                       <div>
                           {{(pageIndex-1)*10+scope.$index+1}}
                       </div>
                   </template>
               </el-table-column>
               <el-table-column
                 v-for="item in tableLabel"
                 :key="item.prop"
                 :prop="item.prop"
                 :width="item.width"
                 :label="item.label"
                 :sortable="item.sortble"
                 :formatter="item.formatter"
                 show-overflow-tooltip
                >
               </el-table-column>
               <slot></slot>
               <el-table-column
                v-if ="showOperation"
                 prop=""
                 width="200"
                 label="操作">
                 <template slot-scope="scoped">
                     <div class="role-operation">
                        <slot name="row-operation" v-bind:row="scoped.row"></slot>
                        <span  class="pointer" title="编辑" v-if="showEdit"  @click="editItem(scoped.row)">编辑</span>
                        <span class="pointer" title="删除"  @click="deleteItem(scoped.row)">删除</span>
                     </div>
                 </template>
               </el-table-column>
            </el-table>
       </div>
       <div class="pagination">
           <div :class="['btn',{'disable':pageIndex == 1}]" @click="firstPage()">
               <i class="icon-border"></i><i class="iconfont icon-Leftparentheses"></i>
           </div>
           <div :class="['btn',{'disable':pageIndex == 1}]" @click="prePage()">
               <i class="iconfont icon-Leftparentheses"></i>
           </div>
           <div class="input">
            <span>第</span><el-input type="number" @change="changePage"  v-model="pageIndex"></el-input><span>页，共{{total}}页</span>
           </div>
           <div :class="['btn',{'disable':pageIndex >= total}]" @click="nextPage()">
               <i class="iconfont icon-Rightparentheses"></i>
           </div>
           <div :class="['btn',{'disable':pageIndex >= total}]" @click="lastPage()">
               <i class="iconfont icon-Rightparentheses"></i><i class="icon-border"></i>
           </div>
       </div>
    </div>
</template>
<script>
import axios from 'axios';
import("@/assets/css/table.scss")
export default {
    data(){
        return{
            type:0,
            show:false,
            total:0,
            filterText:'',
            tableData:[],
            pageIndex:1,
            name:"xiaoming"

        }
    },
    inject:{
        buttonList:{
            default:[]
        }
    },
    props:{
        tableLabel:{ //表格字段
            require:true,
            type:Array
        },
        getData:{
            require:true,
            type:Function
        },
        /* buttonList:Array, */
        'disabled-add':Boolean,
        filter:{ //是否显示搜索框
            default:true,
            type:Boolean
        },
        showAdd:{ //是否显示新增按钮
            default:true,
            type:Boolean
        },
        addData:Object,
        dialogWidth:{
            default:'450px',
            type:String
        }, //弹出框宽度
        deleteRow:Function, //删除
        exportData:Function, //导出
        showOperation:{
            type:Boolean,
            default:true
        },
        showEdit:{
            type:Boolean,
            default:true
        }
    },
    components:{
    },
    computed:{
        disabledExport(){
            if(this.tableData.length > 0){
                return false
            }else{
                return true
            }
        },

    },
    watch: {
        filterText(val){
            this.queryData()
        },
        pageIndex(val){
            if(val>=1&&val<=this.total){
                this.handleCurrentChange(val)
            }
        }
    },
    created(){
        this.queryData()
    },
    methods:{
        firstPage(){
            this.pageIndex = 1
        },
        lastPage(){
            this.pageIndex = this.total
        },
        prePage(){
            if(this.pageIndex > 1){
                this.pageIndex --
            }
        },
        nextPage(){
            if(this.pageIndex < this.total){
                this.pageIndex ++
            }
        },
        changePage(val){
            if(val<1){
                this.pageIndex = 1
            }else if(val>this.total){
                this.pageIndex = this.total
            }
        },
        /**
         * 查询表格数据
         */
        queryData(){
            let getData = this.getData(this)
            if(!getData){
                return
            }
            getData.then((result) => {
                let total = result.FObject.FTotalCount || 0
                this.total = Math.ceil(total/10)
                this.tableData = result.FObject.Data || []
                /**
                 * 删除操作时，当前页面无数据时跳到上一页
                 */
                if(this.tableData.length === 0&&this.pageIndex > 1){
                    --this.pageIndex
                    this.queryData()
                }
            }).catch((err) => {
                
            });
        },
        handleCurrentChange(val){
            this.pageIndex = val
            this.queryData()
        },
        /**
         * 点击新增
         */
        beforeAdd(){
            this.type = 0;
            this.show = true
            this.$emit('beforeAdd')
        },
        /**
         * 编辑
         */
        editItem(item){
            this.type = 1
            this.show = true
            this.$emit('editItem',item)
        },
        /**
         * 确定（弹出框）
         */
        async submit(){
            this.$emit('submit')
        },
        beforeDelete(text = ''){
            return new Promise((resolve,reject) => {
                this.$confirm(`此操作将删除${text}, 是否继续?`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                  }).then(() => {
                      resolve()
                  }).catch(() => {
                      reject()
                  });
            })
        },
        /**
         * 删除
         */
        async deleteItem(item){
            await this.beforeDelete()
            this.deleteRow(item)
            .then((result) => {
                if(result.FObject>0){
                    this.queryData()
                    this.$message({
                        message:'删除成功',
                        type:'success',
                        duration:'500'
                    })
                }else{
                    this.$message({
                        message:'删除失败',
                        type:'error',
                        duration:'500'
                    })
                }
            }).catch((err) => {
                this.$message({
                    message:'删除失败',
                    type:'error',
                    duration:'500'
                })
            });
        },
        /**
         * 导出
         */
        exportFile(){
            if(this.tableData.length === 0){
                return
            }
            this.exportData(this)
            .then((result) => {
                window.location = axios.defaults.baseURL + result.FObject;
            }).catch((err) => {
                console.log(err)
            });
        },
        tableRowClassName({row, rowIndex}) {
            if (rowIndex%2 === 1) {
              return 'odd-row';
            } else if (rowIndex%2 === 0) {
              return 'even-row';
            }
        },
    }
}
</script>
<style lang="scss">
    
</style>