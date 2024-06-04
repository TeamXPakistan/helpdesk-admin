import shopCategories from "@repositories/shop-categories"
import { useQuery } from "@tanstack/react-query"
import { GeneralQueryParam, QueryParamsType } from "@ts-types/custom.types"
import { IPaginator, ShopCategory } from "@ts-types/generated"
import { API_ENDPOINTS } from "@utils/api/endpoints"


type QueryParamType = GeneralQueryParam

const fetchShopCategories = async ({ queryKey }: QueryParamsType) => {
    const {
        limit = 20,
        page = 1,
        text,
        shopId
    } = queryKey[1] as QueryParamType;
    const url = `${API_ENDPOINTS.SHOP_CATEGORIES}?limit=${limit}&page=${page}&${text ? `text=${text}` : ""}&${shopId ? `shopId=${shopId}` : ""}`
    const { data: { docs, ...rest } } = await shopCategories.getAllShopCategories(url)
    return { categories: { data: docs, paginatorInfo: rest } }
}

const useShopCategoriesQuery = (options: QueryParamType, fetchOPtions?: any) => {
    return useQuery<{ categories: IPaginator<ShopCategory> }, Error>(
        [API_ENDPOINTS.SHOP_CATEGORIES, options],
        fetchShopCategories,
        {
            ...fetchOPtions,
            keepPreviousData: true,
            staleTime: 270000 // 270000ms is 4.5 minutes while cache time is 5 minutes by default
        }
    )
}

export { fetchShopCategories, useShopCategoriesQuery }