import notifications from "@repositories/notifications"
import { useInfiniteQuery } from "@tanstack/react-query"
import { GeneralQueryParam } from "@ts-types/custom.types"
import { IPaginator, Notification } from "@ts-types/generated"
import { API_ENDPOINTS } from "@utils/api/endpoints"


type QueryParamType = GeneralQueryParam;

type InfiniteQueryParamsType = {
    pageParam: number;
    options: QueryParamType
}

const fetchNotifications = async ({ pageParam = 1, options }: InfiniteQueryParamsType) => {
    const {
        limit = 20,
    } = options as QueryParamType;
    const url = `${API_ENDPOINTS.NOTIFICATIONS}?limit=${limit}&page=${pageParam}`
    const { data: { docs, ...rest } } = await notifications.getNotifications(url)
    return { notifications: { data: docs, paginatorInfo: rest } }
}

const useNotificationsInfinteQuery = (options: QueryParamType) => {
    return useInfiniteQuery<{ notifications: IPaginator<Notification> }, Error>(
        [API_ENDPOINTS.NOTIFICATIONS, options],
        ({ pageParam = 1 }) => fetchNotifications({ pageParam, options }),
        {
            getNextPageParam: (lastPage) => {
                return lastPage?.notifications?.paginatorInfo?.nextPage ?? undefined
            },
        }
    )
}

export { fetchNotifications, useNotificationsInfinteQuery }