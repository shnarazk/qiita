import axios from 'axios'

const BASE_URL = 'https://qiita.com/api/v2/'

export default {
  async getItems({ commit }, payload) {
    // 'isLoading' を 'true' に設定
    commit('showLoading')
    // リクエスト送信
    const response = await axios
      .get(`${BASE_URL}items`, {
        headers: { 'Content-Type': 'application/json' },
        params: {
          page: 1,
          per_page: 20,
          query: payload.keyword
        },
        timeout: 15000
      })
      .catch(error => {
        commit('hideLoading')
        this.$router.push('/error')
        throw new Error(error)
      })
    // 'lists' にレスポンスを設定
    commit('setItems', response.data)
    // 'isLoading' を 'false' に設定
    commit('hideLoading')
  }
}
