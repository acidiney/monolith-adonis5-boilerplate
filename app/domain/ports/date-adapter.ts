
export interface DateAdapter {
  format: (date?: Date) => string
  toRelative: (date?: Date) => string
}
