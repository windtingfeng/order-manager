<template>
  <div class="main-box">
    <div class="main-top">
      <div class="top-item">
        <img src="../assets/imgs/form.png" width="50px" alt="">
        <div class="top-item-right">
          <p class="top-order">总订单</p>
          <p class="top-pri">{{ orderdata.totalOrder }}</p>
        </div>
      </div>
      <div class="top-item">
        <img src="../assets/imgs/dollar.png" width="50px" alt="">
        <div class="top-item-right">
          <p class="top-order">总销售额</p>
          <p class="top-pri">{{ orderdata.totalAmount }}</p>
        </div>
      </div>
      <div class="top-item">
        <img src="../assets/imgs/edit.png" width="50px" alt="">
        <div class="top-item-right">
          <p class="top-order">今日订单数</p>
          <p class="top-pri">{{ orderdata.todayOrder }}</p>
        </div>
      </div>
      <div class="top-item">
        <img src="../assets/imgs/money_bag.png" width="50px" alt="">
        <div class="top-item-right">
          <p class="top-order">今日销售额</p>
          <p class="top-pri">{{ orderdata.totayAmount }}</p>
        </div>
      </div>
    </div>
    <!-- echart折线图 -->
    <div id="echart"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import { ordertotaldata } from '../api/apis'
export default {
  name: "mainindex",
  data() {
    return {
      orderdata:{}
    };
  },
  async created(){
    this.orderdata = (await ordertotaldata()).data
  },
  mounted(){
    var chartDom = document.getElementById("echart");
    var myChart = echarts.init(chartDom);
    var option;
    //echart
    ordertotaldata().then(res => {
      option = {
      title: {
        text: "数据统计",
      },
      tooltip: {
        trigger: "axis",
      },
      legend: {
        data: ["订单", "销售额", "注册人数", "管理员人数"],
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      toolbox: {
        feature: {
          saveAsImage: {},
        },
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: res.data.xData
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          name: "订单",
          type: "line",
          stack: "Total",
          data: res.data.orderData,
        },
        {
          name: "销售额",
          type: "line",
          stack: "Total",
          data: res.data.amountData,
        },
        {
          name: "注册人数",
          type: "line",
          stack: "Total",
          data: [150, 232, 201, 154, 190, 330, 410],
        },
        {
          name: "管理员人数",
          type: "line",
          stack: "Total",
          data: [320, 332, 301, 334, 390, 330, 320],
        }
      ],
    };

    option && myChart.setOption(option);
    })
  },
};
</script>

<style lang="less" scoped>
.main-box {
  height: 100%;
  padding: 10px;
  .main-top {
    width: 96%;
    display: flex;
    justify-content: space-between;
    margin: 0 auto;
    .top-item{
      width: 300px;
      height: 100px;
      background-color: #fff;
      display: flex;
      justify-content: space-around;
      align-items: center;
      .top-item-right{
        text-align: center;
        .top-order{
          color: #cdcdcd;
        }
        .top-pri{
          font-weight: 600;
        }
      }
    }
  }

  //echart
  #echart{
    margin: 0 auto;
    margin-top: 50px;
    width: 96%;
    height: 600px;
    background-color: #fff;
    padding: 15px;
    box-sizing: border-box;
  }
}
</style>