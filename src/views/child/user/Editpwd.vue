<template>
  <div class="adduser-box">
      <div class="adduser-title">修改密码</div>
      <!-- 表单区域 -->
      <el-form style="width:300px;padding:20px" label-width="80px" :model="formUser">
        <el-form-item label="原密码">
          <el-input v-model="formUser.oldPwd"></el-input>
        </el-form-item>
        <el-form-item label="新密码">
          <el-input v-model="formUser.newPwd"></el-input>
        </el-form-item>
        <el-form-item label="确认密码">
          <el-input v-model="formUser.checknewPwd"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="clickpwdreset" size="small" type="primary">确认</el-button>
          <el-button @click="clickreset" size="small">重置</el-button>
        </el-form-item>
      </el-form>
  </div>
</template>

<script>
import { checkoldpwd,editpwd } from '@/api/apis'
export default {
  name:'adduser',
  data(){
    return{
      formUser:{
        oldPwd:'',
        newPwd:'',
        id:'',
        checknewPwd:''
      }
    }
  },
  created(){
    this.formUser.id = sessionStorage.id
  },
  methods:{
    //确认修改密码
    clickpwdreset(){
      checkoldpwd(this.formUser).then(res => {
        if(res.data.code === 0){
          editpwd(this.formUser).then(res => {
            this.$message({
              message:res.data.msg,
              type:'success'
            })
            sessionStorage.role = ''
            sessionStorage.token = ''
            sessionStorage.username = ''
            sessionStorage.id = ''
            this.$router.push('/login')
          })
        }else{
          alert('旧密码不正确')
        }
      })
    },
    //重置表单
    clickreset(){
      this.formUser.oldPwd = ''
      this.formUser.newPwd = ''
      this.formUser.checknewPwd = ''
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