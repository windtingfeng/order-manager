<template>
  <div class="goodsclass-box">
    <div class="goodsclass-title">
      <span>商品分类</span
      ><el-button size="small" @click="clickAdd" type="primary"
        >添加分类</el-button
      >
    </div>
    <!-- 分类表格 -->
    <el-table :data="tableData" style="width: 100%; padding: 10px">
      <el-table-column prop="id" label="序号"> </el-table-column>
      <el-table-column prop="cateName" label="分类名称">
        <template slot-scope="scope">
          <span v-show="!scope.row.show">{{ scope.row.cateName }}</span>
          <!-- 编辑状态显示 -->
          <el-input
            v-show="scope.row.show"
            v-model="scope.row.cateName"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="state" label="是否启用">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.state"
            :active-value="1"
            :inactive-value="0"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="changestate(scope.row)"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            v-show="edit == 0 ? true : false"
            @click="handleClick(scope.row)"
            size="small"
            >编辑</el-button
          >
          <el-button
            v-show="edit == 0 ? false : true"
            @click="handleSave(scope.row)"
            size="small"
            >保存</el-button
          >
          <el-button size="small" type="danger" @click="handleDel(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
      :current-page.sync="currentPage"
      :page-size="pageSize"
      :page-sizes="[5, 10, 20]"
      layout="total,sizes, prev, pager, next,jumper"
      :total="total"
      style="background-color: #fff; padding: 20px"
    >
    </el-pagination>

    <!-- 嵌套表单dialog -->
    <el-dialog title="添加分类" :visible.sync="dialogFormVisible">
      <el-form :model="dialogForm">
        <el-form-item label="分类名称" label-width="200">
          <el-input v-model="dialogForm.cateName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否启用" label-width="200">
          <el-switch
            v-model="dialogForm.state"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="clickAddOk(dialogForm)"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { catelist, editcate, delcate, addcate } from "@/api/apis";
export default {
  name: "goodsclass",
  data() {
    return {
      tableData: [],
      currentPage: 1,
      pageSize: 5,
      total: 0,
      edit: 0,
      dialogFormVisible: false,
      dialogForm: {
        cateName: "",
        state: true,
      },
    };
  },
  created() {
    this.getcatelist();
  },
  methods: {
    getcatelist() {
      catelist({ currentPage: this.currentPage, pageSize: this.pageSize }).then(
        (res) => {
          this.tableData = res.data.data;
          this.total = res.data.total;
        }
      );
    },
    handleCurrentChange() {
      this.getcatelist();
    },
    handleSizeChange(num) {
      this.pageSize = num;
      this.getcatelist();
    },
    //点击状态
    changestate(row) {
      if (row.state == 1) {
        row.state = true;
      } else {
        row.state = false;
      }
      editcate(row).then((res) => {
        this.$message({
          message: res.data.msg,
          type: "success",
        });
        this.getcatelist();
      });
    },
    //编辑
    handleClick(row) {
      this.edit = 1;
      row.show = true;
    },
    //保存
    handleSave(row) {
      this.edit = 0;
      row.show = false;
      if(row.state == 1){
        row.state = true
      }else{
        row.state = false
      }
      console.log(row);
      editcate(row).then((res) => {
        this.$message({
          message: res.data.msg,
          type: "success",
        });
        this.getcatelist();
      });
    },
    //删除
    handleDel(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delcate(id).then((res) => {
            this.getcatelist();
            this.$message({
              type: "success",
              message: res.data.msg,
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //添加分类按钮
    clickAdd() {
      this.dialogFormVisible = true;
    },
    //确认添加
    clickAddOk(dialogForm) {
      addcate(dialogForm).then((res) => {
        this.dialogFormVisible = false
        this.getcatelist();
        this.$message({
          type: "success",
          message: res.data.msg,
        });
      });
    },
  },
};
</script>

<style lang="less">
.el-table::before {
  height: 0;
}
.goodsclass-box {
  width: 100%;
  background-color: #fff;
  .goodsclass-title {
    padding: 10px 20px;
    box-sizing: border-box;
    width: 100%;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid rgb(233, 233, 233);
  }
}
</style>