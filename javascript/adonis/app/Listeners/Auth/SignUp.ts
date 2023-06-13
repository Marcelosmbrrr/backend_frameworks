import type { EventsList } from '@ioc:Adonis/Core/Event'

export default class SignUp {
    public async onSignIn(user: EventsList['signUp']) {
        // send email to user
    }
}
