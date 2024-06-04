import { CreateShopCategory, UpdateShopCategory } from "@ts-types/generated";
import Base from "./base";

class ShopCategories extends Base<CreateShopCategory, UpdateShopCategory>{
    createShopCategories = async (url: string, variables: CreateShopCategory) => {
        return this.create(url, variables)
    }
    deleteShopCategory = async (url: string) => {
        return this.delete(url);
    }
    updateShopCategory = async (url: string, variables: UpdateShopCategory) => {
        return this.http<UpdateShopCategory>(url, 'patch', variables)
    }
    getAllShopCategories = async (url: string) => {
        return this.all(url)
    }
    getSingleShopCategory = async (url: string) => {
        return this.find(url);
    }
}

export default new ShopCategories()
