import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Menus extends BaseSchema {
  protected tableName = 'menus'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').unique().primary()
      table.string('name').notNullable()
      table.string('slug').notNullable()
      table.string('url').notNullable()
      table.string('icon').nullable()
      table.string('permission_id').nullable()
      table.string('belongs_to').nullable()
      table.boolean('is_group').defaultTo(false)
      table.string('group_name').nullable()
      table.integer('order')

      table.foreign('permission_id').references('id').inTable('permissions')

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
