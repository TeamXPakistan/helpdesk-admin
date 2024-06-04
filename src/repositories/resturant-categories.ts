import { CreateResturantCategory, UpdateResturantCategory } from "@ts-types/generated";
import Base from "./base";

class ResturantCategories extends Base<CreateResturantCategory, UpdateResturantCategory>{

    getAllResturantCategories = async (url: string) => {
        return this.all(url)
    }
    getSingleResturantCategory = async (url: string) => {
        return this.find(url);
    }
    createResturantCategory = async (url: string, variables: CreateResturantCategory) => {
        return this.create(url, variables)
    }
    deleteResturantCategory = async (url: string) => {
        return this.delete(url);
    }
    updateResturantCategory = async (url: string, variables: UpdateResturantCategory) => {
        return this.http<UpdateResturantCategory>(url, 'patch', variables)
    }
}

export default new ResturantCategories()
