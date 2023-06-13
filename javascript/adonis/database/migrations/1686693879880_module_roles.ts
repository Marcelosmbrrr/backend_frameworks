import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'module_roles'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('moduleId').references('id').inTable('modules')
      table.integer('roleId').references('id').inTable('roles')
      table.boolean('read')
      table.boolean('write')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
