<template>
<div>
  <Loader v-if="loading" />
  <div
    v-else
    class="app-main-layout"
  >

    <Navbar @burgerClick="isOpen = !isOpen" />

    <Sidebar v-model="isOpen" :key="locale"/>

    <main class="app-content" :class="{full: !isOpen}">
      <div class="app-page">
        <router-view/>
      </div>
    </main>

    <div class="fixed-action-btn">
      <router-link
        class="btn-floating btn-large blue"
        to="/record"
        v-tooltip="{text: 'Add record', position: 'left'}"
      >
        <i class="large material-icons">add</i>
      </router-link>
    </div>

  </div>
</div>
</template>
<script>
import Navbar from '@/components/app/Navbar';
import Sidebar from '@/components/app/Sidebar';
import messages from '@/utils/messages'

export default {
  name: 'main-layout',
  data: () => ({
    isOpen: true,
    loading: true,
  }),
  components: {
    Navbar,
    Sidebar
  },
  async mounted() {
     if ( !Object.keys(this.$store.getters.info).length ) {
       await this.$store.dispatch('fetchInfo')
     }
     this.loading = false
  },
  computed: {
    error() {
      return this.$store.getters.error
    },
    locale() {
      return this.$store.getters.info.locale
    }
  },
  watch: {
    error(fbError) {
      this.$error(messages[fbError.code] || 'Что то пошло не так')
    }
  }
}
</script>
