import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '../views/Dashboard'
import Politician from '../views/Politician'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'dashboard',
            component: Dashboard
        },
        {
            path: '/politician/:id',
            name: 'politician',
            component: Politician
        }
    ]
})