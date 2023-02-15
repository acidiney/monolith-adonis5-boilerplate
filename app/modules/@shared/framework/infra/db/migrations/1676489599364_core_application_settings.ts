import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'core_application_settings'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').unique().primary()

      table.string('app_name').notNullable()
      table.string('app_desc').notNullable()

      table.string('app_color_primary').notNullable()
      table.string('app_color_secondary').notNullable()
      table.string('app_background_primary_color').notNullable()
      table.string('app_background_secondary_color').notNullable()

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
