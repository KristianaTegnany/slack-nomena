import { Module } from '@nestjs/common';
import { WorkspacesService } from './workspaces.service';
import { WorkspacesController } from './workspaces.controller';
import { FirebaseService } from 'src/firebase/firebase.service';

@Module({
  controllers: [WorkspacesController],
  providers: [WorkspacesService, FirebaseService],
})
export class WorkspacesModule {}
