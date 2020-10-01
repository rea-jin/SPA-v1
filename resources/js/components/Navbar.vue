<template>
    <nav class="navbar">
        <router-link class ="navbar__brand" to="/">
        VueApi
        </router-link>
        <div class="navbar__menu">
            <div v-if="isLogin" class="navbar__item">
                <button class="button">
                    <i class="icon ion-md-add"></i>
                    Subimit a Item
                </button>
            </div>
            <span v-if="isLogin" class="navbar__item">
            <!-- ログインしているときusername表示 -->
                {{ username }}
            </span>
            <div v-else class="navbar__item">
                <router-link to="login" class="button button--link">
                Login / Register
                </router-link>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
  computed: {
    isLogin () {
      return this.$store.getters['auth/check']
    },
    username () {
      return this.$store.getters['auth/username']
    }
  }
}
</script>