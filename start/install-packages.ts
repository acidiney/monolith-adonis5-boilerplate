import { resolve } from 'path'
/**
 * working for now, but, maybe implment in other place
 */

import execa from 'execa'

import { getDirectories as context } from 'app/infra/utils/context'

(async () => {
  const modules = context(resolve(__dirname, '../app/modules/addons'))
    .map((s) => `./app${s.split('app')[1]}`)

  for (const mod of modules) {
    console.log(`Instaling ${mod} packages`)
    await execa('npm', ['install', mod, '--no-save'], {
      stdio: 'inherit',
    })
  }
})()
