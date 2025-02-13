import { Injectable } from '@nestjs/common';
import { FirebaseService } from 'src/firebase/firebase.service';
import { v4 } from 'uuid';
import { CreateActivityDto } from './dto/create-activity.dto';

@Injectable()
export class ActivitiesService {
  constructor(private readonly firebaseService: FirebaseService) {}

  async createActivity(activity: CreateActivityDto) {
    const id = v4();
    const activityRef = this.firebaseService
      .getCollection('workspace_activities')
      .doc(id);
    const activityData = {
      id,
      ...activity,
      createdAt: new Date().toISOString(),
    };

    await activityRef.set(activityData);
    return { message: 'Activity created', activity: activityData };
  }

  async getWorkspaceActivities(workspaceId: string) {
    const activitiesSnapshot = await this.firebaseService
      .getCollection('workspace_activities')
      .where('workspaceId', '==', workspaceId)
      // .orderBy('createdAt', 'desc') // TODO: To resolve
      .limit(20)
      .get();

    const activities = activitiesSnapshot.docs.map((doc) => doc.data());
    return { activities };
  }
}
