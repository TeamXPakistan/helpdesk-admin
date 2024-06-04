import Base from "./base";

class Analytics extends Base<any, any> {
    driverAnalytics = async (url: string) => {
        return this.find(url)
    }
    vendorAnalytics = async (url: string) => {
        return this.find(url)
    }
    adminAnalytics = async (url: string) => {
        return this.find(url)
    }
    userAnalytics = async (url: string) => {
        return this.find(url)
    }
}

export default new Analytics();