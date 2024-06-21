import { CreateFaqEntryInput } from "@ts-types/generated";
import Base from "./base";

class FaqEntries extends Base<any, any> {

    getAllFaqEntries = async (url: string) => {
        return this.all(url)
    }
    getAllFaqEntry = async (url: string) => {
        return this.find(url)
    }
    createFaq= async (url: string, variables: CreateFaqEntryInput) => {
        return this.create(url, variables)
    }
    deleteFaq = async (url: string) => {
        return this.delete(url);
    }
}

export default new FaqEntries()