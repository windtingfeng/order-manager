<template>
  <div id="login-page">
    <h2>系统登录</h2>
    <el-input
      placeholder="请输入内容"
      v-model="username"
      clearable>
    </el-input>
    <el-input placeholder="请输入密码" v-model="password" show-password></el-input>
    <el-button type="primary" @click="checklogin">登录</el-button>
  </div>
</template>

<script>
import { login } from '../api/apis'
export default {
  name:'login',
  data(){
    return{
      username:'',
      password:''
    }
  },
  methods:{
    checklogin(){
      login({account:this.username,password:this.password}).then((res) => {
        if(res.data.code == 0){
          console.log(res);
          sessionStorage.token = res.data.token
          sessionStorage.role = res.data.role
          sessionStorage.username = this.username
          sessionStorage.id = res.data.id
          this.$router.push('/')
        }
        if(res.data.code == 1){
          alert(res.data.msg)
        }
      }).catch((err) => {
        console.error(err)
        alert('登录失败')
      })
    }
  }
}
</script>

<style lang="less">
#login-page{
  width: 100%;
  height: 100%;
  background-color: #2D3A4B;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h2 {
    color: #fff;
  }
  .el-input{
    width: 250px;
    margin: 5px 0px;
  }
  .el-input__inner{
    background-color: #2D3A4B;
  }
  .el-button{
    width: 250px;
  }
}
</style>