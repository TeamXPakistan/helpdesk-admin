import analytics from "@repositories/analytics";
import { useQuery } from "@tanstack/react-query"
import { AdminAnalyticsQueryParam, QueryParamsType } from "@ts-types/custom.types"
import { AdminAnalytics } from "@ts-types/generated"
import { API_ENDPOINTS } from "@utils/api/endpoints"


type QueryParamType = AdminAnalyticsQueryParam

const fetchAdminAnalytics = async ({ queryKey }: QueryParamsType) => {
    const {
        filterBy
    } = queryKey[1] as QueryParamType;
    const url = `${API_ENDPOINTS.ADMIN_ANALYTICS}?${filterBy ? `filterBy=${filterBy}` : ""}`
    const { data } = await analytics.adminAnalytics(url)
    return data;
}

const useAdminAnalyticsQuery = (options: QueryParamType, fetchOPtions?: Object) => {
    return useQuery<AdminAnalytics, Error>(
        [API_ENDPOINTS.ADMIN_ANALYTICS, options],
        fetchAdminAnalytics,
        {
            ...fetchOPtions,
            keepPreviousData: true,
            staleTime: 270000 // 270000ms is 4.5 minutes while cache time is 5 minutes by default
        }
    )
}

export { fetchAdminAnalytics, useAdminAnalyticsQuery }