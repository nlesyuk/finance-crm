<template>
  <div class="app-main-layout">

    <Navbar @burgerClick="isOpen = !isOpen" />

    <Sidebar v-model="isOpen" />

    <main class="app-content" :class="{full: !isOpen}">
      <div class="app-page">

        <router-view/>

      </div>
    </main>

    <div class="fixed-action-btn">
      <a class="btn-floating btn-large blue" href="#">
        <i class="large material-icons">add</i>
      </a>
    </div>

  </div>
</template>
<script>
import Navbar from '@/components/app/Navbar';
import Sidebar from '@/components/app/Sidebar';

export default {
  name: 'main-layout',
  data: () => ({
    isOpen: false,
  }),
  components: {
    Navbar,
    Sidebar
  }
}
</script>
