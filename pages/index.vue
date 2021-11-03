<template>
  <v-row justify="center" align="center">
    <v-col cols="12">
      <v-card>
        <v-card-text>
          <v-row no-gutters>
            <v-col>
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
                label="AoE4のユーザー名で検索(3文字以上)"
                outlined
                dense
                return-object
                :item-text="dispName"
                :item-value="itemValue"
                prepend-inner-icon="mdi-account-search"
                @change="onChangedUser"
              ></v-autocomplete>

            </v-col>
            <v-col cols="1">
              <v-btn
                class="reload-button"
                color="primary"
                @click.prevent="onChangedUser"
              >
                リロード
              </v-btn>
            </v-col>
          </v-row>
          <EloChart
            ref="chart"
            class="chart"
            :chart-data="chartData"
            :is-fetching="isFetchingChartData"
          />
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import _ from 'underscore';
import Moment from 'moment';
import EloChart from '@/components/EloChart';

export default {
  components: {
    EloChart
  },
  data: () => ({
    loading: false,
    items: [],
    search: null,
    select: null,
    chartData: [],
    isFetchingChartData: false,

    preventSearchTimeoutId: null,
    isPreventSearch: false,
  }),
  async created() {
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
</style>
