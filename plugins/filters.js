import Vue from 'vue'
import dayjs from 'dayjs'

// 表示日時のフォーマット
Vue.filter('asDate', function(value) {
  if (value) {
    return dayjs().format('YYYY-MM-DDThh:mm')
  }
})

// 本文のトリミング
Vue.filter('asDescription', function(value) {
  if (value) {
    return value.slice(0, 100) + '...'
  }
})
