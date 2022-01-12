import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '../views/Dashboard'
import Politician from '../views/Politician'
import Imprint from "../views/Imprint";
import DataProtectionPolicy from "../views/DataProtectionPolicy";
import LandingPage from "../views/LandingPage";
import About from "../views/About";

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'dashboard',
            component: Dashboard,
            meta: {
                headerTransparent: false
            }
        },
        {
            path: '/politician/:id',
            name: 'politician',
            component: Politician,
            meta: {
                headerTransparent: false
            }
        },
        {
            path: '/imprint',
            name: 'imprint',
            component: Imprint,
            meta: {
                headerTransparent: false
            }
        },
        {
            path: '/privacy',
            name: 'privacy',
            component: DataProtectionPolicy,
            meta: {
                headerTransparent: false
            }
        },
        {
            path: '/about',
            name: 'about',
            component: About,
            meta: {
                headerTransparent: false
            }
        },
        {
            path: '/landing',
            name: 'landing',
            component: LandingPage,
            meta: {
                headerTransparent: true
            }
        }
    ]
})