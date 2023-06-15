import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name')
      table.string('email').unique()
      table.string('password')
      table.string('image').defaultTo('default.jpg')
      table.integer('role_id').unsigned().references('id').inTable('roles')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
      table.timestamp("deleted_at").defaultTo(null);
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
