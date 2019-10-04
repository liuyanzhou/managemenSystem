<template>
  <el-card>
    <!-- 面包屑 -->
    <mybread leavel1="数据统计" leavel2="数据报表"></mybread>

    <!-- 报表 -->
    <div ref='ecartsArea' style='width: 800px; height: 500px'></div>
  </el-card>
</template>

<script>
import echarts from 'echarts'

export default {
  data() {
    return {
        option:{}
    };
  },
  mounted(){
      this.UserEchart()
  },
  methods: {
   async UserEchart() {
      // init
      const mychart = echarts.init(this.$refs.ecartsArea);

      // option
   const { data: { data } } = await this.$http.get(`reports/type/1`) 
      const optionEcharts = {
        title: {
          text: ""
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985"
            }
          }
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        }
      };
      this.option = { ...data, ...optionEcharts };

      //use
       mychart.setOption(this.option)
    }
  }
};
</script>

<style></style>