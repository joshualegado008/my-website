import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Calculator from '../views/Calculator.vue'

const routes = [
  { path: '/', component: Login },
  { path: '/calculator', component: Calculator },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
