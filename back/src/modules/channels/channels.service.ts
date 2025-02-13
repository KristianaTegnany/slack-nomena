import { Injectable } from '@nestjs/common';
import { FirebaseService } from 'src/firebase/firebase.service';
import { v4 } from 'uuid';
@Injectable()
export class ChannelsService {
  private db: FirebaseFirestore.Firestore;
  constructor(private readonly firebaseService: FirebaseService) {
    this.db = this.firebaseService.getFirestore();
  }

  async create(workspaceId: string, name: string, createdBy: string) {
    const id = v4();
    const channelRef = this.firebaseService.getCollection('channels').doc(id);
    const channelData = {
      id,
      workspaceId,
      name,
      createdBy,
      createdAt: new Date().toISOString(),
    };

    await channelRef.set(channelData);
    return { message: 'Channel created', channel: channelData };
  }

  async findChannelById(channelId: string) {
    const docRef = this.db.collection("channels").doc(channelId)
    const docSnap = await docRef.get()
    if(!docSnap.exists) {
      return new Error("Channel not found");
    }
    return docSnap.data()
  }

  async getChannelsByWorkspace(workspaceId: string) {
    const channelsSnapshot = await this.firebaseService
      .getCollection('channels')
      .where('workspaceId', '==', workspaceId)
      .get();

    const channels = channelsSnapshot.docs.map((doc) => doc.data());
    return { channels };
  }
}
