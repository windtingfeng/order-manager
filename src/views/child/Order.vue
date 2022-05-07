<template>
  <div class="ordermanager">
      <!-- 搜索区域 -->
      <div class="ordermanager-top">
        <span>订单号  </span><el-input v-model="seach.orderNo" size="small" placeholder="订单号" />
        <span>收货人  </span><el-input v-model="seach.consignee" size="small" placeholder="收货人" />
        <span>手机号  </span><el-input v-model="seach.phone" size="small" placeholder="手机号" />
        <span>订单状态  </span>
        <el-select v-model="seach.orderState" size="small" placeholder="订单状态">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value" 
          >
          </el-option>
        </el-select>
        <div class="ordermanager-top-time">
          <span>选择时间  </span>
          <el-date-picker
            v-model="seach.date"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            size="small"
          >
          </el-date-picker>
          <el-button 
            size="small"
            type="primary"
            @click="checkseach"
          >
          查询
          </el-button>
        </div>
      </div>
      <!-- 表格数据 -->
      <el-table
        :data="tableData"
        style="width:100%"
        border
      >
        <el-table-column
          prop="orderNo"
          label="订单号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="orderTime"
          label="下单时间"
          width="150">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="手机号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="consignee"
          label="收货人"
          width="150">
        </el-table-column>
        <el-table-column
          prop="deliverAddress"
          label="配送地址">
        </el-table-column>
        <el-table-column
          prop="deliveryTime"
          label="送达时间"
          width="150">
        </el-table-column>
        <el-table-column
          prop="remarks"
          label="用户备注">
        </el-table-column>
        <el-table-column
          prop="orderAmount"
          label="订单金额"
          width="100">
        </el-table-column>
        <el-table-column
          prop="orderState"
          label="订单状态"
          width="90">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button @click="clickfindorder(0,scope.row)" type="text" size="small">查看</el-button>
            <el-button @click="clickfindorder(1,scope.row)" type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="seachdata.currentPage"
        :page-size="6"
        layout="total, prev, pager, next,jumper"
        :total="total">
      </el-pagination>
      <!-- 查看详情dialog -->
      <el-dialog title="订单详情" width="500px" :visible.sync="dialogFormVisible">
        <el-form :model="dialogData" :disabled="disabled">
          <el-form-item label="订单号" label-width="100px">
            <el-input v-model="dialogData.orderNo" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="下单时间" label-width="100px">
            <el-date-picker
              v-model="dialogData.orderTime"
              type="datetime"
              placeholder="选择日期时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="联系电话" label-width="100px">
            <el-input v-model="dialogData.phone" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="收货人" label-width="100px">
            <el-input v-model="dialogData.consignee" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="送货地址" label-width="100px">
            <el-input v-model="dialogData.deliverAddress" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="送达时间" label-width="100px">
            <el-date-picker
              v-model="dialogData.deliveryTime"
              type="datetime"
              placeholder="选择日期时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="备注" label-width="100px">
            <el-input v-model="dialogData.remarks" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="订单金额" label-width="100px">
            <el-input v-model="dialogData.orderAmount" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="订单状态" label-width="100px">
            <el-input v-model="dialogData.orderState" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button v-if="!disabled" type="primary" @click="clickorderedit">确 定</el-button>
        </div>
      </el-dialog>
  </div>
</template>

<script>
import { getorderlist,getorderdetail,editorder } from '../../api/apis'
import { formatdate,formatdatestring,formatyear } from '../../utils/util'
export default {
  name:'order',
  data(){
    return{
      options:[
        {value:'已完成',label:'已完成'},
        {value:'已受理',label:'已受理'},
        {value:'派送中',label:'派送中'}
      ],//下拉数据
      seach:{
        orderNo:'',
        consignee:'',
        orderState:'',
        phone:'',
        date:[],
      },
      seachdata:{
        orderNo:'',
        consignee:'',
        orderState:'',
        phone:'',
        date:[],
        currentPage:1, //当前页数
        pageSize:6,  //每页条数
      }, //搜索数据
      tableData:[], //表格数据
      total:10,  //总数据
      dialogData:{},
      dialogFormVisible:false,
      disabled:false //dialog表单是否可编辑
    }
  },
  created(){
    this.gettablelist()
  },
  methods:{
    //获取表格数据
    gettablelist(){
      getorderlist(this.seachdata).then((res) => {
        this.total = res.data.total
        for(let obj of res.data.data){
          obj.orderTime = formatdate(obj.orderTime)
          obj.deliveryTime = formatdate(obj.deliveryTime)
        }
        this.tableData = res.data.data
      })
    },
    //搜索按钮点击
    checkseach(){
      if(this.seach.date){
        this.seach.date = formatdatestring(this.seach.date)
        this.seachdata.date = JSON.stringify(this.seach.date)
      }
      this.seachdata.orderNo = this.seach.orderNo
      this.seachdata.consignee = this.seach.consignee
      this.seachdata.orderState = this.seach.orderState
      this.seachdata.phone = this.seach.phone
      this.seachdata.currentPage = 1
      console.log(this.seachdata);
      this.gettablelist()
    },
    //改变页码
    handleCurrentChange(){
      this.gettablelist()
    },
    //点击查看和编辑功能
    clickfindorder(num,row){
      if(num === 0){
        this.disabled = true
      }else{
        this.disabled = false
      }
      getorderdetail(row.id).then(res => {
        this.dialogData = res.data.data
      })
      this.dialogFormVisible = true
    },
    //点击确认修改
    clickorderedit(){
      this.dialogFormVisible = false
      this.dialogData.orderTime = formatyear(this.dialogData.orderTime)
      this.dialogData.deliveryTime = formatyear(this.dialogData.deliveryTime)
      console.log(this.dialogData);
      editorder(this.dialogData).then(res => {
        this.gettablelist()
        this.$message({
          message:res.data.msg,
          type:'success'
        })
      })
    }
  },
  computed:{
    
  }
}
</script>

<style lang="less" scoped>
.ordermanager{
  width: 100%;
  height: 100%;
  background-color: #fff;
  .ordermanager-top{
    height: 150px;
    padding: 20px;
    box-sizing: border-box;
    // display: flex;
    // flex-wrap: wrap;
    .ordermanager-top-time{
      margin: 10px 0px;
      display: flex;
      align-items: center;
    }
  }
}
.el-input{
  width: 200px;
  margin: 5px 10px;
}
.el-select{
  width: 200px;
  margin: 5px 10px;
}
.el-date-editor{
  margin: 0px 10px;
}
.el-table{
  margin: 20px 0px;
}
</style>