import { CreateFaqEntryInput, FaqUpdate } from "@ts-types/generated";
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
    updateFaq = async (url: string, data: FaqUpdate) => {
        return this.update(url, data);
    }
}

export default new FaqEntries()