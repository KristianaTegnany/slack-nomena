/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { FirebaseService } from 'src/firebase/firebase.service';
import { v4 } from 'uuid';

@Injectable()
export class InvitationService {
  constructor(private readonly firebaseService: FirebaseService) {}

  async sendInvitation(
    workspaceId: string,
    inviterId: string,
    inviteeEmail: string,
  ) {
    const id = v4();
    const invitationRef = this.firebaseService
      .getCollection('invitations')
      .doc(id);
    const invitationData = {
      id,
      workspaceId,
      inviterId,
      inviteeEmail,
      status: 'pending',
    };

    await invitationRef.set(invitationData);
    return { message: 'Invitation sent', invitationId: invitationRef.id };
  }

  async acceptInvitation(invitationId: string, userId: string) {
    const invitationRef = this.firebaseService
      .getCollection('invitations')
      .doc(invitationId);
    const invitationDoc = await invitationRef.get();

    if (!invitationDoc.exists) {
      throw new Error('Invitation does not exist');
    }

    const invitation = invitationDoc.data();
    if (invitation?.status !== 'pending') {
      throw new Error('Invitation already accepted');
    }

    await invitationRef.update({ status: 'accepted' });

    const workspaceRef = this.firebaseService
      .getCollection('workspaces')
      .doc(invitation.workspaceId);
    await workspaceRef.update({
      members: this.firebaseService.FieldValue.arrayUnion(userId),
    });

    return {
      message: 'Invitation accepted',
      workspaceId: invitation.workspaceId,
    };
  }
}
