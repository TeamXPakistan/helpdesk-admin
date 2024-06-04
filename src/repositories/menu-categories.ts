import { CreateMenuCategory, UpdateMenuCategory } from "@ts-types/generated";
import Base from "./base";

class MenuCategories extends Base<CreateMenuCategory, UpdateMenuCategory>{
    createMenuCategory = async (url: string, variables: CreateMenuCategory) => {
        return this.create(url, variables)
    }
    deleteMenuCategory = async (url: string) => {
        return this.delete(url);
    }
    updateMenuCategory = async (url: string, variables: UpdateMenuCategory) => {
        return this.http<UpdateMenuCategory>(url, 'patch', variables)
    }
    getAllMenuCategories = async (url: string) => {
        return this.all(url)
    }
    getSingleMenuCategory = async (url: string) => {
        return this.find(url);
    }
}

export default new MenuCategories()
