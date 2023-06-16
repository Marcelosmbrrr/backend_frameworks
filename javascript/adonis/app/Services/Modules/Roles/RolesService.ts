import Role from "App/Models/Role";

export default class RolesService {

    async index(limit: number, offset: number, search: string) {
        const roles = await Role.query().preload('modules').offset(offset).limit(limit);

        if (!roles) {
            throw new Error('Roles not found.')
        }

        const payload = roles.map((role) => {

            let actual_role = {
                id: role.id,
                name: role.name,
                created_at: role.created_at,
                updated_at: role.updated_at,
            };

            actual_role['modules'] = role.modules.map((module) => {
                return {
                    module_id: module.$extras.pivot_module_id,
                    module_name: module.name,
                    read: module.$extras.pivot_read,
                    write: module.$extras.pivot_write
                }

            });

            return actual_role;
        });

        return payload;
    }

    async store(data) {
        const { name, modules } = data;

        const role = await Role.create({
            name
        });

        // Atach
    }

    async update(data, role_id: number) {
        const { name, modules } = data;

        await Role.query().where('id', role_id).update({
            name
        });

        // Detach
        // Atach
    }

    async destroy(role_id: number) {
        await Role.query().where('id', role_id).update({
            deleted_at: new Date()
        });
    }
}