import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
// Custom
import AuthService from 'App/Services/Auth/AuthService';
import SignInValidator from 'App/Validators/Authentication/SignInValidator';
import SignUpValidator from 'App/Validators/Authentication/SignUpValidator';

export default class AuthController {

    // Dependency Injection - injected by IoC container
    constructor(private readonly authService: AuthService) { }

    async signIn({ request, response, auth }: HttpContextContract) {
        const { email, password } = await request.validate(SignInValidator);

        const data = await this.authService.signIn({ email, password, auth });

        response.status(200).send({
            message: 'Login successful!',
            ...data
        });
    }

    async refreshAndVerifyAuthentication({ response, auth }: HttpContextContract) {

        const data = await this.authService.refreshAndVerifyAuthentication(auth);

        response.status(200).send({
            message: 'User data has been loaded.',
            ...data
        });
    }

    async signUp({ request, response }: HttpContextContract) {
        const payload = await request.validate(SignUpValidator);

        await this.authService.signUp(payload);

        response.status(201).send({
            message: 'Registration successful!'
        });
    }

    async signOut({ response, auth }: HttpContextContract) {
        await auth.use('api').revoke()

        response.status(200).send({
            message: 'User has been logged out.'
        });
    }
}
