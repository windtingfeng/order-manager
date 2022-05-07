<template>
  <div class="goodscont-box">
    <!-- 搜索区域 -->
      <div class="goodscont-seach">
        <span>时间范围</span>
        <el-date-picker
          v-model="date"
          style="margin-left:10px"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
        <el-button type="primary" style="margin-left:10px">查询</el-button>
      </div>
    <!-- 图表区域 -->
    <div class="goodscont-echart">
      <div id="main" style="width: 1100px;height:600px;"></div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name:'goodscont',
  data(){
    return{
      date:[]
    }
  },
  mounted(){
    let myChart = echarts.init(document.getElementById('main'));
    let option = {
      title: {
        text: "商品统计",
      },
      xAxis: {
        data: ['A', 'B', 'C', 'D', 'E']
      },
      yAxis: {},
      series: [
        {
          data: [10, 22, 28, 23, 19],
          type: 'line',
          areaStyle: {}
        },
        {
          data: [25, 14, 23, 35, 10],
          type: 'line',
          areaStyle: {
            color: '#ff0',
            opacity: 0.5
          }
        }
      ]
    }
    myChart.setOption(option);
  }
}
</script>

<style lang="less">
.goodscont-box{
  width: 100%;
  .goodscont-echart{
    width: 100%;
    background-color: #fff;
    margin-top: 20px;
    padding: 20px;
    box-sizing: border-box;
  }
}
</style>