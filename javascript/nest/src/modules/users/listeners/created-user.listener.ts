import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
// Custom
import { CreatedUserEvent } from '../events/created-user.event';

@Injectable()
export class CreatedUserListener {
  @OnEvent('user.created')
  handleCreatedUserEvent(event: CreatedUserEvent) {
    console.log(event);
  }
}
