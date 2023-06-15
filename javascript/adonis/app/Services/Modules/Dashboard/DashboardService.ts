import User from "App/Models/User";
import Role from "App/Models/Role";

export default class DashboardService {

    async index() {

        const users = await User.all();
        const roles = await Role.query().preload('users');

        return {
            users: {
                created: users.length,
                verified: users.filter((user) => user.active).length,
                deleted: users.filter((user) => user.deletedAt != null).length,
            },
            roles: {
                created: roles.length,
                used: roles.filter((role) => role.users.length > 0).length,
                deleted: roles.filter((role) => role.deletedAt != null).length,
            },
        };

    }

}