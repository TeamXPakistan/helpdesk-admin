import Base from "./base";

class FaqEntries extends Base<any, any> {

    getAllFaqEntries = async (url: string) => {
        return this.all(url)
    }
    getAllFaqEntry = async (url: string) => {
        return this.find(url)
    }
}

export default new FaqEntries()