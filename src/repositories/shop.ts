import { ChangeShopStatus, CreateShop, UpdateShop } from "@ts-types/generated";
import Base from "./base";

class Shop extends Base<CreateShop, UpdateShop>{

    getAllShops = async (url: string) => {
        return this.all(url)
    }
    getSingleShop = async (url: string) => {
        return this.find(url)
    }
    getAllShopCategories = async (url: string) => {
        return this.all(url)
    }
    createShop = async (url: string, variables: CreateShop) => {
        return this.create(url, variables)
    }
    updateShop = async (url: string, variables: UpdateShop) => {
        return this.update(url, variables)
    }
    changeShopStatus = async (url: string, variables: ChangeShopStatus) => {
        return this.http<ChangeShopStatus>(url, "post", variables)
    }
    updateShopStatus = async (url: string, variables: ChangeShopStatus) => {
        return this.http<ChangeShopStatus>(url, "put", variables)
    }
}

export default new Shop()
