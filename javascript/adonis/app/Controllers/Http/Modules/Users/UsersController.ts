import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
// Custom
import CreateUserValidator from 'App/Validators/Modules/Users/CreateUserValidator';
import UpdateUserValidator from 'App/Validators/Modules/Users/UpdateUserValidator';
import UsersService from 'App/Services/Users/UsersService';

export default class UsersController {
    // Dependency Injection - injected by IoC container
    constructor(private readonly usersService: UsersService) { }

    async index({ request, response }: HttpContextContract) {
        const users = await this.usersService.index();

        response.status(200).send({
            message: 'Users was found.',
            users: users
        });
    }

    async store({ request, response }: HttpContextContract) {
        const payload = await request.validate(CreateUserValidator)
        await this.usersService.store();

        response.status(201).send({
            message: 'User has been created.'
        });
    }

    async update({ request, response }: HttpContextContract) {
        const payload = await request.validate(UpdateUserValidator)
        await this.usersService.update();

        response.status(201).send({
            message: 'User has been updated.'
        });
    }

    async destroy({ request, response }: HttpContextContract) {
        await this.usersService.destroy();

        response.status(201).send({
            message: 'User has been deleted.'
        });
    }
}
