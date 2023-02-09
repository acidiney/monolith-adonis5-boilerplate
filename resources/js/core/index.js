import AppIcon from './components/app-icon.vue'
import AppLogo from './components/app-logo.vue'
import AppHead from './components/app-head.vue'
import AppPageHero from './components/app-page-hero.vue'
import AccountLayout from '../layout/account.vue'
import { Link } from '@inertiajs/vue3'

export const loadComponent = {
  install: (app) => {
    return app
      .component('router-link', Link)
      .component('account-layout', AccountLayout)
      .component('app-logo', AppLogo)
      .component('app-icon', AppIcon)
      .component('app-head', AppHead)
      .component('app-page-hero', AppPageHero)
  },
}
