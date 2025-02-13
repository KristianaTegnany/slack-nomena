import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ActivitiesService } from './activities.service';
import { CreateActivityDto } from './dto/create-activity.dto';

@Controller('workspace/:id')
export class ActivitiesController {
  constructor(private readonly activitiesService: ActivitiesService) {}

  @Post('activity')
  async createActivity(
    @Param('id') workspaceId: string,
    @Body() activity: CreateActivityDto,
  ) {
    return this.activitiesService.createActivity({ ...activity, workspaceId });
  }
  @Get('activities')
  async getWorkspaceActivities(@Param('id') workspaceId: string) {
    return await this.activitiesService.getWorkspaceActivities(workspaceId);
  }
}
