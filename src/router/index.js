import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '../views/Dashboard'
import Politician from '../views/Politician'
import Imprint from "../views/Imprint";
import DataProtectionPolicy from "../views/DataProtectionPolicy";
import LandingPage from "../views/LandingPage";
import About from "../views/About";
import ElectionCampaignChronic from "../views/election/ElectionCampaignChronic";
import EventOverview from '../views/election/EventOverview.vue'
import events from "../assets/btw/events.json"
import NotFound from '../views/NotFound.vue'

Vue.use(Router)

function getEvent (route) {
    let event = events.find(function (e) {
        return e.id === route.params.id;
    });
    return {
        event: event
    }
}

let path_404 = {
    path: '/404',
    name: 'NotFound',
    component: NotFound
};

export default new Router({
    routes: [
        {
            path: '/dashboard',
            name: 'dashboard',
            component: Dashboard,
            meta: {
                headerTransparent: true
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
            path: '/',
            name: 'landing',
            component: LandingPage,
            meta: {
                headerTransparent: true
            }
        },
        {
            path: '/btw21',
            name: 'chronic',
            component: ElectionCampaignChronic
        },
        {
            path: '/btw21/:id',
            name: 'event',
            component: EventOverview,
            props: getEvent,
            beforeEnter: (route, from, next) => {
                let event = events.find(function (e) {
                    return e.id === route.params.id;
                });
                if (!event) next(path_404.path);
                else next();
            }
        }
    ]
})