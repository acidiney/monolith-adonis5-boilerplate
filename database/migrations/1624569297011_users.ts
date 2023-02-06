import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UsersSchema extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').unique().primary()
      table.string('first_name', 255).notNullable()
      table.string('last_name', 255).nullable()
      table.string('slug', 255).notNullable().unique().index()
      table.string('email', 255).notNullable()
      table.string('password', 180).notNullable()
      table.boolean('force_change_password').defaultTo(true)
      table.string('remember_me_token').nullable()
      table.string('status_id').index()
      table.datetime('last_login').nullable()
      table.foreign('status_id').references('id').inTable('statuses').onDelete('cascade')

      table.unique(['id', 'status_id'])
      /**
       * Uses timestampz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
