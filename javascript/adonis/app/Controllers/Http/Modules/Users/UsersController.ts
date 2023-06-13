import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
// Custom
import CreateUserValidator from 'App/Validators/Modules/Users/CreateUserValidator';
import UpdateUserValidator from 'App/Validators/Modules/Users/UpdateUserValidator';

export default class UsersController {
    async index({ request, response }: HttpContextContract) {
        //
    }

    async store({ request, response }: HttpContextContract) {
        // const payload = await request.validate(CreateUserValidator)
    }

    async show({ request, response }: HttpContextContract) {
        //
    }

    async update({ request, response }: HttpContextContract) {
        // const payload = await request.validate(UpdateUserValidator)
    }

    async destroy({ request, response }: HttpContextContract) {
        //
    }
}
