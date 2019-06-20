<template>
  <nav class="navbar is-fixed-top has-background-grey-lighter">
    <div class="navbar-brand">
      <div class="navbar-item is-size-4">
        <nuxt-link to="/">Qiita Reader</nuxt-link>
      </div>
    </div>
    <div class="navbar-memu">
      <div class="navbar-start">
        <div class="navbar-item">
          <form
            class="control has-addons"
            @submit.prevent="sendRequest(searchForm.keyword)"
          >
            <input
              v-model="searchForm.keyword"
              placeholder="search by keyword"
              class="input is-primary"
              style="max-width: 300pt;"
              type="text"
            />
          </form>
          <div class="navbar-item">
            <a
              class="button is-primary"
              v-bind:class="{ 'is-loading': isLoading }"
              type="submit"
              @click="sendRequest(searchForm.keyword)"
              >send
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
<script lang="babel">
import {mapState} from 'vuex'
export default {
  components: {},
  data () {
    return {
      // 検索フォーム
      searchForm: {
        keyword: ''
      },
      // バリデーションルール
      rules: {
        keyword: [
          // 未入力はエラー
          { required: true, message: 'Please input the keyword', trigger: 'blur' },
          // 空白のみの入力はエラー
          { whitespace: true, message: 'Please input the keyword', trigger: 'blur' }
        ]
      }
    }
  },
  computed: mapState(['isLoading']),
  methods: {
    // search ボタン押下で呼ばれるメソッド。バリデーション含む
    search: function(form) {
      this.sendRequest(form.keyword)
      // this.$refs[form].validate((valid) => {
      //   if (!valid) {
      //     return false
      //   }
      //   this.sendRequest(form.keyword)
      // })
    },
    // store の action に用意した 'getItems' を呼ぶ
    sendRequest: function(key) {
      this.$store.dispatch('getItems', { keyword: key })
    }
  }
}
</script>
<style lang="scss" scoped></style>
