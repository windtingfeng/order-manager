<template>
  <div class="userinfo-box">
      <div class="userinfo-title">管理员信息</div>
      <div class="userinfo-content">管理员ID:  {{ id }}</div>
      <div class="userinfo-content">账号:  {{ account }}</div>
      <div class="userinfo-content">用户组:  {{ userGroup }}</div>
      <div class="userinfo-content">创建时间:  {{ ctime }}</div>
      <div class="userinfo-content">管理员头像:  <img :src="imgUrl" width="50px" alt=""></div>
  </div>
</template>

<script>
import { accountinfo } from '@/api/apis'
import { formatyear } from '@/utils/util.js'
export default {
    name:'userinfo',
    data(){
        return{
            id:'',
            ctime:'',
            account:'',
            userGroup:'',
            imgUrl:''
        }
    },
    created(){
        accountinfo(sessionStorage.id).then(res => {
            console.log(res);
            this.id = res.data.accountInfo.id
            this.ctime = formatyear(res.data.accountInfo.ctime)
            this.account = res.data.accountInfo.account
            this.userGroup = res.data.accountInfo.userGroup
            this.imgUrl = res.data.accountInfo.imgUrl
        })
    }
}
</script>

<style lang="less" scoped>
.userinfo-box{
    width: 100%;
    background-color: #fff;
    .userinfo-title{
        padding: 10px 20px;
        box-sizing: border-box;
        width: 100%;
        border-bottom: 1px solid rgb(233, 233, 233);
    }
    .userinfo-content{
        padding: 10px 20px;
        width: 100%;
        border-bottom: 1px solid rgb(233, 233, 233);
    }
}
</style>