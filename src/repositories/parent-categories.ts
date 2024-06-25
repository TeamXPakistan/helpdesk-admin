import Base from "./base";

class ParentCategory extends Base<any, any> {

    getAllParentCategory = async (url: string) => {
        return this.all(url)
    }
}

export default new ParentCategory()
