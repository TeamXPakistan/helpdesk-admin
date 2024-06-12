import Base from "./base";

class Feedback extends Base<any, any> {

    getAllFeedback = async (url: string) => {
        return this.all(url)
    }
}

export default new Feedback()
