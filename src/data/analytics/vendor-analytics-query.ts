import analytics from "@repositories/analytics";
import { useQuery } from "@tanstack/react-query"
import { QueryParamsType, VendorAnalyticsQueryParam } from "@ts-types/custom.types"
import { VendorAnalytics } from "@ts-types/generated"
import { API_ENDPOINTS } from "@utils/api/endpoints"


type QueryParamType = VendorAnalyticsQueryParam

const fetchVendorAnalytics = async ({ queryKey }: QueryParamsType) => {
    const {
        filterBy,
        userId
    } = queryKey[1] as QueryParamType;
    const url = `${API_ENDPOINTS.VENDOR_ANALYTICS}?${filterBy ? `filterBy=${filterBy}` : ""}${userId ? `&userId=${userId}` : ""}`
    const { data } = await analytics.vendorAnalytics(url)
    return data;
}

const useVendorAnalyticsQuery = (options: QueryParamType, fetchOPtions?: Object) => {
    return useQuery<VendorAnalytics, Error>(
        [API_ENDPOINTS.VENDOR_ANALYTICS, options],
        fetchVendorAnalytics,
        {
            ...fetchOPtions,
            keepPreviousData: true,
            staleTime: 270000 // 270000ms is 4.5 minutes while cache time is 5 minutes by default
        }
    )
}

export { fetchVendorAnalytics, useVendorAnalyticsQuery }