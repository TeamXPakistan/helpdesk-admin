import Base from "./base";

class Reviews extends Base<any, any>{

    getAllShopReviews = async (url: string) => {
        return this.all(url)
    }

}

export default new Reviews()
