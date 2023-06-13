import type { EventsList } from '@ioc:Adonis/Core/Event'

export default class User {
    public async onNewUser(user: EventsList['new:user']) {
        // send email to the new user
    }

    public async onUpdateUser(user: EventsList['update:user']) {
        // send email to user
    }
}
