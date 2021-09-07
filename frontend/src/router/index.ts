import { createRouter, createWebHistory } from "vue-router"
import index from '../pages/index.vue'
import login from '../pages/auth/login.vue'
import register from '../pages/auth/register.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: index
    },
    {
        path: '/login',
        name: 'Login',
        component: login
    },
    {
        path: '/register',
        name: 'Register',
        component: register
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router