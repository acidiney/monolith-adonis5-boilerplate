import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class RolePermissions extends BaseSchema {
  protected tableName = 'core_role_permissions'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').unique().primary()
      table.string('permission_id').index()
      table.foreign('permission_id')
        .references('id')
        .inTable('core_permissions')
        .onDelete('cascade')

      table.string('role_id').index()

      table.foreign('role_id')
        .references('id')
        .inTable('core_roles')
        .onDelete('cascade')

      table.unique(['role_id', 'permission_id'])

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
