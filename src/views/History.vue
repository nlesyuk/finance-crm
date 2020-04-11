<template>
  <div>
    <div class="page-title">
      <h3>История записей</h3>
    </div>

    <div class="history-chart">
      <canvas></canvas>
    </div>

    <Loader v-if="loading" />

    <p class="center" v-else-if="!records.length">
      Записей пока нет.
      <router-link to="record">Добавить новую запись</router-link>
    </p>

    <section v-else>

      <HistoryTable :records="items"/>

      <Paginate
        v-model="page"
        :pageCount="pageCount"
        :clickHandler="pageChangeHandler"
        :prevText="'Назад'"
        :nextText="'Вперед'"
        :containerClass="'pagination'"
        :pageClass="'waves-effect'"
      />

    </section>
  </div>
</template>

<script>
import paginationsMixin from '@/mixins/paginations.mixin'
import HistoryTable from '@/components/HistoryTable'

export default {
  name: 'history',
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
  async mounted() {
    this.records = await this.$store.dispatch('fetchRecords')
    const categories = await this.$store.dispatch('fetchCategories')

    const records = this.records.map(record => {
      return {
        ...record,
        categoryName: categories.find(cat => cat.id === record.categoryId).title,
        typeClass: record.type === 'income' ? 'green' : 'red',
        typeText: record.type === 'income' ? 'Доход' : 'Расход',
      }
    })

    this.setupPagination(records) // from mixin
    this.loading = false
  }
}
</script>
