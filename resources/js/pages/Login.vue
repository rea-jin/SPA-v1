<template>
  <div class="container--small">
    <ul class="tab">
      <li class="tab__item" 
      @click="tab = 1" :class="{'tab__item--active': tab === 1 }">
        Login
      </li>
      <li class="tab__item" @click="tab = 2">
        Register
      </li>
    </ul>
    <!-- tab1 or 2を表示させる -->
    <!-- {{ tab }} これだとここに数字が来る -->
    <!-- v-showでtabの値によって表示を変える -->
    <div class="panel" v-show="tab === 1">
      <!-- Login Form -->
      <form class="form" @submit.prevent="login">
        <!-- エラーメッセージ表示 -->
        <div v-if="loginErrors" class="errors">
          <ul v-if="loginErrors.email">
            <li v-for="msg in loginErrors.email" :key="msg">{{ msg }}</li>
          </ul>
          <ul v-if="loginErrors.password">
            <li v-for="msg in loginErrors.password" :key="msg">{{ msg }}</li>
          </ul>
        </div>

        <label for="login-email">Email</label>
        <!-- v-modelでdataに紐付ける -->
        <input type="text" class="form__item" id="login-email" v-model="loginForm.email">
        <label for="login-password">Password</label>
        <input type="password" class="form__item" id="login-password" v-model="loginForm.password">
        <div class="form__button">
          <button type="submit" class="button button--inverse">login</button>
        </div>
      </form>
    </div>
    <div class="panel" v-show="tab === 2">
      <!-- Register Form -->
      <form class="form" @submit.prevent="register">
        <label for="username">Name</label>
        <input type="text" class="form__item" id="username" v-model="registerForm.name">
        <label for="email">Email</label>
        <input type="text" class="form__item" id="email" v-model="registerForm.email">
        <label for="password">Password</label>
        <input type="password" class="form__item" id="password" v-model="registerForm.password">
        <label for="password-confirmation">Password (confirm)</label>
        <input type="password" class="form__item" id="password-confirmation" v-model="registerForm.password_confirmation">
        <div class="form__button">
          <button type="submit" class="button button--inverse">register</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      // tabにデータを渡す。
      tab: 1,
      loginForm: {
        email: '',
        password: ''
      },
      registerForm: {
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
      }
    }
  },
  methods: {
    async register () {
    // authストアのresigterアクションを呼び出すdispatch(action, actionの引数:フォームの入力値)
    // awaitは非同期通信
    await this.$store.dispatch('auth/register', this.registerForm)
    // トップページに移動する 
    this.$router.push('/')
    },

    async login () {
    // authストアのloginアクションを呼び出す
    await this.$store.dispatch('auth/login', this.loginForm)

      if(this.apiStatus){
        // トップページに移動する
        this.$router.push('/')
        // console.log(this.loginForm)
      }
    },
    clearError () {
    this.$store.commit('auth/setLoginErrorMessages', null)
    },
    created () {
    this.clearError()
    }
  },
  computed: {
  apiStatus () {
    return this.$store.state.auth.apiStatus
  },
  loginErrors () {
    return this.$store.state.auth.loginErrorMessages
  }
},

}
</script>