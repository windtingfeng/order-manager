<template>
  <div class="addgoods-box">
      <div class="addgoods-title">
        商品添加
      </div>
      <!-- 表单区域 -->
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="商品名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="商品分类" prop="category">
          <el-select v-model="ruleForm.category" placeholder="请选择商品分类">
            <el-option v-for="(item,index) in category" :key="index" :label="item.cateName" :value="item.cateName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品价格" prop="price">
          <el-input-number v-model="ruleForm.price" :min="1" label="商品价格"></el-input-number>
        </el-form-item>
        <el-form-item label="商品图片" prop="imgUrl">
          <el-upload
            class="avatar-uploader"
            :action="GOODS_IMG_UPLOAD"
            :show-file-list="true"
            :on-success="handleAvatarSuccess">
            <img v-if="ruleForm.imgUrl" :src="GET_GOODS_IMG+ruleForm.imgUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="商品描述" prop="goodsDesc">
          <el-input type="textarea" v-model="ruleForm.goodsDesc"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm()">添加商品</el-button>
        </el-form-item>
      </el-form>
  </div>
</template>

<script>
import { GOODS_IMG_UPLOAD,categories,GET_GOODS_IMG,addgoods } from '@/api/apis'
export default {
  name:'addgoods',
  data() {
      return {
        ruleForm: {
          name: '',
          category: '',
          price: '',
          imgUrl: '',
          goodsDesc: '',
        },
        rules: {
          name: [
            { required: true, message: '请输入商品名称', trigger: 'blur' },
            { min: 3, max: 50, message: '长度在 3 到 50 个字符', trigger: 'blur' }
          ],
          category: [
            { required: true, message: '请选择商品分类', trigger: 'change' }
          ],
          goodsDesc: [
            { required: true, message: '请填商品描述', trigger: 'blur' }
          ]
        },
        GOODS_IMG_UPLOAD:'',
        GET_GOODS_IMG:'',
        category:''
      };
    },
    created(){
      this.GOODS_IMG_UPLOAD = GOODS_IMG_UPLOAD
      this.GET_GOODS_IMG = GET_GOODS_IMG
      categories().then(res => {
        this.category = res.data.categories
      })
    },
    methods: {
      submitForm() {
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            if(this.ruleForm.imgUrl){
              addgoods(this.ruleForm).then(res => {
                console.log(res);
                this.$message({
                  message: res.data.msg,
                  type: 'success'
                });
              })
            }else{
              alert('请上传商品图片')
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      handleAvatarSuccess(res) {
        this.ruleForm.imgUrl = res.imgUrl
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
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
.addgoods-box{
  width: 100%;
  background-color: #fff;
  .addgoods-title{
    padding: 15px;
    border-bottom: 1px solid rgb(233, 233, 233);
  }
  .demo-ruleForm{
    width: 500px;
    padding: 20px;
  }
}
</style>