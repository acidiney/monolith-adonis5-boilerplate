import { createInertiaApp } from '@inertiajs/vue3'

import { createApp, h } from 'vue'
import { createI18n } from 'vue-i18n'

import LoadScript from 'vue-plugin-load-script'

import AppIcon from './core/components/AppIcon.vue'
import AppLogo from './core/components/AppLogo.vue'
import AppPageHero from './core/components/AppPageHero.vue'
import AccountLayout from './layout/account.vue'

import '../css/app.css'
import messages from './i18n'

const i18n = createI18n({
  locale: 'pt',
  messages,
})

createInertiaApp({
  progress: {
    color: '##448bff',
  },
  resolve: (name) => import(`../../app/modules/${name}.vue`),
  setup ({ el, App, props, plugin }) {
    createApp({ render: () => h(App, props) })
      .use(plugin)
      .use(LoadScript)
      .use(i18n)
      .component('account-layout', AccountLayout)
      .component('app-logo', AppLogo)
      .component('app-icon', AppIcon)
      .component('app-page-hero', AppPageHero)
      .mount(el)
  },
})
