import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Permissions extends BaseSchema {
  protected tableName = 'permissions'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.charset('utf8')
      table.collate('utf8_general_ci')

      table.string('id').unique().primary()
      table.string('slug').notNullable().unique()
      table.string('name').notNullable()
      table.text('description').nullable()
      table.text('group_permissions').notNullable()
      table.enum('source', ['all', 'support', 'operator']).defaultTo('support')

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
