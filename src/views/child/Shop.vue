<template>
  <div class="shop-box">
      <div class="shop-title">
        <span>店铺管理</span>
        <el-button type="primary" size="small" @click="submitForm">保存</el-button>
      </div>
      <!-- 表单区域 -->
      <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="店铺名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="店铺公告" prop="bulletin">
          <el-input type="textarea" autosize v-model="ruleForm.bulletin"></el-input>
        </el-form-item>
        <el-form-item label="店铺头像" prop="avatar">
          <el-upload
            class="avatar-uploader"
            :action="USER_AVATAR_UPLOAD"
            :show-file-list="false"
            :on-success="handleAvatarSuccess">
            <img v-if="ruleForm.avatar" :src="GET_SHOP_AVATAR+ruleForm.avatar" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="店铺图片" prop="pics">
          <el-upload
            :action="SHOP_IMG_UPLOAD"
            list-type="picture-card"
            :on-success="handleImgSuccess"
            :on-remove="handleRemove"
            :file-list="shopimgs">
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="配送费" prop="deliveryPrice">
          <el-input v-model="ruleForm.deliveryPrice"></el-input>
        </el-form-item>
        <el-form-item label="配送时间" prop="deliveryTime">
          <el-input v-model="ruleForm.deliveryTime"></el-input>
        </el-form-item>
        <el-form-item label="配送描述" prop="description">
          <el-input v-model="ruleForm.description"></el-input>
        </el-form-item>
        <el-form-item label="店铺评分" prop="score">
          <el-input v-model="ruleForm.score"></el-input>
        </el-form-item>
        <el-form-item label="销量" prop="sellCount">
          <el-input v-model="ruleForm.sellCount"></el-input>
        </el-form-item>
        <el-form-item label="活动" prop="supports">
          <el-checkbox-group v-model="ruleForm.supports">
            <el-checkbox label="在线支付满28减5"></el-checkbox>
            <el-checkbox label="VC无限橙果汁全场8折"></el-checkbox>
            <el-checkbox label="单人精彩套餐"></el-checkbox>
            <el-checkbox label="特价饮品8折抢购"></el-checkbox>
            <el-checkbox label="单人特色套餐"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="营业时间" prop="date">
          <el-time-picker
            is-range
            v-model="ruleForm.date"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            placeholder="选择时间范围"
            @change="changetime">
          </el-time-picker>
        </el-form-item>
      </el-form>
  </div>
</template>

<script>
import { 
  getshopinfo,
  GET_SHOP_IMG,
  SHOP_IMG_UPLOAD,
  USER_AVATAR_UPLOAD,
  GET_SHOP_AVATAR,
  editshop} from '@/api/apis'
import { formatdatestring } from '@/utils/util.js'
export default {
  name:'shop',
  data(){
    return{
      ruleForm:{
        name:'',
        bulletin:'',
        avatar:'',
        deliveryPrice:0,
        deliveryTime:0,
        description:'',
        score:2.2,
        sellCount:999,
        supports:[],
        date:['',''],
        pics:[],
      },
      GET_SHOP_IMG:'',
      SHOP_IMG_UPLOAD:'',
      USER_AVATAR_UPLOAD:'',
      GET_SHOP_AVATAR:'',
      shopimgs:[] //IP+pics地址数组
    }
  },
  created(){
    this.GET_SHOP_IMG = GET_SHOP_IMG
    this.SHOP_IMG_UPLOAD = SHOP_IMG_UPLOAD
    this.USER_AVATAR_UPLOAD = USER_AVATAR_UPLOAD
    this.GET_SHOP_AVATAR = GET_SHOP_AVATAR
    this.getshop()
  },
  methods:{
    //封装获取店铺信息
    getshop(){
      getshopinfo().then(res => {
        for(let key in res.data.data){
          this.ruleForm[key] = res.data.data[key]
        }
        this.shopimgs = this.ruleForm.pics.map(res => {
          return {
            name:res,
            url:GET_SHOP_IMG + res
          }
        })
        }).catch(err => {
        console.error(err)
      })
    },
    //头像上传回调
    handleAvatarSuccess(res){
      this.ruleForm.avatar = res.imgUrl
    },
    //店铺图片上传回调
    handleImgSuccess(res){
      this.ruleForm.pics.push(res.imgUrl)
    },
    //店铺图片删除回调
    handleRemove(res){
      this.ruleForm.pics.splice(this.ruleForm.pics.indexOf(res.name),1)
    },
    //修改时间回调
    changetime(time){
      this.ruleForm.date = formatdatestring(time)
    },
    //保存
    submitForm(){
      this.ruleForm.supports = JSON.stringify(this.ruleForm.supports)
      this.ruleForm.date = JSON.stringify(this.ruleForm.date)
      this.ruleForm.pics = JSON.stringify(this.ruleForm.pics)
      editshop(this.ruleForm).then(res => {
        this.getshop()
        this.$message({
          type: "success",
          message: res.data.msg,
        });
      })
    }
  }
}
</script>

<style lang="less">
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
.shop-box{
  width: 100%;
  background-color: #fff;
  .shop-title{
    padding: 10px 20px;
    box-sizing: border-box;
    width: 100%;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid rgb(233, 233, 233);
  }
  .demo-ruleForm{
    width: 500px;
    padding: 20px;
  }
}
</style>