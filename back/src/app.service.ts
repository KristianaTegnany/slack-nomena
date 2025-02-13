import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  sendANumber(test: number): string {
    return `${test} test`;
  }
}
