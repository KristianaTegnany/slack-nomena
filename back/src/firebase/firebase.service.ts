/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import serviceAccount from './firebase-service-account';

@Injectable()
export class FirebaseService {
  private firebaseApp: admin.app.App;
  private database: admin.database.Database;
  private auth: admin.auth.Auth;
  private firestoreDB: FirebaseFirestore.Firestore;

  constructor() {
    if (!admin.apps.length) {
      this.firebaseApp = admin.initializeApp({
        credential: admin.credential.cert(
          serviceAccount as admin.ServiceAccount,
        ),
        databaseURL: 'https://slack-1975b-default-rtdb.firebaseio.com',
      });
    } else {
      this.firebaseApp = admin.app();
    }
    this.database = this.firebaseApp.database();
    this.auth = admin.auth();
    this.firestoreDB = admin.firestore();
  }

  async verifyToken(token: string) {
    try {
      return await this.auth.verifyIdToken(token);
    } catch (error) {
      throw new Error('Token invalide');
    }
  }

  getDatabase(): admin.database.Database {
    if (!this.database) {
      throw new Error('Firebase Realtime Database is not initialized.');
    }
    return this.database;
  }

  getFirestore(): admin.firestore.Firestore {
    if (!this.firebaseApp) {
      throw new Error('Firebase app is not initialized.');
    }
    return this.firebaseApp.firestore();
  }

  getAuth(): admin.auth.Auth {
    if (!this.firebaseApp) {
      throw new Error('Firebase app is not initialized.');
    }
    return this.firebaseApp.auth();
  }

  getStorage(): admin.storage.Storage {
    if (!this.firebaseApp) {
      throw new Error('Firebase app is not initialized.');
    }
    return this.firebaseApp.storage();
  }

  getCollection(collection: string) {
    return this.firestoreDB.collection(collection);
  }

  get FieldValue() {
    return admin.firestore.FieldValue;
  }
}
