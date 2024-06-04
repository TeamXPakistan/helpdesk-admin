import { CreateFood, CreateProduct, UpdateFood, UpdateProduct } from "@ts-types/generated";
import Base from "./base";

class Products extends Base<CreateProduct | CreateFood, UpdateProduct | UpdateFood> {
    getAllProducts = async (url: string) => {
        return this.all(url)
    }
    getSingleProduct = async (url: string) => {
        return this.all(url)
    }
    getPopularProducts = async (url: string) => {
        return this.all(url)
    }
    createProduct = async (url: string, variables: CreateProduct) => {
        return this.create(url, variables)
    }
    updateProduct = async (url: string, variables: UpdateProduct) => {
        return this.http<UpdateProduct>(url, 'patch', variables)
    }
    createFood = async (url: string, variables: CreateFood) => {
        return this.create(url, variables)
    }
    updateFood = async (url: string, variables: UpdateFood) => {
        return this.http<UpdateFood>(url, 'patch', variables)
    }
}

export default new Products();