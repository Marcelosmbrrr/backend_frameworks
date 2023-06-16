import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { inject } from '@adonisjs/fold';
// Custom
import CreateUserValidator from 'App/Validators/Modules/Users/CreateUserValidator';
import UpdateUserValidator from 'App/Validators/Modules/Users/UpdateUserValidator';
import UsersService from 'App/Services/Modules/Users/UsersService';

@inject()
export default class UsersController {
    // Dependency Injection - injected by IoC container
    constructor(private readonly usersService: UsersService) { }

    async index({ request, response, bouncer }: HttpContextContract) {
        await bouncer.authorize('users:read')

        const { limit, offset, search } = request.qs();
        const users = await this.usersService.index(limit, offset, search);

        response.status(200).send({
            message: 'Users was found.',
            users: users
        });
    }

    async store({ request, response, bouncer }: HttpContextContract) {
        await bouncer.authorize('users:write')

        const payload = await request.validate(CreateUserValidator);
        await this.usersService.store(payload);

        response.status(201).send({
            message: 'User has been created.'
        });
    }

    async update({ request, response, bouncer }: HttpContextContract) {
        await bouncer.authorize('users:write')

        const payload = await request.validate(UpdateUserValidator)
        const { id } = request.params();
        await this.usersService.update(payload, +id);

        response.status(201).send({
            message: 'User has been updated.'
        });
    }

    async destroy({ request, response, bouncer }: HttpContextContract) {
        await bouncer.authorize('users:write')
        
        const { id } = request.params();
        await this.usersService.destroy(id);

        response.status(201).send({
            message: 'User has been deleted.'
        });
    }
}
