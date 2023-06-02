import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
// Custom
import { SignUpEvent } from '../events/signup.event';

@Injectable()
export class SignUpListener {
  @OnEvent('auth.signup')
  handleSignUpEvent(event: SignUpEvent) {
    console.log(event);
  }
}
