import notifications from "@repositories/notifications"
import { useQuery } from "@tanstack/react-query"
import { GeneralQueryParam, QueryParamsType } from "@ts-types/custom.types"
import { IPaginator, Notification } from "@ts-types/generated"
import { API_ENDPOINTS } from "@utils/api/endpoints"


type QueryParamType = GeneralQueryParam;

const fetchNotifications = async ({ queryKey }: QueryParamsType) => {
    const {
        limit = 20,
        page = 1,
    } = queryKey[1] as QueryParamType;
    const url = `${API_ENDPOINTS.NOTIFICATIONS}?limit=${limit}&page=${page}`
    const { data: { docs, ...rest } } = await notifications.getNotifications(url)
    return { notifications: { data: docs, paginatorInfo: rest } }
}

const useNotificationsQuery = (options: QueryParamType) => {
    return useQuery<{ notifications: IPaginator<Notification> }, Error>(
        [API_ENDPOINTS.NOTIFICATIONS, options],
        fetchNotifications,
        {
            keepPreviousData: true,
            staleTime: 270000 // 270000ms is 4.5 minutes while cache time is 5 minutes by default
        }
    )
}

export { fetchNotifications, useNotificationsQuery }