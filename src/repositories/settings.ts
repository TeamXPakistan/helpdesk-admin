import { Settings } from "@ts-types/generated";
import Base from "./base";

class SettingsRepo extends Base<any, any>{

    getSettings = async (url: string) => {
        return this.all(url)
    }
    updateSettings = async (url: string, variables: Settings) => {
        return this.http<Settings>(url, 'patch', variables)
    }
}

export default new SettingsRepo()
