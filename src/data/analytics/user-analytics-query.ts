import analytics from "@repositories/analytics";
import { useQuery } from "@tanstack/react-query"
import { QueryParamsType, UserAnalyticsQueryParam } from "@ts-types/custom.types"
import { UserAnalytics } from "@ts-types/generated"
import { API_ENDPOINTS } from "@utils/api/endpoints"


type QueryParamType = UserAnalyticsQueryParam

const fetchUserAnalytics = async ({ queryKey }: QueryParamsType) => {
    const {
        userId,
        filterBy
    } = queryKey[1] as QueryParamType;
    const url = `${API_ENDPOINTS.USER_ANALYTICS}?${userId ? `&userId=${userId}` : ""}${filterBy ? `&filterBy=${filterBy}` : ""}`
    const { data } = await analytics.userAnalytics(url)
    return data;
}

const useUserAnalyticsQuery = (options: QueryParamType, fetchOPtions?: Object) => {
    return useQuery<UserAnalytics, Error>(
        [API_ENDPOINTS.USER_ANALYTICS, options],
        fetchUserAnalytics,
        {
            ...fetchOPtions,
            keepPreviousData: true,
            staleTime: 270000 // 270000ms is 4.5 minutes while cache time is 5 minutes by default
        }
    )
}

export { fetchUserAnalytics, useUserAnalyticsQuery }