
/*
|--------------------------------------------------------------------------
| Preloaded File
|--------------------------------------------------------------------------
|
| Any code written inside this file will be executed during the application
| boot.
|
*/
import { resolve } from 'path'
import Event from '@ioc:Adonis/Core/Event'
import I18n from '@ioc:Adonis/Addons/I18n'
import { loadModulesInternationalization } from './utils/i18n-modules-loader'

;['../app/modules'].forEach(async (path) => {
  await loadModulesInternationalization(resolve(__dirname, path))
})

Event.on('i18n:missing:translation', I18n.prettyPrint)
