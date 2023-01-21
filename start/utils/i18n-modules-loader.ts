import { resolve } from 'path'
import Application from '@ioc:Adonis/Core/Application'
import { loadContext as context } from '../../app/infra/utils/context'

import { writeFile } from 'fs/promises'

export const loadModulesInternationalization = async (path: string, destine: string, regex) => {
  const req = context(path, true, regex)

  const languagues: string[] = []
  const languaguesData: { [key: string]: Object } = {}

  req.keys().forEach(async (filename: string) => {
    languagues.push(filename)
  })

  for (const lang of languagues) {
    const splitted = lang.split('/')
    const last = splitted[splitted.length - 1].split('.')[0]

    const data = require(lang)

    if (!languaguesData[last]) {
      languaguesData[last] = {}
    }

    languaguesData[last] = {
      ...languaguesData[last],
      ...data,
    }
  }

  for (const lang in languaguesData) {
    const resource = Application.resourcesPath(destine)
    await writeFile(resolve(resource, `${lang}.json`), JSON.stringify(languaguesData[lang]))
  }
}
