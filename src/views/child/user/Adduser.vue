<template>
  <div class="adduser-box">
      <div class="adduser-title">添加账号</div>
      <!-- 表单区域 -->
      <el-form style="width:300px;padding:20px" label-width="80px" :model="formUser">
        <el-form-item label="账号">
          <el-input v-model="formUser.account"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="formUser.password"></el-input>
        </el-form-item>
        <el-form-item label="用户组">
          <el-select v-model="formUser.userGroup" placeholder="请选择用户组">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="clickadduser" size="small" type="primary">添加</el-button>
          <el-button @click="clickreset" size="small">重置</el-button>
        </el-form-item>
      </el-form>
  </div>
</template>

<script>
import { useradd } from '@/api/apis'
export default {
  name:'adduser',
  data(){
    return{
      formUser:{
        account:'',
        password:'',
        userGroup:''
      },
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

  },
  methods:{
    //添加用户
    clickadduser(){
      useradd(this.formUser).then(res => {
        this.$message({
          message:res.data.msg,
          type:'success'
        })
      })
    },
    //重置表单
    clickreset(){
      this.formUser.account = ''
      this.formUser.password = ''
      this.formUser.userGroup = []
    }
  }
}
</script>

<style lang="less">
.adduser-box{
  width: 100%;
  background-color: #fff;
  .adduser-title{
    padding: 10px 20px;
    box-sizing: border-box;
    width: 100%;
    border-bottom: 1px solid rgb(233, 233, 233);
  }
}
</style>