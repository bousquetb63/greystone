import Vue from 'vue'
import Router from 'vue-router'
import Auth from './components/Auth.vue'
import AuthSuccess from './components/AuthSuccess.vue'
import Login from './views/Login.vue'
import Tasks from './views/Tasks.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      name: 'tasks',
      component: Tasks
    },
    {
      path: '/auth',
      name: 'auth',
      component: Auth
    },
    {
      path: '/success',
      name: 'success',
      component: AuthSuccess
    }
  ]
})
