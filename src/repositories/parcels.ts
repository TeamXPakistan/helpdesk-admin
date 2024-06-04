import Base from "./base";

class Parcels extends Base<any, any>{

    getAllParcels = async (url: string) => {
        return this.all(url)
    }
    geSingleParcel = async (url: string) => {
        return this.find(url)
    }
}

export default new Parcels()
