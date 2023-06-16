/**
 * Contract source: https://git.io/Jte3T
 *
 * Feel free to let us know via PR, if you find something broken in this config
 * file.
 */

import Bouncer from '@ioc:Adonis/Addons/Bouncer'

/*
|--------------------------------------------------------------------------
| Bouncer Actions
|--------------------------------------------------------------------------
|
| Actions allows you to separate your application business logic from the
| authorization logic. Feel free to make use of policies when you find
| yourself creating too many actions
|
| You can define an action using the `.define` method on the Bouncer object
| as shown in the following example
|
| ```
| 	Bouncer.define('deletePost', (user: User, post: Post) => {
|			return post.user_id === user.id
| 	})
| ```
|
|****************************************************************
| NOTE: Always export the "actions" const from this file
|****************************************************************
*/

import User from 'App/Models/User';
import Role from 'App/Models/Role';

export const { actions } = Bouncer
    .define('users:read', async (user: User) => {
        const role = await Role.query().where('id', user.id).preload('modules').first();
        return Boolean(role.modules[0].$extras.pivot_read);
    })
    .define('users:write', async (user: User) => {
        const role = await Role.query().where('id', user.id).preload('modules').first();
        return Boolean(role.modules[0].$extras.pivot_write);
    })
    .define('roles:read', async (user: User) => {
        const role = await Role.query().where('id', user.id).preload('modules').first();
        return Boolean(role.modules[1].$extras.pivot_read);
    })
    .define('roles:write', async (user: User) => {
        const role = await Role.query().where('id', user.id).preload('modules').first();
        return Boolean(role.modules[1].$extras.pivot_write);
    })

/*
|--------------------------------------------------------------------------
| Bouncer Policies
|--------------------------------------------------------------------------
|
| Policies are self contained actions for a given resource. For example: You
| can create a policy for a "User" resource, one policy for a "Post" resource
| and so on.
|
| The "registerPolicies" accepts a unique policy name and a function to lazy
| import the policy
|
| ```
| 	Bouncer.registerPolicies({
|			UserPolicy: () => import('App/Policies/User'),
| 		PostPolicy: () => import('App/Policies/Post')
| 	})
| ```
|
|****************************************************************
| NOTE: Always export the "policies" const from this file
|****************************************************************
*/
export const { policies } = Bouncer.registerPolicies({})
