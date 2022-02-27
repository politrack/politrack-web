import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router/index.js'
import moment from 'moment'

import {library} from '@fortawesome/fontawesome-svg-core'
import {
    faInfoCircle,
    faChevronRight,
    faChevronLeft,
    faEnvelope,
    faDownload,
    faExclamationTriangle,
    faCircleQuestion,
    faShare
} from '@fortawesome/free-solid-svg-icons'
import {
    faTwitter,
    faGithub,
    faLinkedin,
    faReddit,
    faTelegram,
    faFacebook,
    faWhatsapp
} from '@fortawesome/free-brands-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'

library.add(faInfoCircle, faTwitter, faGithub, faChevronRight, faChevronLeft, faEnvelope, faLinkedin, faExclamationTriangle, faCircleQuestion,
    faDownload, faShare, faReddit, faTelegram, faWhatsapp, faFacebook)
Vue.component('font-awesome-icon', FontAwesomeIcon)

moment.locale('de');
Vue.prototype.moment = moment;
Vue.config.productionTip = false
Vue.config.performance = true

new Vue({
    vuetify,
    router: router,
    render: h => h(App)
}).$mount('#app')
