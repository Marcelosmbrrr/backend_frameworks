import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'roles'
  protected pivot = 'module_role';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').unique()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
      table.timestamp("deleted_at").defaultTo(null);
    });

    this.schema.createTable(this.pivot, (table) => {
      table.integer('module_id').unsigned().references('id').inTable('modules')
      table.integer('role_id').unsigned().references('id').inTable('roles')
      table.boolean('read')
      table.boolean('write')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
    this.schema.dropTable(this.pivot)
  }
}
