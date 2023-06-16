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

        const user = await User.query().where('email', email).preload('role', (roleQuery) => {
            roleQuery.preload('modules');
        }).first();

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

        const modules_access = user.role.modules.map((module) => {
            return {
                module_id: module.$extras.pivot_module_id,
                module_name: module.name,
                read: module.$extras.pivot_read,
                write: module.$extras.pivot_write
            }
        })

        const payload = {
            user: {
                id: user.id,
                role: {
                    id: user.role_id,
                    modules: modules_access,
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
            password: await Hash.make(password)
        });

        if (!user) {
            throw new Error("Registration failed.");
        }

        // Event to send email
        // Event.emit('signUp', {name: '', email: '', datetime: ''})
    }

    async refreshAndVerifyAuthentication(auth: AuthContract) {

        await auth.use('api').authenticate();

        const userId = auth.use('api').user?.id;

        const user = await User.query().where('id', userId).preload('role', (roleQuery) => {
            roleQuery.preload('modules');
        }).first();

        const modules_access = user.role.modules.map((module) => {
            return {
                module_id: module.$extras.pivot_module_id,
                module_name: module.name,
                read: module.$extras.pivot_read,
                write: module.$extras.pivot_write
            }
        })

        const payload = {
            user: {
                id: user.id,
                role: {
                    id: user.role_id,
                    modules: modules_access,
                },
            }
        };

        return payload;

    }
}