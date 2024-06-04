import analytics from "@repositories/analytics";
import { useQuery } from "@tanstack/react-query"
import { DriverAnalyticsQueryParam, QueryParamsType } from "@ts-types/custom.types"
import { DriverAnalytics } from "@ts-types/generated"
import { API_ENDPOINTS } from "@utils/api/endpoints"


type QueryParamType = DriverAnalyticsQueryParam

const fetchDriverAnalytics = async ({ queryKey }: QueryParamsType) => {
    const {
        riderId,
        filterBy
    } = queryKey[1] as QueryParamType;
    const url = `${API_ENDPOINTS.DRIVER_ANALYTICS}?${riderId ? `&riderId=${riderId}` : ""}${filterBy ? `&filterBy=${filterBy}` : ""}`
    const { data } = await analytics.driverAnalytics(url)
    return data;
}

const useDriverAnalyticsQuery = (options: QueryParamType, fetchOPtions?: Object) => {
    return useQuery<DriverAnalytics, Error>(
        [API_ENDPOINTS.DRIVER_ANALYTICS, options],
        fetchDriverAnalytics,
        {
            ...fetchOPtions,
            keepPreviousData: true,
            staleTime: 270000 // 270000ms is 4.5 minutes while cache time is 5 minutes by default
        }
    )
}

export { fetchDriverAnalytics, useDriverAnalyticsQuery }