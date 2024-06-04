import Base from "./base";

class Notifications extends Base<any, any>{

    getNotifications = async (url: string) => {
        return this.all(url)
    }
    readNotification = async (url: string) => {
        return this.http<unknown>(url, 'patch', {})
    }
    readAllNotifications = async (url: string) => {
        return this.http<unknown>(url, 'patch', {})
    }
}

export default new Notifications()
