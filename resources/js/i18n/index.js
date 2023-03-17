const r = require.context('../../lang', false, /\.json$/)

const keys = r.keys()
  .map((k) => k.replace('./', '').replace('.json', ''))


const i18n = {};


keys.forEach((p) => {
  i18n[p] = r(r.keys().find((k) => k.includes(p)))
})

export default i18n
