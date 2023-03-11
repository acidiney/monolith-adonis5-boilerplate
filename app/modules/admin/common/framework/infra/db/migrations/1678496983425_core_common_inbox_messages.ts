import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'core_common_inbox_messages'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').notNullable().primary().unique()
      table.string('type')
      table.json('payload')
      table.boolean('complete').defaultTo(false)
      table.string('outbox_id')
        .notNullable()
        .references('id')
        .inTable('core_outbox_messages')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
