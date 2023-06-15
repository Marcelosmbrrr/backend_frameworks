import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { inject } from '@adonisjs/fold';
// Custom
import DashboardService from 'App/Services/Modules/Dashboard/DashboardService';

@inject()
export default class DashboardController {
    // Dependency Injection - injected by IoC container
    constructor(private readonly dashboardService: DashboardService) { }

    async handle({ request, response }: HttpContextContract) {
        const data = await this.dashboardService.index();
        return response.status(200).send({
            ...data
        });
    }
}
