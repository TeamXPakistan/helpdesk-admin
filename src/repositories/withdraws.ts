import { ExcelExport, WithdrawRequest } from "@ts-types/generated";
import Base from "./base";

class Withdraws extends Base<any, any>{

    getAllMerchantWithdraws = async (url: string) => {
        return this.all(url)
    }

    getSingleUser = async (url: string) => {
        return this.find(url)
    }

    getBankDetails = async (url: string) => {
        return this.all(url)
    }

    createWithdrawRequest = async (url: string, variables: WithdrawRequest) => {
        return this.http<WithdrawRequest>(url, 'post', variables)
    }

    processWithdrawRequest = async (url: string, variables: WithdrawRequest) => {
        return this.http<WithdrawRequest>(url, 'post', variables)
    }

    getAllEarnings = async (url: string) => {
        return this.all(url)
    }

    exportExcel = async (url: string, variables: ExcelExport) => {
        return this.http<ExcelExport>(url, 'post', variables, { responseType: "blob" })
    }

}

export default new Withdraws()
