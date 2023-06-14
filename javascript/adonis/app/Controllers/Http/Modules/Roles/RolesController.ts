import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
// Custom
import CreateRoleValidator from 'App/Validators/Modules/Roles/CreateRoleValidator';
import UpdateRoleValidator from 'App/Validators/Modules/Roles/UpdateRoleValidator';
import RolesService from 'App/Services/Roles/RolesService';

export default class RolesController {
    // Dependency Injection - injected by IoC container
    constructor(private readonly rolesService: RolesService) { }

    async index({ request, response }: HttpContextContract) {
        const roles = await this.rolesService.index();

        response.status(200).send({
            message: 'Roles was found.',
            roles: roles
        });
    }

    async store({ request, response }: HttpContextContract) {
        const payload = await request.validate(CreateRoleValidator)
        await this.rolesService.store();

        response.status(201).send({
            message: 'Role has been created.'
        });
    }

    async update({ request, response }: HttpContextContract) {
        const payload = await request.validate(UpdateRoleValidator)
        await this.rolesService.update();

        response.status(201).send({
            message: 'Role has been updated.'
        });
    }

    async destroy({ request, response }: HttpContextContract) {
        await this.rolesService.destroy();

        response.status(201).send({
            message: 'Role has been deleted.'
        });
    }
}
