import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'core_inbox_messages'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').primary().unique().index().notNullable()

      table.string('responsable').notNullable()
      table.string('type').index().notNullable()
      table.json('payload').notNullable()
      table.string('meta_user_id').nullable()
      table.string('meta_outbox_id').notNullable().references('id').inTable('core_outbox_messages').onDelete('CASCADE')

      table.enum('status', ['PENDING', 'STARTED']).notNullable()
      table.boolean('complete').notNullable()

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
