import Vue from 'vue'
import Router from 'vue-router'
import ManageBoard from '@/components/ManageBoard'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ManageBoard',
      component: ManageBoard
    }
  ]
})
