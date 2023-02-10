import {DateAdapter} from 'app/modules/@shared/domain/ports'
import {DateTime} from 'luxon'
import I18n from '@ioc:Adonis/Addons/I18n'
import * as luxon from 'luxon'

export class DateAdapterImpl implements DateAdapter {
  public toRelative (date?: Date): string {
    if (!date) {
      return ''
    }

    const luxonDate = DateTime.fromJSDate(date)

    return date && I18n
      .locale(I18n.defaultLocale)
      .formatRelativeTime(luxonDate, 'auto')
  }

  public format (date?: Date): string {
    if (!date) {
      return ''
    }
    const luxonDate = DateTime.fromJSDate(date)

    return date && I18n
      .locale(I18n.defaultLocale)
      .formatDate(luxonDate,
        { year: 'numeric',
          month: 'short',
          day: 'numeric',
          minute: '2-digit', second: '2-digit', hour: '2-digit', hourCycle: 'h24'}
      )
  }

  public toDatePersistence (date?: Date): DateTime | undefined {
    if (!date) {
      return
    }

    return luxon.DateTime.fromJSDate(date)
  }
}
