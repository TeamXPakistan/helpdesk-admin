import { CreateFaqEntryInput } from "@ts-types/generated";
import Base from "./base";

class Tutorial extends Base<any, any> {

    getAllTutorials = async (url: string) => {
        return this.all(url)
    }
    getAllTutorial = async (url: string) => {
        return this.find(url)
    }
    createTutorial= async (url: string, variables: CreateFaqEntryInput) => {
        return this.create(url, variables)
    }
    deleteTutorial = async (url: string) => {
        return this.delete(url);
    }
}

export default new Tutorial()