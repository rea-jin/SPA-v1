import Vue from 'vue'
import VueRouter from 'vue-router'

// ページコンポーネントをインポートする
import List from './pages/List.vue'
import Login from './pages/Login.vue'
// authストアのcheckゲッターを使用するため
import store from './store' 
// エラーコンポーネントのインポート
import SystemError from './pages/errors/System.vue'
// 詳細ぺーじのコンポーネントをインポート
import ItemDetail from './pages/ItemDetail.vue'

// VueRouterプラグインを使用する
// これによって<RouterView />コンポーネントなどを使うことができる
Vue.use(VueRouter)

// パスとコンポーネントのマッピング
const routes = [
  { // topルートはListコンポーネント
    path: '/',
    component: List
  },
  { // ログインルートの時はログインコンポーネント
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
  },
  { //500エラーの時はエラーコンポーネント
    path: '/500',
    component: SystemError
  },
  {
    path: '/items/:id',// idは受け取ったパラメータ
    component: ItemDetail,
    props: true
  },
]

// VueRouterインスタンスを作成する
const router = new VueRouter({
    mode: 'history', // ★ urlの#をなくす
  routes
})


// VueRouterインスタンスをエクスポートする
// app.jsでインポートするため
export default router