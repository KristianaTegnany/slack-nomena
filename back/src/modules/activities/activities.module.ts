import { Module } from '@nestjs/common';
import { ActivitiesService } from './activities.service';
import { ActivitiesController } from './activities.controller';
import { FirebaseService } from 'src/firebase/firebase.service';

@Module({
  controllers: [ActivitiesController],
  providers: [ActivitiesService, FirebaseService],
})
export class ActivitiesModule {}
