import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Module from 'App/Models/Module'

export default class extends BaseSeeder {
  public async run() {

    await Module.createMany([
      { name: 'Users' },
      { name: 'Roles' }
    ]);
  }
}
