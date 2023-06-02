import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

// https://docs.nestjs.com/guards#authorization-guard

@Injectable()
export class RolesGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return validateRequest(context);
  }
}

async function validateRequest(context: ExecutionContext) {
  return true;
}
