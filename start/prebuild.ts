import { i18nLoader } from './i18n-bootloader'
import {resolve} from 'path'

console.log('Generate i18n translations!')

const langPath = resolve(__dirname, '..', 'resources', 'lang')
void i18nLoader(langPath)
