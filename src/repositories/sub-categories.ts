import { CreateSubCategory, EditSubCategory } from "@ts-types/generated";
import Base from "./base";

class SubCategories extends Base<CreateSubCategory, EditSubCategory>{

    createSubCategories = async (url: string, variables: CreateSubCategory) => {
        return this.create(url, variables)
    }
    editSubCategories = async (url: string, variables: EditSubCategory) => {
        return this.http<EditSubCategory>(url, 'patch', variables)
    }
    deleteSubCategory = async (url: string) => {
        return this.delete(url);
    }
    getAllSubCategoriesByShop = async (url: string) => {
        return this.all(url)
    }

}

export default new SubCategories()
