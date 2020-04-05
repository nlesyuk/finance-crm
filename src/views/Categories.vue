<template>
  <div>

    <div class="page-title">
      <h3>Категории</h3>
    </div>

    <Loader v-if="loading" />

    <section v-else>
      <div class="row">

        <CategoryCreate @created="addNewCategory" />

        <CategoryEdit />

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
  }),
  methods: {
    addNewCategory(category) {
      this.categories.push(category)
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
