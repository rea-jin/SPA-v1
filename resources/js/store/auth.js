// import { OK } from '../util'
import { OK, UNPROCESSABLE_ENTITY } from '../util'

// ログイン済みユーザーを保持する
const state = {
  user: null,
  apiStatus: null, // これを参照して後の処理を行うか判別
  loginErrorMessages: null // エラーメッセージを入れるステート
}

const getters = {
  // 確実に真偽値を返すために二重否定
  check: state => !! state.user,
  // username はログインユーザーの name
  // user が null の場合にエラーが発生しないよう空文字を返す
  username: state => state.user ? state.user.name : ''
}

const mutations = {
  // user ステートの値を更新する setUser を追加  ミューテーションの第一引数は必ずステート
  setUser (state, user) {
    state.user = user
  },
  // ステートを更新するため追加
  setApiStatus(state, status){
    state.apiStatus = status
  },
  // ステートのためのミューテーション
  setLoginErrorMessages (state, messages) {
    state.loginErrorMessages = messages
  }
}

const actions = {
  // アクションの第一引数にはコンテキストオブジェクトが渡される
  //  登録  =====================================
  async register (context, data) {
    const response = await axios.post('/api/register', data)
    context.commit('setUser', response.data)
  },
  // ログイン  ===================================
  async login (context, data) {
    context.commit('setApiStatus', null)
    // const result = await someAsyncTask().catch(error => error.something)
    // async/await を用いて非同期処理を書くと、以下のパターンで非同期処理が成功した場合も失敗した場合も同じ変数に結果を代入できる
    // someAsyncTask が失敗すると result には error.something が代入される
    const response = await axios.post('/api/login', data)
      .catch(err => err.response || err)
    // エラーのない場合
    if(response.status === OK){
      context.commit('setApiStatus', true)
      context.commit('setUser', response.data)
      return false
    }
    
    context.commit('setApiStatus', false)
    if(response.status === UNPROCESSABLE_ENTITY){
      // バリデーションエラーの場合
      context.commit('setLoginErrorMessages', response.data.errors)
    }else{
      // 通信に失敗した場合、errorモジュールのsetCodeミューテーションをcommitする
      context.commit('error/setCode', response.status, {root: true})
    }
   
  },

  // ログアウト
  async logout (context) {
    const response = await axios.post('/api/logout')
    context.commit('setUser', null)
  },
  // 起動時のログインチェック
  async currentUser (context) {
    const response = await axios.get('/api/user')
    const user = response.data || null
    context.commit('setUser', user)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
