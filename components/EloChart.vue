<template>
  <div class="parent-div">
    <img
      ref="loadingSpin"
      class="loading-spin"
      :src="CONST.LOADING_SPINNER_BASE64"
    >
    <div :id="`${id}_chart`" class="chart" ref="chartdiv"/>
  </div>
</template>

<script>
/* eslint-disable no-unreachable,no-debugger */
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import * as am5exporting from "@amcharts/amcharts5/plugins/exporting";
import CONST from '../lib/const.js';

export default {
  props: {
    id: Number,
    chartData: Array,
    isFetching: Boolean,
  },
  data: () => ({
    CONST: CONST,
    isGeneratingChart: false,

    root: null,
    chart: null,
    exporting: null,
    dateAxis: null,
  }),
  computed: {
    isLoading() {
      return this.isGeneratingChart || this.isFetching;
    }
  },

  watch: {
    async chartData() {
      this.drawChart2();
    },
    isLoading(v) {
      if (v) {
        this.showLoadingSpin();
        this.hideChart();
      } else {
        this.hideLoadingSpin();
        this.showChart();
      }
    }
  },
  mounted() {
    this.drawChart2();
  },
  methods: {
    generateChartImageBase64() {
      return this.exporting.export('png');
    },
    async drawChart2() {
      if (this.chart) {
        this.chart.dispose();
      }

      this.root = am5.Root.new(`${this.id}_chart`);

      this.exporting = am5exporting.Exporting.new(this.root, {
        menu: am5exporting.ExportingMenu.new(this.root, {})
      });
      console.log(this.exporting);

      this.chart = this.root.container.children.push(
        am5xy.XYChart.new(this.root, {
          focusable: true,
          panX: false,
          panY: false,
          wheelX: "panX",
          wheelY: "zoomX"
        })
      );

      this.dateAxis = this.chart.xAxes.push(
        am5xy.DateAxis.new(this.root, {
          tooltipDateFormat: "yyyy-MM-dd HH:mm",
          maxDeviation: 0.1,
          groupData: false,
          baseInterval: {
            timeUnit: "hour",
            count: 1
          },
          renderer: am5xy.AxisRendererX.new(this.root, {}),
          tooltip: am5.Tooltip.new(this.root, {})
        })
      );
      this.dateAxis.get("dateFormats")["month"] = "MM月";
      this.dateAxis.get("dateFormats")["week"] = "MM-DD";
      this.dateAxis.get("dateFormats")["day"] = "MM-DD HH:mm";
      this.dateAxis.get("dateFormats")["hour"] = "HH:mm";

      let cursor = this.chart.set("cursor", am5xy.XYCursor.new(this.root, {
        xAxis: this.dateAxis,
        behavior: "zoomX"
      }));
      cursor.lineY.set("visible", false);

      this.chart.set("scrollbarX", am5.Scrollbar.new(this.root, {
        orientation: "horizontal"
      }));

      this.createELOAxis();
      this.createRankAxis();

      let legend = this.chart.children.push(am5.Legend.new(this.root, {
        nameField: "name",
        fillField: "color",
        strokeField: "color",
        centerX: am5.percent(50),
        x: am5.percent(55),
        y: am5.percent(-5),
      }));

      legend.data.setAll([{
        name: "1v1ELO",
        color: am5.color("#ff0000")
      }, {
        name: "Rank",
        color: am5.color("#003af3")
      }]);

      this.chart.appear(500, 500);
    },
    createELOAxis() {
      let yRenderer = am5xy.AxisRendererY.new(this.root, {
        opposite: false
      });
      let yAxis = this.chart.yAxes.push(
        am5xy.ValueAxis.new(this.root, {
          maxDeviation: 1,
          renderer: yRenderer
        })
      );

      if (this.chart.yAxes.indexOf(yAxis) > 0) {
        yAxis.set("syncWithAxis", this.chart.yAxes.getIndex(0));
      }

      let tooltip = am5.Tooltip.new(this.root, {
        getFillFromSprite: false,
        pointerOrientation: "horizontal",
        labelText: "ELO: {elo}",
      });
      tooltip.get("background").setAll({
        fill: am5.color("#bd0000"),
        fillOpacity: 0.7
      });

      let series = this.chart.series.push(
        am5xy.LineSeries.new(this.root, {
          xAxis: this.dateAxis,
          yAxis: yAxis,
          valueYField: "elo",
          valueXField: "modifiedCreatedAt",
          tooltip: tooltip,
          stroke: am5.color("#ff0000"),
        })
      );

      series.strokes.template.setAll({strokeWidth: 1});
      series.set("fill", am5.color("#ff0000"));
      series.strokes.template.setAll({
        strokeWidth: 2,
      });

      yRenderer.grid.template.set("strokeOpacity", 0.05);
      yRenderer.labels.template.set("fill", series.get("fill"));
      yRenderer.setAll({
        stroke: series.get("fill"),
        strokeOpacity: 1,
        opacity: 1
      });

      series.data.processor = am5.DataProcessor.new(this.root, {
        dateFormat: "yyyy-MM-dd HH:mm:SS",
        dateFields: ["modifiedCreatedAt"]
      });

      series.data.setAll(this.chartData);
    },
    createRankAxis() {
      let yRenderer = am5xy.AxisRendererY.new(this.root, {
        opposite: true,
        inversed: true,
      });

      let yAxis = this.chart.yAxes.push(
        am5xy.ValueAxis.new(this.root, {
          maxDeviation: 1,
          renderer: yRenderer
        })
      );

      if (this.chart.yAxes.indexOf(yAxis) > 0) {
        yAxis.set("syncWithAxis", this.chart.yAxes.getIndex(0));
      }

      let tooltip = am5.Tooltip.new(this.root, {
        getFillFromSprite: false,
        pointerOrientation: "horizontal",
        labelText: "Rank: {rank}",
      });

      tooltip.get("background").setAll({
        fill: am5.color("#003af3"),
        fillOpacity: 0.7
      });

      let series = this.chart.series.push(
        am5xy.LineSeries.new(this.root, {
          xAxis: this.dateAxis,
          yAxis: yAxis,
          valueYField: "rank",
          valueXField: "modifiedCreatedAt",
          tooltip: tooltip,
          stroke: am5.color("#003af3"),
        })
      );

      series.strokes.template.setAll({strokeWidth: 1});
      series.set("fill", am5.color("#003af3"));
      series.strokes.template.setAll({
        strokeWidth: 2,
      });

      yRenderer.grid.template.set("strokeOpacity", 0.05);
      yRenderer.labels.template.set("fill", series.get("fill"));
      yRenderer.setAll({
        stroke: series.get("fill"),
        strokeOpacity: 1,
        opacity: 1
      });

      series.data.processor = am5.DataProcessor.new(this.root, {
        dateFormat: "yyyy-MM-dd HH:mm:SS",
        dateFields: ["modifiedCreatedAt"]
      });

      series.data.setAll(this.chartData);
    },

    hideChart() {
      let chartDiv = this.$refs.chartdiv;
      chartDiv.style.display = "none";
    },
    showChart() {
      let chartDiv = this.$refs.chartdiv;
      chartDiv.style.display = "block";
    },
    hideLoadingSpin() {
      let loadingSpinImg = this.$refs.loadingSpin;
      loadingSpinImg.style.display = "none";
    },
    showLoadingSpin() {
      let loadingSpinImg = this.$refs.loadingSpin;
      loadingSpinImg.style.display = "block";
    },
  },
  beforeDestroy() {
    if (this.chart) {
      this.chart.dispose();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.chart {
  height: 400px;
  padding-bottom: 2rem;
}

.parent-div {
  position: relative;
  min-height: 400px;
}

.loading-spin {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
}
</style>
