import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { inject } from '@adonisjs/fold';
// Custom
import CreateRoleValidator from 'App/Validators/Modules/Roles/CreateRoleValidator';
import UpdateRoleValidator from 'App/Validators/Modules/Roles/UpdateRoleValidator';
import RolesService from 'App/Services/Modules/Roles/RolesService';

@inject()
export default class RolesController {
    // Dependency Injection - injected by IoC container
    constructor(private readonly rolesService: RolesService) { }

    async index({ request, response, bouncer }: HttpContextContract) {
        await bouncer.authorize('roles:read')

        const { limit, offset, search } = request.qs();
        const roles = await this.rolesService.index(limit, offset, search);

        response.status(200).send({
            message: 'Roles was found.',
            roles: roles
        });
    }

    async store({ request, response, bouncer }: HttpContextContract) {
        await bouncer.authorize('roles:write')

        const payload = await request.validate(CreateRoleValidator)
        await this.rolesService.store(payload);

        response.status(201).send({
            message: 'Role has been created.'
        });
    }

    async update({ request, response, bouncer }: HttpContextContract) {
        await bouncer.authorize('roles:write')

        const payload = await request.validate(UpdateRoleValidator)
        const { id } = request.params();
        await this.rolesService.update(payload, +id);

        response.status(201).send({
            message: 'Role has been updated.'
        });
    }

    async destroy({ request, response, bouncer }: HttpContextContract) {
        await bouncer.authorize('roles:write')
        
        const { id } = request.params();
        await this.rolesService.destroy(id);

        response.status(201).send({
            message: 'Role has been deleted.'
        });
    }
}
