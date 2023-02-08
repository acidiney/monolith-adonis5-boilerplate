import { DateTime } from 'luxon'

import Inertia from '@ioc:EidelLev/Inertia'
import {UserModel} from 'app/infra/models'
const pkg = require('../package.json')

Inertia.share({
  errors: (ctx) => ctx.session.flashMessages.get('errors'),
  success: (ctx) => ctx.session.flashMessages.get('success'),
  user: (ctx) => {
    if (ctx.auth.user) {
      return UserModel.query()
        .preload('role')
        .where('id', ctx.auth.user.id)
        .first()
    }
    return
  },
  menu: (ctx) => ctx.session.get('menu'),
  headers: (ctx) => ctx.session.get('header'),
  today: DateTime.now().setLocale('pt-PT').toFormat('dd, LLLL yyyy'),
  version: pkg.version,
  copyright: DateTime.now().get('year'),
})
