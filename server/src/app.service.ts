import { Injectable } from '@nestjs/common';
import { Message } from './interfaces/message.interface';

@Injectable()
export class AppService {
  checkHealth(): Message {
    return { message: 'evething is fine!' };
  }
}
