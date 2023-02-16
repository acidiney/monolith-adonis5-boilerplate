import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'core_notifications'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id')
        .unique()
        .primary()

      table.string('notification_key')
        .unique()
        .index()
        .notNullable()

      /**
         * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
        */

      table.timestamp('deleted_at').nullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
