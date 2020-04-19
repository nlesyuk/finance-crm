<template>
  <div>
    <div class="page-title">
      <h3>{{'Menu_Planning'| localizeFilter }}</h3>
      <h4>{{ info.bill | currencyFilter()}}</h4>
    </div>

    <Loader v-if="loading" />

    <p class="center" v-else-if="!categories.length">
      {{'DontHaveCategories'|localizeFilter}}
      <router-link to="categories">{{'AddCategory'|localizeFilter}}</router-link>
    </p>

    <section v-else>
      <div v-for="cat of categories" :key="cat.id">
        <p>
          <strong>{{ cat.title }}</strong>
          {{ cat.spend | currencyFilter() }} {{'From'|localizeFilter}} {{ cat.limit | currencyFilter() }}
        </p>
        <div class="progress" v-tooltip="cat.tooltip">
          <div
              class="determinate"
              :class="[cat.progreeColor]"
              :style="{width: cat.progreePercent + '%'}"
          ></div>
        </div>
      </div>
    </section>

  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import currencyFilter from '@/filters/currency.filter'
import localizeFilter from '@/filters/localize.filter'

export default {
  name: 'planing',
  data: () => ({
    loading: true,
    categories: [],
  }),
  computed: {
    ...mapGetters(['info'])
  },
  async mounted() {
    const records = await this.$store.dispatch('fetchRecords')
    const categories = await this.$store.dispatch('fetchCategories')

    this.categories = categories.map(cat => {
      const spend = records
        .filter(c => c.categoryId === cat.id)
        .filter(c => c.type === 'outcome')
        .reduce((total, record) => {
          return total + +record.amount
        }, 0)

      const percent = 100 * spend / cat.limit
      const progreePercent = percent > 100 ? 100 : percent

      const progreeColor = percent < 60
        ? 'green'
        : percent < 100
          ? 'yellow'
          : 'red'

      const tooltipValue = cat.limit - spend
      // const tooltip = `${tooltipValue > 100 ? 'Превышен на': 'Осталось'} ${currencyFilter(Math.abs(tooltipValue))}`
      const tooltip = `${tooltipValue > 100 ? localizeFilter('ExceededOn'): localizeFilter('Left')} ${currencyFilter(Math.abs(tooltipValue))}`

      return {
        ...cat,
        progreePercent,
        progreeColor,
        spend,
        tooltip
      }
    })
    this.loading = false
  },
}
</script>
