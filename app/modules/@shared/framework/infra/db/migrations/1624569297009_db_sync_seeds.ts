import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AdonisSeeds extends BaseSchema {
  protected tableName = 'core_internal_db_sync'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').unique().primary()
      table.string('seed_name').unique().notNullable()

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
