import {DateTime} from 'luxon'

export interface DateAdapter {
  format: (date?: Date) => string
  toRelative: (date?: Date) => string
  toDatePersistence: (date?: Date) => DateTime | undefined
}
