

import { CreateSubCategoryInput } from "@ts-types/generated";
import Base from "./base";

class SubCategory extends Base<any, any> {

    getAllSubCategory = async (url: string) => {
        return this.all(url)
    }
    createSubCateorgy = async (url: string, variables: CreateSubCategoryInput) => {
        return this.create(url, variables)
    }

    // editSubCategories = async (url: string, variables: EditSubCategory) => {
    //     return this.http<EditSubCategory>(url, 'patch', variables)
    // }
    // deleteSubCategory = async (url: string) => {
    //     return this.delete(url);
    // }

}

export default new SubCategory()


