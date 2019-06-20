<template>
  <div>
    <div>
      <div v-loading.fullscreen.lock="isLoading">
        <!-- 検索フォーム -->
        <SearchForm />
        <!-- 検索結果一覧 -->
        <SearchResult />
      </div>
    </div>
  </div>
</template>

<script lang="babel">
import {mapState} from 'vuex'
import SearchResult from '~/components/SearchResult.vue'

export default {
  layout: 'NavBar',
  components: {
    // 検索結果一覧を表示するコンポーネント
    SearchResult
  },
  // store の state からデータを取得
  computed: mapState(['isLoading']),
  // store の action に用意した 'getItems' を呼ぶ
  fetch ({ store }) {
    store.dispatch('getItems', {
      keyword: 'nuxt.js'
    })
  }
}
</script>

<style>
.el-main {
  background-color: #fff;
}
</style>
