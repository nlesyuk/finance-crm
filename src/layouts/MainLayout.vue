<template>
  <div class="app-main-layout">

    <Navbar />

    <Sidebar />

    <main class="app-content">
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
  components: {
    Navbar,
    Sidebar
  }
}
</script>
