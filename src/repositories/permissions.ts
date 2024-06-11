import { PermissionInput } from "@ts-types/generated";
import Base from "./base";

class Permissions extends Base<any, any> {

    getAllPermissions = async (url: string) => {
        return this.all(url)
    }

    createPermission = async (url: string, variables: PermissionInput) => {
        return this.create(url, variables)
    }

    updatePermission = async (url: string, variables: PermissionInput) => {
        return this.update(url, variables)
    }

    getSinglePermission = async (url: string) => {
        return this.find(url)
    }

    deletePermission = async (url: string) => {
        return this.delete(url);
    }
}

export default new Permissions()
