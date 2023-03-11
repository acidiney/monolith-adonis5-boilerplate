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

if (Application.environment === 'web') {
  getPort({ port: 9999 }).then((port) => {
    Bull.process()

    Bull.ui(port)
  })
}
