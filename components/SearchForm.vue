<template>
  <div
    ref="searchForm"
    class="field"
    :model="searchForm"
    :rules="rules"
    @submit.native.prevent
  >
    <div class="control">
      <input
        v-model="searchForm.keyword"
        placeholder="search by keyword"
        class="input is-primary"
        style="max-width: 100pt;"
        type="text"
        @keyup.enter.native="sendRequest(searchForm.keyword)"
      />
      <button
        class="button is-primary"
        @click="sendRequest(searchForm.keyword)"
      >
        search
      </button>
    </div>
  </div>
</template>

<script lang="babel">
export default {
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
