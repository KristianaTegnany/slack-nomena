import { Injectable } from '@nestjs/common';
import { FirebaseService } from 'src/firebase/firebase.service';

@Injectable()
export class AuthService {
  constructor(private readonly firebaseService: FirebaseService) {}

  async signInWithProvider(token: string) {
    const decodedToken = await this.firebaseService.verifyToken(token);

    const user = {
      uid: decodedToken.uid,
      email: decodedToken.email,
      name: decodedToken.name || '',
      picture: decodedToken.picture || '',
      provider: decodedToken.firebase.sign_in_provider,
    };

    return { message: 'Sign in successfuly', user };
  }

  async getUser(uid: string) {
    const userRecord = await this.firebaseService.getUserById(uid)
    if(!userRecord) {
      throw new Error("User not found");
    }
    return userRecord
  }

  async signInEmailPass(token: string) {
    const decodedToken = await this.firebaseService.verifyToken(token);
    const user = {
      uid: decodedToken.uid,
      email: decodedToken.email,
      name: decodedToken.name || '',
    };
    return {
      message: 'Sign in successfuly',
      user,
    };
  }
}
