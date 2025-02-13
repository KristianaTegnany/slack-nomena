import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { InvitationService } from './invitation.service';

@Controller('invitation')
export class InvitationController {
  constructor(private readonly invitationService: InvitationService) {}

  @Post('workspace/:id/invite')
  async sendInvitation(
    @Param('id') workspaceId: string,
    @Body('inviterId') inviterId: string,
  ) {
    return this.invitationService.sendInvitation(
      workspaceId,
      inviterId
    );
  }

  @Get(':id')
  async getInvitationById(@Param('id') id: string){
    return this.invitationService.getInvitationById(id)
  }

  @Post(':id/accept')
  async acceptInvitation(
    @Param('id') invitationId: string,
    @Body('userId') userId: string,
  ) {
    return this.invitationService.acceptInvitation(invitationId, userId);
  }
}
