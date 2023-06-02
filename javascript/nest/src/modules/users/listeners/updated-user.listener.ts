import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
// Custom
import { UpdatedUserEvent } from '../events/updated-user.event';

@Injectable()
export class UpdatedUserListener {
  @OnEvent('user.updated')
  handleUpdatedUserEvent(event: UpdatedUserEvent) {
    console.log(event);
  }
}
