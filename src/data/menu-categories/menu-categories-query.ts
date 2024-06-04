import MenuCategories from "@repositories/menu-categories";
import { useQuery } from "@tanstack/react-query"
import { GeneralQueryParam, QueryParamsType } from "@ts-types/custom.types"
import { IPaginator, MenuCategory } from "@ts-types/generated"
import { API_ENDPOINTS } from "@utils/api/endpoints"


type QueryParamType = GeneralQueryParam

const fetchMenuCategories = async ({ queryKey }: QueryParamsType) => {
    const {
        limit = 20,
        page = 1,
        text,
        shopId
    } = queryKey[1] as QueryParamType;
    const url = `${API_ENDPOINTS.MENU_CATEGORIES}?limit=${limit}&page=${page}&${text ? `text=${text}` : ""}&${shopId ? `shopId=${shopId}` : ""}`
    const { data: { docs, ...rest } } = await MenuCategories.getAllMenuCategories(url)
    return { categories: { data: docs, paginatorInfo: rest } }
}

const useMenuCategoriesQuery = (options: QueryParamType, fetchOPtions?: Object) => {
    return useQuery<{ categories: IPaginator<MenuCategory> }, Error>(
        [API_ENDPOINTS.MENU_CATEGORIES, options],
        fetchMenuCategories,
        {
            ...fetchOPtions,
            keepPreviousData: true,
            staleTime: 270000 // 270000ms is 4.5 minutes while cache time is 5 minutes by default
        }
    )
}

export { fetchMenuCategories, useMenuCategoriesQuery }