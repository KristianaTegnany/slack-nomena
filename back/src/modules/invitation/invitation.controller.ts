import { Body, Controller, Param, Post } from '@nestjs/common';
import { InvitationService } from './invitation.service';

@Controller('invitation')
export class InvitationController {
  constructor(private readonly invitationService: InvitationService) {}

  @Post('workspace/:id/invite')
  async sendInvitation(
    @Param('id') workspaceId: string,
    @Body('inviterId') inviterId: string,
    @Body('inviteeEmail') inviteeEmail: string,
  ) {
    return this.invitationService.sendInvitation(
      workspaceId,
      inviterId,
      inviteeEmail,
    );
  }

  @Post(':id/accept')
  async acceptInvitation(
    @Param('id') invitationId: string,
    @Body('userId') userId: string,
  ) {
    return this.invitationService.acceptInvitation(invitationId, userId);
  }
}
