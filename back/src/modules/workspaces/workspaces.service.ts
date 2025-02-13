import { Injectable } from '@nestjs/common';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { UpdateWorkspaceDto } from './dto/update-workspace.dto';
import { FirebaseService } from 'src/firebase/firebase.service';
import { v4 } from 'uuid';

@Injectable()
export class WorkspacesService {
  private db: FirebaseFirestore.Firestore;
  constructor(private readonly firebaseService: FirebaseService) {
    this.db = this.firebaseService.getFirestore();
  }

  async create(createWorkspaceDto: CreateWorkspaceDto) {
    const id = v4();
    const docref = this.db.collection('workspaces').doc(id);
    const newWorkspace = { id, ...createWorkspaceDto };
    await docref.set(newWorkspace);
    return newWorkspace;
  }

  async findByUserId(userid: string) {
    const snapshot = await this.db
      .collection('workspaces')
      .where('userid', '==', userid)
      .get();

    return snapshot.docs.map((doc) => doc.data());
  }

  async findWorkspaceById(workspaceId: string) {
    const docRef = this.db.collection("workspaces").doc(workspaceId);
    const docSnap = await docRef.get();
  
    if (!docSnap.exists) {
      throw new Error("Workspace not found");
    }
  
    return docSnap.data();
  }

  async update(updateWorkspaceDto: UpdateWorkspaceDto) {
    const { id } = updateWorkspaceDto;
    const docRef = this.db.collection('workspaces').doc(id!);
    const doc = await docRef.get();
    if (!doc.exists) {
      throw new Error('Workspace non trouvé');
    }
    await docRef.update(updateWorkspaceDto as any);
    return { id, ...updateWorkspaceDto };
  }

  async remove(id: string) {
    await this.db.collection('workspaces').doc(id).delete();
    return { id, message: 'Workspace deleted successfully' };
  }
}
