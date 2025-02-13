import { Module } from '@nestjs/common';
import { ChannelsService } from './channels.service';
import { ChannelsController } from './channels.controller';
import { FirebaseService } from 'src/firebase/firebase.service';

@Module({
  controllers: [ChannelsController],
  providers: [ChannelsService, FirebaseService],
})
export class ChannelsModule {}
