import { createWebHashHistory, createRouter } from 'vue-router'

import Home from '../pages/Home.vue'
import Level from '../pages/Level.vue'
import NotFound from '../pages/NotFound.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/levels', component: Level },
  { path: '/not-found', component: NotFound },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

router.beforeEach((to, _, next) => {
  if (['/', '/levels', '/not-found'].includes(to.path)) {
    next()
  } else {
    next('/not-found')
  }
})

export default router
