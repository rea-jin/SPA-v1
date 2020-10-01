import Vue from 'vue'
import VueRouter from 'vue-router'

// ページコンポーネントをインポートする
import List from './pages/List.vue'
import Login from './pages/Login.vue'

// authストアのcheckゲッターを使用するため
import store from './store' 

// VueRouterプラグインを使用する
// これによって<RouterView />コンポーネントなどを使うことができる
Vue.use(VueRouter)

// パスとコンポーネントのマッピング
const routes = [
  {
    path: '/',
    component: List
  },
  {
    path: '/login',
    component: Login,
    // (ルートオブジェクト、アクセス元、ページ移動先)
    beforeEnter (to, from, next) {
      if (store.getters['auth/check']) {
        next('/') // 引数のページに切り替わる、ページコンポーネントは作成されない
      } else {
        next() // ページコンポーネントが切り替わる
      }
    }
  }
]

// VueRouterインスタンスを作成する
const router = new VueRouter({
    mode: 'history', // ★ urlの#をなくす
  routes
})

// VueRouterインスタンスをエクスポートする
// app.jsでインポートするため
export default router