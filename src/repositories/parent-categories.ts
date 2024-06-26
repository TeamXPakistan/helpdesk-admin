import { CreateParentCategoryInput } from "@ts-types/generated";
import Base from "./base";

class ParentCategory extends Base<any, any> {

    getAllParentCategory = async (url: string) => {
        return this.all(url)
    }
    createParentCateorgy = async (url: string, variables: CreateParentCategoryInput) => {
        return this.create(url, variables)
    }
}

export default new ParentCategory()
