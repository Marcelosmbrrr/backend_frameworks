import User from "App/Models/User";
import Hash from '@ioc:Adonis/Core/Hash';
import { AuthContract } from "@ioc:Adonis/Addons/Auth";

interface ISignIn {
    email: string;
    password: string;
    auth: AuthContract
}

interface ISignUp {
    name: string;
    email: string;
    password: string;
}

export default class AuthService {

    async signIn({ email, password, auth }: ISignIn) {

        const user = await User.findBy('email', email);

        if (!user) {
            throw new Error('Invalid credentials.');
        }

        const token = await auth.use('api').attempt(email, password, {
            expiresIn: '3 mins'
        })

        if (!token) {
            throw new Error('Invalid credentials.');
        }

        // Event to send email
        // Event.emit('signIn', {name: '', email: '', datetime: ''})

        const payload = {
            user: {
                id: user.id,
                role: {
                    id: user.roleId,
                    privileges: user.role.modules,
                },
            },
            token: token
        };

        return payload;
    }

    async signUp({ name, email, password }: ISignUp) {

        const user = await User.create({
            name,
            email,
            password
        });

        if (!user) {
            throw new Error("Registration failed.");
        }

        // Event to send email
        // Event.emit('signUp', {name: '', email: '', datetime: ''})
    }

    async refreshAndVerifyAuthentication(auth: AuthContract) {

        await auth.use('api').authenticate();

        const user = auth.use('api').user;

        const payload = {
            user: {
                id: user.id,
                role: {
                    id: user.roleId,
                    privileges: user.role.modules,
                },
            }
        };

        return payload;

    }
}