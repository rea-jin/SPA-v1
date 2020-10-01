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
export default {
  methods: {
    async logout () {
      await this.$store.dispatch('auth/logout')

      this.$router.push('/login')
    }
  },
  computed: {
    //   ログインチェック
    isLogin () {
        return this.$store.getters['auth/check']
    }
  },
}
</script>