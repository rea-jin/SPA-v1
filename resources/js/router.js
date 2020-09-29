import Vue from 'vue'
import VueRouter from 'vue-router'

// ページコンポーネントをインポートする
import List from './pages/List.vue'
import Login from './pages/Login.vue'

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
    component: Login
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