<template>
  <div class="goodslist-box">
    <div class="goodslist-title">商品列表</div>
    <!-- 商品表格 -->
    <el-table :data="tableData" style="width: 100%">
      <!-- 下拉详情 -->
      <el-table-column type="expand">
        <template slot-scope="props">
          <div class="goodslist-hidden-box">
            <div>
              <p>商品ID   {{ props.row.id }}</p>
              <p>所属分类  {{ props.row.category }}</p>
              <div><span>商品图片  </span><el-image
            style="width: 70px; height: 70px"
            :src="GET_GOODS_IMG + props.row.imgUrl"
            fit="fill"></el-image></div>
              <p>商品评价  {{ props.row.rating }}</p>
              <p>商品描述  {{ props.row.goodsDesc }}</p>
            </div>
            <div>
              <p>商品名称  {{ props.row.name }}</p>
              <p>商品价格  {{ props.row.price }}</p>
              <p>创建时间  {{ props.row.ctime }}</p>
              <p>商品销量  {{ props.row.sellCount }}</p>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="商品名称" prop="name">
        <template slot-scope="scope">
          <span v-if="!scope.row.isedit">{{ scope.row.name }}</span>
          <el-input v-else v-model="scope.row.name" size="small"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="商品分类" prop="category">
        <template slot-scope="scope">
          <span v-if="!scope.row.isedit">{{ scope.row.category }}</span>
          <el-input v-else v-model="scope.row.category" size="small"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="商品价格" prop="price">
        <template slot-scope="scope">
          <span v-if="!scope.row.isedit">{{ scope.row.price }}</span>
          <el-input v-else v-model="scope.row.price" size="small"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="商品图片" prop="imgUrl">
        <template slot-scope="scope"> 
          <el-image
            style="width: 70px; height: 70px"
            :src="GET_GOODS_IMG + scope.row.imgUrl"
            fit="fill"
            v-if="!scope.row.isedit"></el-image>
          <el-upload
            class="avatar-uploader"
            :action="GOODS_IMG_UPLOAD"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            v-else>
            <img v-if="scope.row.imgUrl" style="width: 70px; height: 70px" :src="GET_GOODS_IMG+scope.row.imgUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </template>
      </el-table-column>
      <el-table-column label="商品描述" prop="goodsDesc">
        <template slot-scope="scope">
          <span v-if="!scope.row.isedit">{{ scope.row.goodsDesc }}</span>
          <el-input v-else v-model="scope.row.goodsDesc" size="small"></el-input>
        </template>
      </el-table-column>
      <el-table-column
          fixed="right"
          label="操作">
          <template slot-scope="scope">
            <el-button @click="clickeditgood(scope.row)" type="primary" size="small">{{ scope.row.isedit?'保存':'编辑' }}</el-button>
            <el-button @click="clickdelgood(scope.row)" v-if="!scope.row.isedit" size="small" type="danger">删除</el-button>
            <el-button @click="clickcancel" v-else size="small">取消</el-button>
          </template>
        </el-table-column>
    </el-table>
    <!-- 分页 -->
      <el-pagination
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        :current-page.sync="currentPage"
        :page-size="pageSize"
        :page-sizes=[6,12,24]
        layout="total,sizes, prev, pager, next,jumper"
        :total="total"
        style="background-color:#fff;padding:20px;">
      </el-pagination>
  </div>
</template>

<script>
import { getgoodslist,GET_GOODS_IMG,GOODS_IMG_UPLOAD,editgoods,delgoods } from '@/api/apis'
import { formatyear } from '@/utils/util'
export default {
  name:'goodslist',
  data(){
    return{
      tableData:[

      ],
      currentPage:1,
      pageSize:6,
      total:0,
      GET_GOODS_IMG:'',//获取图片地址
      GOODS_IMG_UPLOAD:'' //图片上传
    }
  },
  created(){
    this.GET_GOODS_IMG = GET_GOODS_IMG
    this.GOODS_IMG_UPLOAD = GOODS_IMG_UPLOAD
    this.gettablelist()
  },
  methods:{
    //封装请求
    gettablelist(){
      getgoodslist({currentPage:this.currentPage,pageSize:this.pageSize}).then(res => {
            for(let obj of res.data.data){
              obj.ctime = formatyear(obj.ctime)
              obj.isedit = false
            }
            this.tableData = res.data.data
            this.total = res.data.total
      })
    },
    handleCurrentChange(){
      this.gettablelist()
    },
    handleSizeChange(num){
      this.pageSize = num
      this.gettablelist()
    },
    //点击编辑按钮
    clickeditgood(row){
      if(!row.isedit){
        row.isedit = true
        this.goodrow = row
      }else{
        row.isedit = false
        console.log(row);
        editgoods(this.goodrow).then(res => {
          this.$message({
            message:res.data.msg,
            type:'success'
          })
          this.gettablelist
        })
      }
    },
    //图片上传成功回调
    handleAvatarSuccess(res){
      this.goodrow.imgUrl = res.imgUrl
    },
    //点击删除按钮
    clickdelgood(row){
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delgoods(row.id).then(res => {
            this.$message({
              message:res.data.msg,
              type:'success'
            })
            this.gettablelist()
          })
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //点击取消按钮
    clickcancel(){
      this.gettablelist()
    }
  }
};
</script>

<style lang="less" scoped>
.goodslist-box{
  .goodslist-title{
      padding: 15px;
      background-color: #fff;
      border-bottom: 1px solid rgb(233, 233, 233);
    }
  .goodslist-hidden-box{
    display: flex;
    padding: 0px 50px;
    div{
      width: 50%;
    }
  }
}
</style>