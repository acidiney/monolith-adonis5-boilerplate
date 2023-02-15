import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Roles extends BaseSchema {
  protected tableName = 'core_roles'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').unique().primary()
      table.string('slug').notNullable().unique()
      table.string('name').notNullable()
      table.text('description').nullable()
      table.boolean('system').defaultTo(false)
      table.string('created_by_user').references('id').inTable('core_users')

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
