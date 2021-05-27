import Vue from 'vue'
import VueRouter from 'vue-router'
// import Paginate from 'vuejs-paginate'
import Home from '../views/Home.vue'
import All from '@/views/All.vue'
import Recommend from '@/views/Recommend.vue'
import Genre from '@/views/Genre.vue'
import SignUp from '@/views/SignUp.vue'
import Login from '@/views/Login.vue'

Vue.use(VueRouter)
// Vue.component('paginate', Paginate)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/all',
    name: 'All',
    component: All
  },
  {
    path: '/genre',
    name: 'Genre',
    component: Genre
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/recommend',
    name: 'Recommend',
    component: Recommend
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
