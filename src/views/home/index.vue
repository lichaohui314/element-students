<template>
  <div class="dashboard-editor-container">

    <panel-group @handleSetLineChartData="handleSetLineChartData" />

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart :chart-data="lineChartData" />
    </el-row>

  </div>
</template>

<script>
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'

const lineChartData = {
  newVisitis: {
    // 预期数据
    expectedData: [200, 230, 235, 220, 100, 150, 160, 200, 230, 250, 300, 350],
    // 实际数据
    actualData: [190, 240, 233, 230, 130, 140, 155, 213, 220, 213, 250, 291]
  },
  messages: {
    expectedData: [255, 237, 235, 240, 200, 150, 160, 255, 237, 250, 300, 350],
    actualData: [190, 240, 233, 230, 130, 140, 155, 213, 240, 213, 250, 291]
  },
  purchases: {
    expectedData: [255, 237, 235, 240, 200, 150, 160, 255, 237, 250, 300, 350],
    actualData: [190, 240, 233, 230, 130, 140, 155, 213, 240, 213, 250, 291]
  },
  shoppings: {
    expectedData: [255, 237, 235, 240, 200, 150, 160, 255, 237, 250, 300, 350],
    actualData: [190, 240, 233, 230, 130, 140, 155, 213, 240, 213, 250, 291]
  }
}

export default {
  name: 'DashboardAdmin',
  components: {
    PanelGroup,
    LineChart
  },
  data() {
    return {
      lineChartData: lineChartData.newVisitis
    }
  },
  methods: {
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 15px;
  }
}

@media (max-width: 1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
