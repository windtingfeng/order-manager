<template>
  <div class="user-box">
      <div class="user-title">账号列表</div>
      <!-- 表格区域 -->
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%;"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          label="账号"
          width="200">
          <template slot-scope="scope">
            <span v-if="!scope.row.isshowsave">{{ scope.row.account }}</span>
            <el-input v-else v-model="scope.row.account"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          prop="userGroup"
          label="用户组"
          width="200">
          <template slot-scope="scope">
            <span v-if="!scope.row.isshowsave">{{ scope.row.userGroup }}</span>
            <el-select v-else v-model="scope.row.userGroup" placeholder="请选择用户组">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          </template>
        </el-table-column>
        <el-table-column
          prop="ctime"
          label="创建时间"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作">
          <template slot-scope="scope">
            <el-button @click="cilckedituser(scope.row)" size="small">{{scope.row.isshowsave ? '保存':'编辑'}}</el-button>
            <el-button @click="clickdeluser(scope.row.id)" size="small" type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        :current-page.sync="currentPage"
        :page-size="pageSize"
        :page-sizes=[5,10,20]
        layout="total,sizes, prev, pager, next,jumper"
        :total="total"
        style="background-color:#fff;padding:20px;">
      </el-pagination>
      <!-- 批量删除 -->
      <div class="user-bottom">
        <el-button size="small" @click="batchdel" type="danger">批量删除</el-button>
        <el-button size="small" @click="unselect" type="primary">取消选中</el-button>
      </div>
  </div>
</template>

<script>
import { getuserslist,batchdelusers,editusers,deluser } from '@/api/apis'
import { formatyear } from '@/utils/util.js'
export default {
  name:'userlist',
  data(){
    return{
      tableData:[],
      currentPage:1,
      pageSize:5,
      total:0,
      ids:[],
      isClear:false,
      options:[
        {
          value:'超级管理员',
          lable:'超级管理员'
        },
        {
          value:'普通管理员',
          lable:'普通管理员'
        }
      ]
    }
  },
  created(){
    this.getuserlist()
  },
  methods:{
    //封装获取账号列表
    getuserlist(){
      getuserslist({currentPage:this.currentPage,pageSize:this.pageSize}).then(res => {
        for(let obj of res.data.data){
          obj.ctime = formatyear(obj.ctime)
          obj.isshowsave = false
        }
        this.tableData = res.data.data
        this.total = res.data.total
      })
    },
    handleSelectionChange(res){
      let arr = []
      for(let obj of res){
        arr.push(obj.id)
      }
      this.ids = JSON.stringify(arr)
      console.log(this.ids);
    },
    handleCurrentChange(){

    },
    handleSizeChange(){

    },
    //批量删除
    batchdel(){
      if(this.ids.length > 0){
        batchdelusers(this.ids).then(res => {
          this.getuserlist()
          this.$message({
            message:res.data.msg,
            type:'success'
          })
        })
      }
    },
    //取消选中
    unselect(){
      this.$refs.multipleTable.clearSelection()
    },
    //编辑用户
    cilckedituser(row){
      console.log(row);
      if(row.isshowsave == false){
        row.isshowsave = true
      }else{
        editusers(row).then(res => {
          this.$message({
            message:res.data.msg,
            type:'success'
          })
          this.getuserlist()
        })
        row.isshowsave = false
      }

    },
    //删除用户
    clickdeluser(id){
      deluser(id).then(res => {
        this.$message({
            message:res.data.msg,
            type:'success'
          })
          this.getuserlist()
      })
    }
  }
}
</script>

<style lang="less">
.user-box{
  width: 100%;
  background-color: #fff;
  .user-title{
    padding: 10px 20px;
    box-sizing: border-box;
    width: 100%;
    border-bottom: 1px solid rgb(233, 233, 233);
  }
  .user-bottom{
    padding: 20px;
  }
}
</style>