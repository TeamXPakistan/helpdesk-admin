import subCategories from "@repositories/sub-categories"
import { useQuery } from "@tanstack/react-query"
import { GeneralQueryParam, QueryParamsType } from "@ts-types/custom.types"
import { IPaginator, SubCategory } from "@ts-types/generated"
import { API_ENDPOINTS } from "@utils/api/endpoints"

type QueryParamType = GeneralQueryParam

const fetchSubCategories = async ({ queryKey }: QueryParamsType) => {
    const {
        limit = 20,
        page = 1,
        text,
        shopId
    } = queryKey[1] as QueryParamType;
    const url = `${API_ENDPOINTS.SUB_CATEGORIES_BY_SHOP}?limit=${limit}&page=${page}&${text ? `text=${text}` : ""}&${shopId ? `shopId=${shopId}` : ""}`
    const { data: { docs, ...rest } } = await subCategories.getAllSubCategoriesByShop(url)
    return { subCategories: { data: docs, paginatorInfo: rest } }
}

const useSubCategoriesByShopQuery = (options: QueryParamType, fetchOPtions?: any) => {
    return useQuery<{ subCategories: IPaginator<SubCategory> }, Error>(
        [API_ENDPOINTS.SUB_CATEGORIES_BY_SHOP, options],
        fetchSubCategories,
        {
            ...fetchOPtions,
            keepPreviousData: true,
            staleTime: 270000 // 270000ms is 4.5 minutes while cache time is 5 minutes by default
        }
    )
}

export { fetchSubCategories, useSubCategoriesByShopQuery }