import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.table(this.tableName, (table) => {
      table.string('role_id').index().after('last_login')
      table.foreign('role_id').references('id').inTable('roles').onDelete('cascade')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
