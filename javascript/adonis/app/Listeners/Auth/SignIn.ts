import type { EventsList } from '@ioc:Adonis/Core/Event'

export default class SignIn {
    public async onSignIn(user: EventsList['signIn']) {
        // send email to user
    }
}
