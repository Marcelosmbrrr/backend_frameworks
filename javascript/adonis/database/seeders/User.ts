import BaseSeeder from '@ioc:Adonis/Lucid/Seeder';
import Hash from '@ioc:Adonis/Core/Hash'
import User from 'App/Models/User';

export default class extends BaseSeeder {
  public async run() {
    await User.createMany([
      {
        name: 'Admin',
        email: 'admin@adonisjs.com',
        roleId: '1',
        password: await Hash.make('123123'),
      }
    ])
  }
}
