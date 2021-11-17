import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '../views/Dashboard'
import Politician from '../views/Politician'
import Imprint from "../views/Imprint";
import DataProtectionPolicy from "../views/DataProtectionPolicy";
import About from "../views/About";

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
        },
        {
            path: '/imprint',
            name: 'imprint',
            component: Imprint
        },
        {
            path: '/privacy',
            name: 'privacy',
            component: DataProtectionPolicy
        },
        {
            path: '/about',
            name: 'about',
            component: About
        }
    ]
})