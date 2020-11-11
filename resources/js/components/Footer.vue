<template>
    <footer class="footer">
        <button class="button button--link" v-if="isLogin" @click="logout">
            Logout
        </button>
        <router-link to="/login" v-else class="button button--link">
            Login / Register
        </router-link>
    </footer>
</template>

<script>
// map関数をインポート
import { mapState, mapGetters } from 'vuex'
// ログアウトのエラーチェックをフッターに入れる
export default {
  methods: {
    async logout () {
      await this.$store.dispatch('auth/logout')
      if(this.apiStatus){
        // apiStatusがあればログインルートへ
        this.$router.push('/login')
      }
    }
  },
  computed: {
    //   ログインチェック
    // isLogin () {
        // return this.$store.getters['auth/check']
    ...mapState({
      apiStatus: state => state.auth.apiStatus
    }),
    ...mapGetters({
      isLogin: 'auth/check'
    })
  },
}
</script>