import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { FirebaseService } from 'src/firebase/firebase.service';

@Module({
  controllers: [MessageController],
  providers: [MessageService, FirebaseService],
})
export class MessageModule {}
