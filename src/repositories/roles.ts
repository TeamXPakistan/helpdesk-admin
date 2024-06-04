import { CreateRoleInput, UpdateRoleInput } from "@ts-types/generated";
import Base from "./base";

class Roles extends Base<CreateRoleInput, UpdateRoleInput>{

    getAllRoles = async (url: string) => {
        return this.all(url)
    }
    getSingleRole = async (url: string) => {
        return this.find(url)
    }
    createRole = async (url: string, variables: CreateRoleInput) => {
        return this.create(url, variables)
    }
    updateRole = async (url: string, variables: UpdateRoleInput) => {
        return this.update(url, variables)
    }
    deleteRole = async (url: string) => {
        return this.delete(url);
    }
}

export default new Roles()
