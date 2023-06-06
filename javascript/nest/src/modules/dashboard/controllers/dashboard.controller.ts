import { Controller, Get, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
// Custom
import { DashboardService } from '../services/dashboard.service';
import { RoleGuard } from 'src/common/guards/role.guard';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) { }

  @UseGuards(RoleGuard)
  @Get()
  async findAll(@Res() response: Response) {
    const data = await this.dashboardService.findAll();

    return response.status(200).send(data);
  }
}
