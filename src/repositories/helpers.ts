import Base from "./base";

class Helpers extends Base<any, any> {

    getAllHelpers = async (url: string) => {
        return this.all(url)
    }
    getSingleUser = async (url: string) => {
        return this.find(url)
    }
}

export default new Helpers()
