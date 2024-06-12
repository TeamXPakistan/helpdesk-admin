import { CreateAdminStaffInput, UpdateAdminStaffInput } from "@ts-types/generated";
import Base from "./base";

class AdminStaff extends Base<CreateAdminStaffInput, UpdateAdminStaffInput> {

    getAllStaff = async (url: string) => {
        return this.all(url)
    }
    getSingleStaff = async (url: string) => {
        return this.find(url)
    }
    createStaff = async (url: string, variables: CreateAdminStaffInput) => {
        return this.create(url, variables)
    }
    updateStaff = async (url: string, variables: UpdateAdminStaffInput) => {
        return this.http<UpdateAdminStaffInput>(url, "put", variables)
    }
    deleteStaff = async (url: string) => {
        return this.delete(url);
    }

}

export default new AdminStaff()
