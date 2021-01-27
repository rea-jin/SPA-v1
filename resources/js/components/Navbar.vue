<template>
    <nav class="navbar">
        <router-link class ="navbar__brand" to="/">
        VueApi
        </router-link>
        <div class="navbar__menu">

            <!-- ログインしていたら、投稿ボタンを表示 -->
            <div v-if="isLogin" class="navbar__item">
              <!-- クリックでフォームを表示 -->
              <button class="button" @click="showForm = ! showForm">
                <i class="icon ion-md-add"></i>
                商品を投稿する
              </button>
            </div>

            <!-- ログインしているときusername表示 -->
            <span v-if="isLogin" class="navbar__item">
                {{ username }}
            </span>
            
            <div v-else class="navbar__item">
                <router-link class="button button--link" to="/login">
                ログイン / 登録
                </router-link>
            </div>
        </div>
        <ItemForm v-model="showForm" />
    </nav>
</template>

<script>
import ItemForm from './ItemForm.vue'

export default {
  components:{
    ItemForm
  },
    data () {
    return {
      showForm: false
    }
  },
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