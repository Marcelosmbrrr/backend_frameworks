import { Injectable, Req } from '@nestjs/common';

@Injectable()
export class AuthService {
    signin(@Req() request: Request) {
        return 'This action adds a new role';
    }
}
