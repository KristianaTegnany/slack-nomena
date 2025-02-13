import { Injectable } from '@nestjs/common';
import { FirebaseService } from 'src/firebase/firebase.service';
import { v4 } from 'uuid';

@Injectable()
export class MessageService {
  constructor(private readonly firebaseService: FirebaseService) { }

  //message sender for channels
  async sendChannelMessage(
    channelId: string,
    senderId: string,
    content: string,
  ) {
    const id = v4();
    const messageRef = this.firebaseService
      .getCollection('channel_messages')
      .doc(id);
    const messageData = {
      id,
      channelId,
      senderId,
      content,
      sentAt: new Date().toISOString(),
    };

    await messageRef.set(messageData);
    return { message: 'Message sent', messageData };
  }

  //message getter for channel
  async getChannelMessages(channelId: string) {
    const messagesSnapshot = await this.firebaseService
      .getCollection('channel_messages')
      .where('channelId', '==', channelId)
      // .orderBy('sentAt', 'asc') //TODO: ça donne encore un erreur d'indexation Firebase à resoudre
      .get();

    const messages = messagesSnapshot.docs.map((doc) => doc.data());
    return { messages };
  }

  //message senter for private
  async sendPrivateMessage(
    senderId: string,
    receiverId: string,
    content: string,
  ) {
    const id = v4();
    const messageRef = this.firebaseService
      .getCollection('private_messages')
      .doc(id);
    const messageData = {
      id,
      senderId,
      receiverId,
      content,
      sentAt: new Date().toISOString(),
    };

    await messageRef.set(messageData);
    return { message: 'Private messag sent', messageData };
  }

  async getPrivateMessages(userId: string, withUserId?: string) {
    let query = this.firebaseService
      .getCollection('private_messages')
      .where('receiverId', '==', userId);

    if (withUserId) {
      query = query.where('senderId', '==', withUserId);
    }

    // const messagesSnapshot = await query.orderBy('sentAt', 'asc').get();
    const messagesSnapshot = await query.get();
    const messages = messagesSnapshot.docs.map((doc) => doc.data());
    return { messages };
  }

  //message getter for private message
  async getPrivateConversationUsers(userId: string) {
    const messagesSnapshot = await this.firebaseService
      .getCollection('private_messages')
      .where('receiverId', '==', userId)
      .get();

    const senders = new Set<string>();
    messagesSnapshot.forEach((doc) => {
      const message = doc.data();
      senders.add(message.senderId);
    });

    return { users: Array.from(senders) };
  }
}
