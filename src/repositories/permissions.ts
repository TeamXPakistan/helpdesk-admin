import Base from "./base";

class Permissions extends Base<any, any>{

    getAllPermissions = async (url: string) => {
        return this.all(url)
    }
}

export default new Permissions()
