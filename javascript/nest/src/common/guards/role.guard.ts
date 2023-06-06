import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

// https://docs.nestjs.com/guards#authorization-guard

@Injectable()
export class RoleGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return this.validateRequest(context);
  }

  validateRequest(context: ExecutionContext) {
    return true;
  }
}
