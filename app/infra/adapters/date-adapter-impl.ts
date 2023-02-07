import {DateAdapter} from 'app/domain/ports'
import {DateTime} from 'luxon'
import I18n from '@ioc:Adonis/Addons/I18n'

export class DateAdapterImpl implements DateAdapter {
  public format (date: Date): string {
    const luxonDate = DateTime.fromJSDate(date)

    return I18n
      .locale(I18n.defaultLocale)
      .formatRelativeTime(luxonDate, 'auto')
  }
}
