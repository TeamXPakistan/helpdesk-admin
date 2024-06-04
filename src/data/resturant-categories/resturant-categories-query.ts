import resturantCategories from "@repositories/resturant-categories"
import { useQuery } from "@tanstack/react-query"
import { GeneralQueryParam, QueryParamsType } from "@ts-types/custom.types"
import { IPaginator, ResturantCategory } from "@ts-types/generated"
import { API_ENDPOINTS } from "@utils/api/endpoints"

const fetchResturantCategories = async ({ queryKey }: QueryParamsType) => {
    const {
        limit = 20,
        page = 1,
        text
    } = queryKey[1] as GeneralQueryParam;
    const url = `${API_ENDPOINTS.RESTURANT_CATEGORIES}?limit=${limit}&page=${page}${text ? `&text=${text}` : ''}`
    const { data: { docs, ...rest } } = await resturantCategories.getAllResturantCategories(url)
    return { categories: { data: docs, paginatorInfo: rest } }
}

const useResturantCategoriesQuery = (options: GeneralQueryParam) => {
    return useQuery<{ categories: IPaginator<ResturantCategory> }, Error>(
        [API_ENDPOINTS.RESTURANT_CATEGORIES, options],
        fetchResturantCategories,
        {
            keepPreviousData: true,
            staleTime: 270000 // 270000ms is 4.5 minutes while cache time is 5 minutes by default
        }
    )
}

export { fetchResturantCategories, useResturantCategoriesQuery }