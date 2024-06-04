import withdraws from "@repositories/withdraws"
import { useQuery } from "@tanstack/react-query"
import { GeneralQueryParam, EarningsQueryParam, QueryParamsType } from "@ts-types/custom.types"
import { IPaginator } from "@ts-types/generated"
import { API_ENDPOINTS } from "@utils/api/endpoints"


type QueryParamType = GeneralQueryParam & EarningsQueryParam;

const fetchEarnings = async ({ queryKey }: QueryParamsType) => {
    const {
        limit = 20,
        page = 1,
        role,
        startDate,
        endDate
    } = queryKey[1] as QueryParamType;
    const url = `${API_ENDPOINTS.EARNINGS}?limit=${limit}&page=${page}${role ? `&role=${role}` : ""}${startDate ? `&startDate=${startDate}` : ""}${endDate ? `&endDate=${endDate}` : ""}`
    const { data: { docs, ...rest } } = await withdraws.getAllEarnings(url)
    return { earnings: { data: docs, paginatorInfo: rest } }
}

const useEarningsQuery = (options: QueryParamType) => {
    return useQuery<{ earnings: IPaginator<any> }, Error>(
        [API_ENDPOINTS.EARNINGS, options],
        fetchEarnings,
        {
            keepPreviousData: true,
            staleTime: 270000 // 270000ms is 4.5 minutes while cache time is 5 minutes by default
        }
    )
}

export { fetchEarnings, useEarningsQuery }
