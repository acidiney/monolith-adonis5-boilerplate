import { createInertiaApp } from '@inertiajs/vue3'

import { createApp, h } from 'vue'
import { createI18n } from 'vue-i18n'

import '../css/app.css'
import messages from './i18n'
import { loadComponent } from '@core'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'


const i18n = createI18n({
  locale: 'pt',
  legacy: false,
  messages,
})

createInertiaApp({
  title: title => `${title}`,
  progress: {
    color: '#448bff',
  },
  resolve: (name) => import(`../../app/modules/${name}.vue`),
  setup ({ el, App, props, plugin }) {
    createApp({ render: () => h(App, props) })
      .use(plugin)
      .use(i18n)
      .use(ElementPlus)
      .use(loadComponent)
      .mount(el)
  },
})
