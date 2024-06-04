import Base from "./base";

class Drivers extends Base<any, any> {
    getAllDrivers = async (url: string) => {
        return this.all(url)
    }
    getCurrentOrder = async (url: string) => {
        return this.find(url)
    }
    getCurrentParcel = async (url: string) => {
        return this.find(url)
    }
}

export default new Drivers();