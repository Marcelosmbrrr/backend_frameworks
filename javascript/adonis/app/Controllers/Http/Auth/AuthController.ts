import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
// Custom
import SignInValidator from 'App/Validators/Authentication/SignInValidator';
import SignUpValidator from 'App/Validators/Authentication/SignUpValidator';

export default class AuthController {

    async signIn({ request, response }: HttpContextContract) {
        // const payload = await request.validate(SignInValidator)
        // response.cookie('user_id', 1)
        return 'ok';
    }

    async refresh({ request, response }: HttpContextContract) {
        // 
    }

    async signUp({ request, response }: HttpContextContract) {
        // // const payload = await request.validate(SignUpValidator)
    }

    async signOut({ request, response }: HttpContextContract) {
        // auth.use('api').revoke()
    }
}
