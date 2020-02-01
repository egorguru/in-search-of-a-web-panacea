import { Injectable } from '@nestjs/common';
import { TinyEntity, LargeEntity, TinyEntityWithId } from './message.interface';

@Injectable()
export class AppService {
  getTinyJsonEntity(): TinyEntity {
    return { message: 'Hello There' };
  }

  getLargeJsonEntity(): LargeEntity {
    return {
      id: 123,
      message: 'Hello There',
      entity: {
        message: 'Hello There Again'
      },
      extra: [
        'And',
        'Again'
      ]
    };
  }

  getPlainText(): string {
    return 'Hello There';
  }

  getTinyJsonEntityById(id: number): TinyEntityWithId {
    return {
      id,
      message: 'Hello There'
    };
  }
}
