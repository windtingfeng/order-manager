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
        <el-button type="primary" @click="seachdata" style="margin-left:10px">查询</el-button>
      </div>
    <!-- 图表区域 -->
    <div class="goodscont-echart">
      <div id="main" style="width: 1100px;height:600px;"></div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import { ordertotal } from '@/api/apis'
import { formatyear,formatdatestring } from '@/utils/util.js' 
export default {
  name:'goodscont',
  data(){
    return{
      date:["2019-10-01 00:00:00", "2022-10-10 00:00:00"]
    }
  },
  mounted(){
    //挂载图表
    ordertotal(JSON.stringify(this.date)).then(res => {
      this.getecharts(res)
    })

  },
  methods:{
    //封装图表
    getecharts(res){
      let xinfo = []
      let yinfo = []
      for(let obj of res.data.data){
        xinfo.push(formatyear(obj.orderTime))
        yinfo.push(obj.orderAmount)
      }
      let myChart = echarts.init(document.getElementById('main'));
      let option = {
            title:{
              text: "订单统计",
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'cross',
                crossStyle: {
                  color: '#999'
                }
              }
            },
            toolbox: {
              feature: {
                dataView: { show: true, readOnly: false },
                magicType: { show: true, type: ['line', 'bar'] },
                restore: { show: true },
                saveAsImage: { show: true }
              }
            },
            legend: {
              data: ['订单金额']
            },
            xAxis: [
              {
                type: 'category',
                data: xinfo,
                axisPointer: {
                  type: 'shadow'
                }
              }
            ],
            yAxis: [
              {
                type: 'value',
                name: 'Precipitation',
                interval: 50,
                axisLabel: {
                  formatter: '{value} 元'
                }
              },
              {
                type: 'value',
                name: 'Temperature',
                interval: 5,
                axisLabel: {
                  formatter: '{value} 元'
                }
              }
            ],
            series: [
              {
                name: '订单金额',
                type: 'bar',
                tooltip: {
                  valueFormatter: function (value) {
                    return value;
                  }
                },
                data: yinfo
              },
              {
                name: '订单金额',
                type: 'line',
                yAxisIndex: 1,
                tooltip: {
                  valueFormatter: function (value) {
                    return value;
                  }
                },
                data: yinfo
              }
            ]
          }
        myChart.setOption(option)
    },
    seachdata(){
      ordertotal(JSON.stringify(formatdatestring(this.date))).then( res => {
        console.log(res);
        this.getecharts(res)
      })
    }
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