<template>
  <div>
    <header>
      <!-- navbar.vueを表示 -->
      <Navbar />
    </header>
    <main>
      <div class="container">
        <Message />
        <RouterView />
      </div>
    </main>
    <!-- footer.vueを表示 -->
    <Footer />
  </div>
</template>

<script>
import Message from './components/Message.vue' 
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import { INTERNAL_SERVER_ERROR } from './util'

export default {
  components:{
    Navbar,
    Footer,
    Message
  },
  computed: {
    errorCode () {
      return this.$store.state.error.code
    }
  },
  // ストアのステートを算出プロパティで参照した上で watch で監視するというパターン
  watch: {
    errorCode: {
      handler (val) {
        if (val === INTERNAL_SERVER_ERROR) {
          this.$router.push('/500')
        }
      },
      immediate: true
    },
    $route () {
      this.$store.commit('error/setCode', null)
    }
  }

}
</script>