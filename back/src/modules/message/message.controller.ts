import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MessageService } from './message.service';

@Controller()
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post('channel/:id/messages')
  async sendChannelMessage(
    @Param('id') channelId: string,
    @Body('senderId') senderId: string,
    @Body('content') content: string,
  ) {
    return this.messageService.sendChannelMessage(channelId, senderId, content);
  }

  @Get('channel/:id/messages')
  async getChannelMessages(@Param('id') channelId: string) {
    return this.messageService.getChannelMessages(channelId);
  }

  @Post('message/:id/private')
  async sendPrivateMessage(
    @Param('id') receiverId: string,
    @Body('senderId') senderId: string,
    @Body('content') content: string,
  ) {
    return this.messageService.sendPrivateMessage(
      senderId,
      receiverId,
      content,
    );
  }

  @Get('messages/:id/private')
  async getPrivateMessages(
    @Param('id') userId: string,
    @Body('withUserId') withUserId?: string,
  ) {
    return this.messageService.getPrivateMessages(userId, withUserId);
  }

  @Get('messages/users/:id/private')
  async getPrivateConversationUsers(@Param('id') userId: string) {
    return this.messageService.getPrivateConversationUsers(userId);
  }
}
