import Vue from 'vue'
import Router from 'vue-router'
import CrudLayout from './views/CrudLayout.vue'
import SearchLayout from './views/SearchLayout.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/crud',
      name: 'crud',
      component: CrudLayout
    },
    {
      path: '/search',
      name: 'search',
      component: SearchLayout
    }
  ]
})
