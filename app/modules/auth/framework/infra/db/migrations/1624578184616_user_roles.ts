import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UserRoles extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('role_id').index()
      table.foreign('role_id').references('id').inTable('roles').onDelete('cascade')
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropForeign('role_id')
      table.dropColumn('role_id')
    })
  }
}
