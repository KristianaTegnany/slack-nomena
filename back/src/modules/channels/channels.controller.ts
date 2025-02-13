import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ChannelsService } from './channels.service';

@Controller('workspace/:id/channels')
export class ChannelsController {
  constructor(private readonly channelsService: ChannelsService) {}
  @Post()
  async createChannel(
    @Param('id') workspaceId: string,
    @Body('name') name: string,
    @Body('createdBy') createdBy: string,
  ) {
    return await this.channelsService.create(workspaceId, name, createdBy);
  }

  @Get(":id")
  async findChannelById(@Param('id') id: string) {
    return this.channelsService.findChannelById(id)
  }

  @Get()
  async listChannels(@Param('id') workspaceId: string) {
    return await this.channelsService.getChannelsByWorkspace(workspaceId);
  }
}
