import {loadModulesInternationalization} from './utils/i18n-modules-loader'
import {resolve} from 'path'

export const i18nLoader = async function (destine: string) {
  const paths = ['../app/modules']

  for (const path of paths) {
    await loadModulesInternationalization(resolve(__dirname, path), destine, /main\/i18n\/.*\.json$/)
  }
}
