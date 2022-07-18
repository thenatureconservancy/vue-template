<template>
  <div class="">
    <apexcharts
      width="100%"
      height="100"
      type="bar"
      :options="chartOptions"
      :series="chartOptions.series"
    ></apexcharts>
  </div>
</template>

<script>
import VueApexCharts from 'vue3-apexcharts';

export default {
  name: 'SocialVulnerabilityIndex',
  components: {
    apexcharts: VueApexCharts,
  },
  data: function() {
    return {
      chartOptions: {
        series: [
          {
            data: [50],
          },
        ],
        chart: {
          type: 'bar',
          height: 100,
          toolbar: { show: false },
        },
        colors: ['#9ED9FF'],
        plotOptions: {
          bar: {
            borderRadius: 4,
            horizontal: true,
          },
        },
        dataLabels: {
          enabled: false,
        },
        tooltip: {
          y: {
            formatter: function() {
              return '<p>The town of Arrowsick <br/>is in the 21st percentile <br/>and is more vulnerable than <br/>21% of other coastal Maine towns.</p>';
            },
          },
        },
        xaxis: {
          categories: ['South Korea'],
          labels: {
            formatter: function(val) {
              return val + '%';
            },
          },
        },
        yaxis: {
          max: 100,
          labels: {
            show: false,
          },
        },
      },
    };
  },
  /* computed: {
    //chartData() {
     // return this.$store.state.changeRates;
    //},
  },
  watch: {
    //chartData() {
    //  this.updateChart();
    //},
  },
  methods: {
    //updateChart() {
    //  this.$store.state.changeRates;
    //  this.chartOptions.series = this.$store.state.changeRates;
    },*/
};
</script>
