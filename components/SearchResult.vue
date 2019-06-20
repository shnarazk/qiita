<template>
  <div>
    <!-- 検索結果が0件だった場合 -->
    <template v-if="lists.length === 0 && !isLoading">
      <i class="el-icon-warning">&nbsp;No results found for your keyword.</i>
    </template>
    <!-- 検索結果一覧 -->
    <template v-else>
      <div class="columns is-desktop is-multiline">
        <div
          class="column is-one-third"
          v-for="(element, index) in lists"
          :key="index"
        >
          <div class="card has-background-white-ter">
            <div class="card-header has-background-dark">
              <p class="card-header-title">
                <!-- タイトル -->
                <a :href="element.url" target="_blank">{{
                  element.title | asDescription
                }}</a>
              </p>
            </div>
            <div class="card-content">
              <!-- 本文 -->
              <span class="content">{{ element.body | asDescription }}</span>
              <!-- タグ -->
              &nbsp;
              <span
                class="is-small has-text-info"
                v-for="(tag, index) in element.tags"
                :key="index"
                >#{{ tag.name }},
              </span>
            </div>
            <footer class="card-footer">
              <div class="card-footer-item">
                <!-- 作成日 -->
                <div class="is-size-7">{{ element.created_at | asDate }}</div>
              </div>
              <div class="card-footer-item is-size-7">
                <span>
                  <img
                    :src="element.user.profile_image_url"
                    width="15"
                    height="15"
                  />
                  <!-- 自己紹介があればPopoverで表示 -->
                  <template v-if="element.user.description">
                    <el-popover
                      slot="description"
                      placement="top-start"
                      width="300"
                      trigger="hover"
                      :content="element.user.description"
                    >
                      <!-- ユーザー名 -->
                      <span slot="reference">&nbsp;{{ element.user.id }}</span>
                    </el-popover>
                  </template>
                  <template v-else>
                    <!-- ユーザー名 -->
                    <span>&nbsp;{{ element.user.id }}</span>
                  </template>
                </span>
                <span>
                  &nbsp;( <i> {{ element.likes_count }} </i> )
                </span>
              </div>
            </footer>
          </div>
        </div>
        <!-- ページトップへスクロール用のボタン -->
        <div v-if="250 < scrollY" class="page-component-up">
          <transition name="fade">
            <span class="icon" @click="scrollTop"> </span>
          </transition>
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="babel">
import {mapState} from 'vuex'

export default {
  data () {
    return {
      scrollY: 0
    }
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll)
  },
  // store の state からデータを取得
  computed: mapState(['lists', 'isLoading']),
  methods: {
    // 現在の上部からのスクロール量取得
    handleScroll: function () {
      this.scrollY = window.scrollY
    },
    // トップへスクロール
    scrollTop: function () {
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
    }
  }
}
</script>

<style>
.content-style {
  line-height: 30px;
  font-size: 14px;
}

.tab-style {
  margin-right: 5px;
}

.box-card {
  height: 360px;
  font-size: 15px;
}

.col-style {
  padding: 10px;
}

.page-component-up {
  background-color: #59bb0c;
  position: fixed;
  right: 80px;
  bottom: 80px;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  cursor: pointer;
  transition: 0.3s;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.12);
  opacity: 0.8;
}

.page-component-up i {
  color: #fff;
  display: block;
  line-height: 40px;
  text-align: center;
  font-size: 18px;
}

a:link,
a:visited {
  color: #59bb0c;
}

a:hover {
  color: #3b8070;
}
</style>
