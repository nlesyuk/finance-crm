<template>
  <div>
    <div class="page-title">
      <h3>{{ 'HistoryRecords' | localizeFilter }}</h3>
    </div>

    <div class="history-chart">
      <canvas ref="canvas"></canvas>
    </div>

    <Loader v-if="loading" />

    <p class="center" v-else-if="!records.length">
      {{'DontHaveRecords'|localizeFilter}}
      <router-link to="record">{{'AddRecords'|localizeFilter}}</router-link>
    </p>

    <section v-else>

      <HistoryTable :records="items"/>

      <Paginate
        v-model="page"
        :pageCount="pageCount"
        :clickHandler="pageChangeHandler"
        :prevText="Next"
        :nextText="Back"
        :containerClass="'pagination'"
        :pageClass="'waves-effect'"
      />

    </section>
  </div>
</template>

<script>
import localizeFilter from '@/filters/localize.filter'
import paginationsMixin from '@/mixins/paginations.mixin'
import HistoryTable from '@/components/HistoryTable'
import {Pie} from 'vue-chartjs'

export default {
  name: 'history',
  extends: Pie,
  data: () => ({
    loading: true,
    records: [],
    // from mixin:
    // page: 1, // page by default
    // pageSize: 5, // item per page
    // pageCount: 0, // we don't know
    // allItems: [], // all items
    // items: [], // allItems / PageSize
  }),
  mixins: [paginationsMixin],
  components: {
    HistoryTable
  },
  computed: {
    Next() { return localizeFilter('Next') },
    Back() { return localizeFilter('Back') },
  },
  methods: {
    setup(categories) {
      const records = this.records.map(record => {
        // debugger
        return {
          ...record,
          categoryName: categories.find(cat => cat.id === record.categoryId).title,
          typeClass: record.type === 'income' ? 'green' : 'red',
          typeText: record.type === 'income' ? localizeFilter('Income') : localizeFilter('Outcome'),
        }
      })
      this.setupPagination(records) // from mixin

      // setup chart
      // cant myself init chart, but chart init by itself, must be <canvas ref="canvas"></canvas>
      this.renderChart({
          labels: categories.map(c => c.title),
          datasets: [{
              label: 'Расходы по категориям',
              data: categories.map(c => {
                return this.records.reduce((total, r) => {
                  if (r.categoryId === c.id && r.type === 'outcome') {
                    total += r.amount
                  }
                  return total
                }, 0)
              }),
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
              borderWidth: 1
          }]
      })

    }
  },
  async mounted() {
    this.records = await this.$store.dispatch('fetchRecords')
    const categories = await this.$store.dispatch('fetchCategories')

    this.setup(categories)

    this.loading = false
  }
}
</script>
