import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'core_users'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('role_id').index().notNullable()

      table.foreign('role_id')
        .references('id')
        .inTable('roles')
        .onDelete('cascade')
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropIndex('role_id')
      table.dropForeign('role_id')
      table.dropColumn('role_id')
    })
  }
}
