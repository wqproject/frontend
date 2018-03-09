import Vue from 'vue'
import Router from 'vue-router'
import Search from '@/components/Search'
import List from '@/components/List'
import History from '@/components/History'
import HistoryUser from '@/components/HistoryUser'
import LikeUser from '@/components/LikeUser'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Search
    },
    {
      path: '/list',
      component: List
    },
    {
      path: '/history',
      component: History
    },
    {
      path: '/history_user',
      component: HistoryUser
    },
    {
      path: '/like_user',
      component: LikeUser
    }
  ]
})
