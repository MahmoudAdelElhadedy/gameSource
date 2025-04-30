import { createRouter, createWebHistory } from 'vue-router'
import { isAuth, islogged, isAdmin } from '@/composables/auth.js'
import Home from '@/components/Home/index.vue'
import NotFound from '@/components/404.vue'

import Signin from '@/components/user/signin.vue'
import Dashboard from '@/components/user/dashboard/index.vue'
import mainDashboard from '@/components/user/dashboard/main.vue'
import adminArticales from '@/components/user/dashboard/admin/articales.vue'
import adminAdd from '@/components/user/dashboard/admin/add.vue'
import adminEdit from '@/components/user/dashboard/admin/edit.vue'
import userProfile from '@/components/user/dashboard/pages/userProfile.vue'
import Articale from '@/components/articale/articale.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [{ path: '/', name: 'home', component: Home },
  { path: '/article/:id', component: Articale, name: 'articale' },
  { path: '/signin', name: 'signin', component: Signin, beforeEnter: islogged },
  {
    path: '/user/dashboard', component: Dashboard, beforeEnter: [isAuth], children: [
      { path: '', name: 'dashboard', component: mainDashboard },

      { path: 'profile', name: 'userProfile', component: userProfile },
      { path: 'articales', name: 'adminArticales', component: adminArticales, beforeEnter: [isAdmin] },
      { path: 'articales/edit/:id', name: 'adminEdit', component: adminEdit, beforeEnter: [isAdmin] },
      { path: 'articales/add', name: 'adminAdd', component: adminAdd, beforeEnter: [isAdmin] },

    ]
  },
  { path: '/:notFound(.*)*', component: NotFound, name: '404' }

  ],
})

export default router
