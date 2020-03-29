<template>
  <div id="app">
    <!-- generic component -->
    <component :is="layout">
      <router-view/>
    </component>
  </div>
</template>
<script>
import EmptyLayout from '@/layouts/EmptyLayout.vue';
import MainLayout from '@/layouts/MainLayout.vue';

export default {
  computed: {
    layout() {
      return (this.$route.meta.layout || 'empty') + '-layout'
      // return 'empty-layout'
    }
  },
  components: {
    EmptyLayout, // 'empty-layout'
    MainLayout   // 'main-layout'
  }
}
</script>
<style lang="sass">
@import '~materialize-css/dist/css/materialize.min.css'
@import 'assets/index.css'
</style>
