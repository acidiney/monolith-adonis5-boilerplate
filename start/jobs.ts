import Application from '@ioc:Adonis/Core/Application'
import { resolve } from 'path'
import { loadContext } from 'app/infra/utils'

const jobs: string[] =
  loadContext(resolve(__dirname, '../app/modules'), true, /infra\/jobs\/.*\.(ts|js)$/)
    .keys()
    .map((k) => {
      return k.replace(Application.appRoot, '.')
        .replace('./', '')
    })

export default jobs
