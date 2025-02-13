import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { FirebaseService } from 'src/firebase/firebase.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly firebaseService: FirebaseService,
  ) {}

  @Post('register')
  async registerUser(@Body() userData: { email: string; password: string }) {
    const auth = this.firebaseService.getAuth();
    const userRecord = await auth.createUser({
      email: userData.email,
      password: userData.password,
    });
    return {
      message: 'User added successfuly',
      user: { uid: userRecord.uid, email: userRecord.email },
    };
  }

  @Post('signin')
  async signIn(@Body('token') token: string) {
    return this.authService.signInWithProvider(token);
  }

  @Post('signin/email')
  async signInEmailPass(@Body('token') token: string) {
    return this.authService.signInEmailPass(token);
  }

  @Get(':uid')
  async getUser(@Param('uid') uid: string) {
    return this.authService.getUser(uid)
  }
}
