/*
|--------------------------------------------------------------------------
| Preloaded File
|--------------------------------------------------------------------------
|
| Any code written inside this file will be executed during the application
| boot.
|
*/

import Event from '@ioc:Adonis/Core/Event'

Event.on('signIn', (user) => {
    console.log(user)
});

Event.on('signUp', (user) => {
    console.log(user)
});

Event.on('new:user', (user) => {
    console.log(user)
});

Event.on('update:user', (user) => {
    console.log(user)
});

Event.on('delete:user', (user) => {
    console.log(user)
});


