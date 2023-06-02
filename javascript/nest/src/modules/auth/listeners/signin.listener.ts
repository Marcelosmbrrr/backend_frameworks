import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
// Custom
import { SignInEvent } from '../events/signin.event';

@Injectable()
export class SignInListener {
  @OnEvent('auth.signin')
  handleSignInEvent(event: SignInEvent) {
    console.log(event);
  }
}
