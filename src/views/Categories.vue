<template>
  <div>

    <div class="page-title">
      <h3>{{'Categories'| localizeFilter }}</h3>
    </div>

    <Loader v-if="loading" />

    <section v-else>
      <div class="row">

        <CategoryCreate @created="addNewCategory" />

        <CategoryEdit
          v-if="categories.length"
          :categories="categories"
          :key="categories.length + updateCount"
          @updated="updateCategories"
        />
        <!-- :key сообщаем вью когда нужно перерендерить компонент:
          - когда categories увеличится
          - когда categories обновится
        -->
        <div v-else class="page-subtitle">
          <h4>{{'DontHaveCategories'| localizeFilter}}</h4>
        </div>
      </div>
    </section>

  </div>
</template>

<script>
import CategoryCreate from '@/components/CategoryCreate'
import CategoryEdit from '@/components/CategoryEdit'

export default {
  name: 'categories',
  data: () => ({
    categories: [],
    loading: true,
    updateCount: 0
  }),
  methods: {
    addNewCategory(category) {
      this.categories.push(category)
    },
    updateCategories(category) {
      const idx = this.categories.findIndex(c => c.id === category.id)
      this.categories[idx].title = category.title
      this.categories[idx].limit = category.limit
      this.updateCount++ // для перерендеринга компонента CategoryEdit
    }
  },
  components: {
    CategoryCreate,
    CategoryEdit
  },
  async mounted() {
    // get categories from server
    this.categories = await this.$store.dispatch('fetchCategories')
    this.loading = false
  }
}
</script>
