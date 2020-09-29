<template>
    <footer class="footer">
        <button class="button button--link" @click="logout">
            Logout
        </button>
        <router-link to="/login" class="button button--link">
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
  }
}
</script>