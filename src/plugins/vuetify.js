import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import de from 'vuetify/lib/locale/de';
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify);

export default new Vuetify({
    lang: {
        locales: {de},
        current: 'de',
    },
    icons: {
        iconfont: 'fa',
    },
    theme: {
        themes: {
            light: {
                primary: colors.indigo,
                secondary: colors.grey.darken1,
                accent: colors.shades.black,
                error: colors.red.accent3,
                background: colors.grey.lighten4, // Not automatically applied

                headerColor: '#f0f5f5',
                content1: '#D8B2DFFC',
                content2: '#eefcfc',
                footerColor: '#1D3557'
            },
            dark: {
                primary: colors.blue.lighten3,
                background: colors.indigo.base, // If not using lighten/darken, use base to return hex
            },
        },
    }
});
