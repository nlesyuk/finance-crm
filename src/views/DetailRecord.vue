<template>
  <div>
    <Loader v-if="loading" />

    <div v-else-if="record">
      <div class="breadcrumb-wrap">
        <router-link to="/history" class="breadcrumb">{{'History'|localizeFilter}}</router-link>
        <a class="breadcrumb" @click.prevent>
          {{ type }}
        </a>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <div
            class="card"
            :class="[record.type === 'income' ? 'green' : 'red']"
          >
            <div class="card-content white-text">
              <p>{{'Description'|localizeFilter}}: {{ record.description }}</p>
              <p>{{'Sum'| localizeFilter}}: {{ record.amount | currencyFilter() }}</p>
              <p>{{'Category'|localizeFilter}}: {{ record.categoryName }}</p>

              <small>{{ record.date | dateFilter('datetime') }}</small>
            </div>
          </div>
        </div>
      </div>
    </div>

    <p class="center" v-else>
      {{'RecordWithID'|localizeFilter}}
      <strong>{{$route.params.id}}</strong>
      {{'NotFound'|localizeFilter}}
    </p>

  </div>
</template>

<script>
import localizeFilter from '@/filters/localize.filter'

export default {
  name: 'details-record',
  metaInfo() {
    return {
      title: this.$title('DetailTitle')
    }
  },
  data: () => ({
    loading: true,
    record: null,
  }),
  computed: {
    type() {
      return this.record.type === 'income' ? localizeFilter('Income') : localizeFilter('Outcome')
    }
  },
  async mounted() {
    const id = this.$route.params.id
    const record   = await this.$store.dispatch('fetchRecordById', id)

    if (record.categoryId) {
      const category = await this.$store.dispatch('fetchCategoryById', record.categoryId)

      this.record = {
        ...record,
        categoryName: category.title,
      }
    }

    this.loading = false
  }
}
</script>
