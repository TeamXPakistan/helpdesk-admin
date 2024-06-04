import shop from "@repositories/shop"
import { useQuery } from "@tanstack/react-query"
import { GeneralQueryParam, QueryParamsType, ShopsQueryParam } from "@ts-types/custom.types"
import { IPaginator, Shop } from "@ts-types/generated"
import { API_ENDPOINTS } from "@utils/api/endpoints"


type QueryParamType = GeneralQueryParam & ShopsQueryParam;

const fetchShops = async ({ queryKey }: QueryParamsType) => {
    const {
        limit = 20,
        page = 1,
        status,
        shopType,
        text
    } = queryKey[1] as QueryParamType;
    const url = `${API_ENDPOINTS.SHOPS}?limit=${limit}&page=${page}&${text ? `text=${text}` : ""}&${status ? `status=${status}` : ""}&${shopType ? `type=${shopType}` : ""}`
    const { data: { docs, ...rest } } = await shop.getAllShops(url)
    return { shops: { data: docs, paginatorInfo: rest } }
}

const useShopsQuery = (options: QueryParamType) => {
    return useQuery<{ shops: IPaginator<Shop> }, Error>(
        [API_ENDPOINTS.SHOPS, options],
        fetchShops,
        {
            keepPreviousData: true,
            staleTime: 270000 // 270000ms is 4.5 minutes while cache time is 5 minutes by default
        }
    )
}

export { fetchShops, useShopsQuery }