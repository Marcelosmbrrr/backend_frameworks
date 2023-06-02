import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
// Custom
import { DeletedUserEvent } from '../events/deleted-user.event';

@Injectable()
export class DeletedUserListener {
  @OnEvent('user.deleted')
  handleDeletedUserEvent(event: DeletedUserEvent) {
    console.log(event);
  }
}
