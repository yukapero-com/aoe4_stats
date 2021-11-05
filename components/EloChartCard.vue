<template>
  <v-card
    class="mb-3"
  >
    <v-card-text :class="{ 'dense-card': !$device.isDesktop }">
      <v-row no-gutters>
        <v-col class="pb-3" cols="9" sm="11">
          <v-autocomplete
            v-model="select"
            :loading="loading"
            :items="items"
            :search-input.sync="search"
            cache-items
            class="mx-4"
            flat
            hide-no-data
            hide-details
            label="Type your AoEIV user name (need 10+ 1v1 matches history to display)"
            outlined
            dense
            return-object
            :item-text="dispName"
            :item-value="itemValue"
            prepend-inner-icon="mdi-account-search"
            append-icon=""
            @change="onChangedUser"
          ></v-autocomplete>
        </v-col>
        <v-col cols="3" sm="1">
          <v-btn
            :class="{
              'reload-button': true,
              'padding-btn': true,
            }"
            color="primary"
            @click.prevent="onChangedUser"
          >
            Reload
          </v-btn>
        </v-col>
      </v-row>
      <EloChart
        ref="elo-chart"
        class="chart"
        :id="chartId"
        :chart-data="chartData"
        :is-fetching="isFetchingChartData"
      />
      <v-row class="text-right">
        <v-col>
          <v-btn
            color="#00acee"
            class="ma-2 white--text"
            @click.prevent="onClickedShareTweetButton"
            :disabled="isUploadingChart"
            :loading="isUploadingChart"
          >
            <v-icon
              dark
            >
              mdi-twitter
            </v-icon>
            Share Chart
          </v-btn>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>

</template>

<script>
import _ from 'underscore';
import Moment from 'moment';
import EloChart from '@/components/EloChart';
import nuxtConfig from '@/nuxt.config'
const isDev = !!nuxtConfig?.dev

export default {
  props: {
    chartId: Number,
  },
  components: {
    EloChart
  },
  data: () => ({
    chartNum: 1,

    loading: false,
    items: [],
    search: null,
    select: null,
    chartData: [],
    isFetchingChartData: false,
    isUploadingChart: false,

    preventSearchTimeoutId: null,
    isPreventSearch: false,
  }),
  async created() {
    let topRanker = await this.$get('get_top_ranker_user_id', {});
    this.items = [topRanker];
    this.select = topRanker;
    this.onChangedUser();
  },
  watch: {
    search(val) {
      if (!val) return;
      if ((val || '').length < 3) return;
      if (val === this.select) return;
      if (this.isPreventSearch) return;
      this.querySelections(val)
    },
  },
  methods: {
    async onClickedShareTweetButton() {
      console.log("share button");
      if (this.isUploadingChart) return;
      this.isUploadingChart = true;

      try {
        let image = await this.$refs['elo-chart'].generateChartImageBase64();
        let chartDispId = await this.$post('upload_elo_chart_img', {
          imageBase64: image,
        });
        console.log(`chartDispId: ${chartDispId}`);

        let url = `https://www.aoe4stats.net/?chartDispId=${chartDispId}`;
        window.open(`https://twitter.com/intent/tweet?url=${url}&text=${''}`, '_blank')
      } catch (e) {
        console.error(e);
      } finally {
        this.isUploadingChart = false;
      }
    },
    async querySelections(v) {
      if (!v) return;

      this.loading = true;

      if (this.preventSearchTimeoutId) {
        clearTimeout(this.preventSearchTimeoutId);
      }
      this.isPreventSearch = true;
      this.preventSearchTimeoutId = setTimeout(() => {
        this.isPreventSearch = false;
      }, 1000);

      let res = await this.$get('user_candidates', {
        text: v
      });
      this.items = res;
      this.loading = false;
    },
    async onChangedUser() {
      if (!this.select) return;

      this.isFetchingChartData = true;
      let res = await this.$get('elo_log', {
        id: this.select.id
      });
      let cdata = (() => {
        let data = _.sortBy(res, d => d.createdAt);
        _.each(data, d => {
          d.modifiedCreatedAt = new Moment(d.createdAt).format('YYYY-MM-DD HH:mm:ss');
        });
        return data;
      })();

      this.chartData = cdata;
      this.isFetchingChartData = false;
    },
    dispName(v) {
      if (!v) return '';
      return `${v.name} (${v.id})`;
    },
    itemValue(v) {
      if (!v) return '';
      return v.id;
    }
  },
}
</script>

<style scoped>
.chart {
  width: 100%;
}

.reload-button {
  width: 100%
}

.dense-card {
  padding-left: 0px;
  padding-right: 0px;
}

.padding-btn {
  width: 80%;
  margin-right: 1rem !important;
  background-color: red !important;
}
</style>
