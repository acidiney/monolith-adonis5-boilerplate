/*
|--------------------------------------------------------------------------
| Preloaded File
|--------------------------------------------------------------------------
|
| Any code written inside this file will be executed during the application
| boot.
|
*/

import getPort from 'get-port'
import Bull from '@ioc:Rocketseat/Bull'
import Application from '@ioc:Adonis/Core/Application'

if (process.env.NODE_ENV?.toLowerCase() !== 'seeding') {
  getPort({ port: 9999 }).then((port) => {
    Bull.process()

    if (Application.inDev) {
      Bull.ui(port)
    }
  })
}
