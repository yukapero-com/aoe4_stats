<template>
  <v-row justify="center" align="center">
    <v-col md="10" sm="12">
      <div
        v-for="chartId in chartNum"
        :key="chartId"
        class="mb-3"
      >
        <EloChartCard
          class="elo-chart-card"
          :chart-id="chartId"
        />
      </div>

      <v-row>
        <v-col class="text-center">
          <v-btn
            color="success"
            @click.prevent="onClickedAddChart"
          >
            <v-icon
              left
            >
              mdi-plus
            </v-icon>
            チャート追加
          </v-btn>
        </v-col>
      </v-row>

    </v-col>
  </v-row>
</template>

<script>
import EloChartCard from "@/components/EloChartCard";

export default {
  components: {
    EloChartCard
  },
  data: () => ({
    chartNum: 1,
  }),
  methods: {
    onClickedAddChart() {
      this.chartNum++;
    },
  }
}
</script>

<style scoped>
.elo-chart-card {
  max-width: 800px;
  margin: auto !important;
}
</style>
