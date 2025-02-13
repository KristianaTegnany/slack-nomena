import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { WorkspacesModule } from './modules/workspaces/workspaces.module';
import { ChannelsModule } from './modules/channels/channels.module';
import { FirebaseService } from './firebase/firebase.service';
import { InvitationModule } from './modules/invitation/invitation.module';
import { MessageModule } from './modules/message/message.module';
import { ActivitiesModule } from './modules/activities/activities.module';

@Module({
  imports: [
    ConfigModule.forRoot({ cache: false }),
    AuthModule,
    WorkspacesModule,
    ChannelsModule,
    InvitationModule,
    MessageModule,
    ActivitiesModule,
  ],
  controllers: [AppController],
  providers: [AppService, FirebaseService],
  exports: [FirebaseService],
})
export class AppModule {}
