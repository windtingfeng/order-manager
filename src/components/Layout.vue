<template>
    <el-container>
      <el-aside width="200px">
        <div class="top-logo"><img src="../assets/imgs/shop.png" width="50px" alt=""><span>外卖商家中心</span></div>
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          background-color="#304156"
          text-color="#fff"
          active-text-color="#ffd04b"
          router
        >
          <div v-for="(item,index) in menurole" :key="index" >
            <el-submenu :index="index.toString()" v-if="item.children">
              <template slot="title">
                <span :class="item.icon"></span>
                <span>  {{ item.title }}</span>
              </template>
              <el-menu-item-group v-for="child in item.children" :key="child.path">
                <el-menu-item :index="child.path"><span>{{ child.title }}</span></el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-menu-item :index="item.path" v-if="!item.children"><span :class="item.icon"></span><span>  {{ item.title }}</span></el-menu-item>
          </div>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <!-- 面包屑菜单 -->
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>首页</el-breadcrumb-item>
            <el-breadcrumb-item v-for="(item,index) in breadcrumb" :key="index">{{ item }}</el-breadcrumb-item>
          </el-breadcrumb>
          <!-- 用户名头像 -->
          <div class="userinfo-top-box">
            <span>欢迎您,{{ userinfo.account }}</span>
            <img @click="checkuserinfo" :src="userinfo.imgUrl" class="useravatar" alt="">
            <Transition name="fade">
            <div v-if="!ishidden" :class="{'userinfo-popover':true}">
              <div class="triangle"></div>
              <ul>
                <li><router-link to="/editpwd">修改密码</router-link></li>
                <li><router-link to="/userinfo">个人中心</router-link></li>
                <li><router-link to="/userinfo">退出登录</router-link></li>
              </ul>
            </div>
            </Transition>
          </div>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
      <!-- 蒙层 -->
      <div v-if="!ishidden" @click="clicishidden" :class="{'layer-container':true}"></div>
    </el-container>
</template>

<script>
import { accountinfo } from '@/api/apis'
export default {
  name:'layout',
  data(){
    return{
      //左侧菜单配置
      menulist:[
        {title:'后台首页',path:'/main',icon:'iconfont icon-home',meta:['normal','super']},
        {title:'订单管理',path:'/order',icon:'iconfont icon-file',meta:['normal','super']},
        {title:'商品管理',path:'/goodslist',icon:'iconfont icon-shangpin-xianxing',meta:['normal','super'],
          children:[
            {title:'商品列表',path:'/goodslist',meta:['normal','super']},
            {title:'商品添加',path:'/addgood',meta:['normal','super']},
            {title:'商品分类',path:'/goodsclass',meta:['normal','super']},
          ]
        },
        {title:'店铺管理',path:'/shop',icon:'iconfont icon-store',meta:['normal','super']},
        {title:'账号管理',path:'/userlist',icon:'iconfont icon-bussiness-man',meta:['normal','super'],
          children:[
            {title:'账号列表',path:'/userlist',meta:['super']},
            {title:'添加账号',path:'/adduser',meta:['super']},
            {title:'修改密码',path:'/editpwd',meta:['normal','super']},
          ]
        },
        {title:'销售统计',path:'/goodscont',icon:'iconfont icon-data',meta:['normal','super'],
          children:[
            {title:'商品统计',path:'/goodscont',meta:['normal','super']},
            {title:'订单统计',path:'/ordercont',meta:['normal','super']}
          ]
        },
      ],
      userinfo:{
        account:'',
        imgUrl:'',
      },
      ishidden:true,//是否隐藏头像下拉框
    }
  },
  created(){
    accountinfo(sessionStorage.id).then(res => {
      this.userinfo = res.data.accountInfo
    })
  },
  methods:{
    logout(){
      sessionStorage.role = ''
      sessionStorage.token = ''
      sessionStorage.username = ''
      sessionStorage.id = ''
      this.$router.push('/login')
    },
    //进入个人信息页面
    checkuserinfo(){
      if(this.ishidden == false){
        this.ishidden = true
      }else{
        this.ishidden = false
      }
      // if(this.$router.history.current.path == '/userinfo'){
      //   console.log('userinfo');
      // }else{
      //   this.$router.push('/userinfo')
      // }
    },
    //点击蒙层
    clicishidden(){
      this.ishidden = true
    }
  },
  computed:{
    //面包屑
    breadcrumb(){
      return this.$route.meta.breadcrumb || []
    },
    //权限过滤
    menurole(){
      let menu = this.menulist.filter((item) => {
        return item.meta.includes(sessionStorage.role)
      })
      for(let obj of menu){
        if(obj.children){
          obj.children = obj.children.filter((child) => {
            return child.meta.includes(sessionStorage.role)
          })
        }
      }
      return menu
    }
  }
};
</script>

<style lang="less" scoped>
.layer-container{
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 888;
}
.hidden{
  display: none;
}
/* we will explain what these classes do next! */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.el-container{
  height: 100%;
}
.el-header {
  background-color: rgb(255, 255, 255);
  color: #333;
  line-height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.el-aside {
  background-color: #304156;
  color: #fff;
}
.el-main {
  background-color: #F0F2F5;
  color: #333;
}
.el-menu{
  border: 0;
}

.top-logo{
  display: flex;
  align-items: center;
  padding: 10px;
}
.useravatar{
  width: 50px;
  border-radius: 50%;
  overflow: hidden;
}
.userinfo-top-box{
  align-items: center;
  display: flex;
  position: relative;
  .userinfo-popover{
    width: 200px;
    height: 200px;
    position: absolute;
    top:70px;
    right: 0px;
    background-color: rgb(224, 222, 222);
    z-index: 999;
    .triangle{
      width: 0px;
      height: 0px;
      border-top: 10px solid transparent;
      border-right: 10px solid transparent;
      border-bottom: 10px solid rgb(224, 222, 222);
      border-left: 10px solid transparent;
      position: absolute;
      top:-20px;
      right: 20px;
    }
    ul li{
      text-align: center;
    }
    ul li:hover{
      background-color: rgb(233, 233, 233);
    }
  }
}
</style>