// ログイン済みユーザーを保持する
const state = {
  user: null
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
    const response = await axios.post('/api/login', data)
    context.commit('setUser', response.data)
  },
  // 
  async logout (context) {
    const response = await axios.post('/api/logout')
    context.commit('setUser', null)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
