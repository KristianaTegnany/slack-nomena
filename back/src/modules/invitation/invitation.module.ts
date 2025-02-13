import { Module } from '@nestjs/common';
import { InvitationService } from './invitation.service';
import { InvitationController } from './invitation.controller';
import { FirebaseService } from 'src/firebase/firebase.service';

@Module({
  controllers: [InvitationController],
  providers: [InvitationService, FirebaseService],
})
export class InvitationModule {}
