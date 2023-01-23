
import { DateTime } from 'luxon'

import Inertia from '@ioc:EidelLev/Inertia'
const pkg = require('../package.json')

Inertia.share({
  errors: (ctx) => ctx.session.flashMessages.get('errors'),
  success: (ctx) => ctx.session.flashMessages.get('success'),
  user: (ctx) => ctx.auth.user,
  menu: (ctx) => {
    //  ctx.session.get('menu')

    return [
      {
        children: [
          {
            display: 'Dashboard',
            url: '/admin/account/dashboard',
          },
        ],
      },
      {
        display: 'Common',
        isGroup: true,
        children: [
          {
            display: 'Novo modulo',
            url: '/admin/account/file/welcome',
          },
        ],
      },
    ]
  },
  headers: (ctx) => ctx.session.get('header'),
  today: DateTime.now().setLocale('pt-PT').toFormat('dd, LLLL yyyy'),
  version: pkg.version,
  copyright: pkg.copyright,
})
