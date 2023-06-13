import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
// Custom
import CreateRoleValidator from 'App/Validators/Modules/Roles/CreateRoleValidator';
import UpdateRoleValidator from 'App/Validators/Modules/Roles/UpdateRoleValidator';

export default class RolesController {
    async index({ request, response }: HttpContextContract) {
        //
    }

    async store({ request, response }: HttpContextContract) {
        // const payload = await request.validate(CreateRoleValidator)
    }

    async show({ request, response }: HttpContextContract) {
        //
    }

    async update({ request, response }: HttpContextContract) {
        // const payload = await request.validate(UpdateRoleValidator)
    }

    async destroy({ request, response }: HttpContextContract) {
        //
    }
}
