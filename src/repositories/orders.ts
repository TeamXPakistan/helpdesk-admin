import { ChangeOrderStatus } from "@ts-types/generated";
import Base from "./base";

class Orders extends Base<any, any>{

    getAllOrders = async (url: string) => {
        return this.all(url)
    }
    geSingleOrder = async (url: string) => {
        return this.find(url)
    }
    getUserOrdersForAdmin = async (url: string) => {
        return this.all(url)
    }
    changeOrderStatus = async (url: string, variables: ChangeOrderStatus) => {
        return this.http<ChangeOrderStatus>(url, 'patch', variables)
    }
    canceleOrder = async (url: string) => {
        return this.http<unknown>(url, 'patch', {})
    }

}

export default new Orders()
