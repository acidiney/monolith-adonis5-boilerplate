import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'core_users'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('default_lang').defaultTo('pt').after('avatar_url')
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('default_lang')
    })
  }
}
