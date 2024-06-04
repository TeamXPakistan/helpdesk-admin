import Base from "./base";

class Users extends Base<any, any>{

    getAllUsers = async (url: string) => {
        return this.all(url)
    }
    getSingleUser = async (url: string) => {
        return this.find(url)
    }
}

export default new Users()
