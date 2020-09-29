// ログイン済みユーザーを保持する
const state = {
  user: null
}

const getters = {}

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
