<template>
  <div>
    <header>
      <!-- navbar.vueを表示 -->
      <Navbar />
    </header>
    <main>
      <div class="container">
        <RouterView />
      </div>
    </main>
    <!-- footer.vueを表示 -->
    <Footer />
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'

export default {
  components:{
    Navbar,
    Footer
  }
}
</script>