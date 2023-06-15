import BaseSeeder from '@ioc:Adonis/Lucid/Seeder';
import User from 'App/Models/User';

export default class extends BaseSeeder {
  public async run() {
    await User.createMany([
      {
        name: 'Admin',
        email: 'admin@gmail.com',
        role_id: '1',
        password: '123123',
      }
    ])
  }
}
