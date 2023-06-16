import User from "App/Models/User";

export default class UsersService {

    async index(limit: number, offset: number, search: string) {

        const users = await User.query().preload('role').offset(offset).limit(limit);

        if (!users) {
            throw new Error('Users not found.')
        }

        const payload = users.map((user) => {
            return {
                id: user.id,
                email: user.email,
                name: user.name,
                active: user.active,
                image: user.image,
                created_at: user.created_at,
                updated_at: user.updated_at,
                role: {
                    id: user.role.id,
                    name: user.role.name
                }
            }
        });

        return payload;
    }

    async store(data) {
        const { name, email, role_id } = data;
        await User.create({
            name,
            email,
            role_id
        });
    }

    async update(data, user_id: number) {
        const { name, email, role_id } = data;
        await User.query().where('id', user_id).update({
            name,
            email,
            role_id
        });
    }

    async destroy(user_id: number) {
        await User.query().where('id', user_id).update({
            deleted_at: new Date()
        });
    }
}