import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Role from 'App/Models/Role'

export default class extends BaseSeeder {
  public async run() {

    const roleAdmin = await Role.create({
      name: 'Admin'
    });

    await roleAdmin.related('modules').attach({
      [1]: {
        read: true,
        write: true
      }
    });

    await roleAdmin.related('modules').attach({
      [2]: {
        read: true,
        write: true
      }
    });

    const roleCommon = await Role.create({
      name: 'Common'
    });

    await roleCommon.related('modules').attach({
      [1]: {
        read: true,
        write: false
      }
    });

    await roleCommon.related('modules').attach({
      [2]: {
        read: true,
        write: false
      }
    });


  }
}
