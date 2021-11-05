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
            Add Chart
          </v-btn>
        </v-col>
      </v-row>

      <v-row class="mt-16 text-right" dense>
        <v-col cols="12">
          Developed by
          <a
            class="disable-link-style"
            href="https://twitter.com/yukapero_com"
            target="_blank"
          >
            <v-icon
              right
              style="color: #6262ff"
            >
              mdi-twitter
            </v-icon>
            @yukapero_com
          </a>
        </v-col>
        <v-col cols="12">
          <div>Icons made by <a href="https://www.flaticon.com/authors/gregor-cresnar" title="Gregor Cresnar">Gregor
            Cresnar</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
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
  head() {
    let {chartDispId} = this.$route.query;
    let imageUrl = chartDispId ?
      `https://www.aoe4stats.net/api/elo_chart_snapshot/${chartDispId}.png` :
      'https://www.aoe4stats.net/aoe4_stats_logo.png';
    return {
      meta: [
        {hid: 'og:title', property: 'og:title', content: 'AoEIV Stats'},
        {hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image'},
        {hid: 'twitter:site', name: 'twitter:site', content: '@yukapero_com'},
        {hid: 'twitter:image', name: 'twitter:image', content: imageUrl},
        {hid: 'og:type', property: 'og:type', content: 'website'},
        {
          hid: 'og:description',
          property: 'og:description',
          content: 'ELO log for AoEIV'
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: 'https://www.aoe4stats.net/'
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: imageUrl
        },
        {hid: 'og:site_name', name: 'og:site_name', content: 'AoEIV Stats'}
      ]
    };
  },
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

.disable-link-style {
  /*color: inherit !important;*/
  text-decoration: none !important;
}
</style>
