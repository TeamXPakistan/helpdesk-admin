import settings from "@repositories/settings"
import { useQuery } from "@tanstack/react-query"
import { Settings } from "@ts-types/generated"
import { API_ENDPOINTS } from "@utils/api/endpoints"

const fetchSettings = async () => {
    const url = `${API_ENDPOINTS.SETTINGS}`
    const data = await settings.getSettings(url)
    return { settings: data?.data };
}

const useSettingsQuery = () => {
    return useQuery<{ settings: Settings }, Error>(
        [API_ENDPOINTS.SETTINGS],
        fetchSettings,
        {
            keepPreviousData: true,
        }
    )
}

export { useSettingsQuery }
