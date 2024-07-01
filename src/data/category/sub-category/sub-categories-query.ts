import { useQuery } from "@tanstack/react-query"
import { GeneralQueryParam, QueryParamsType } from "@ts-types/custom.types"
import { IPaginator, SubCategories } from "@ts-types/generated"
import { API_ENDPOINTS } from "@utils/api/endpoints"
import SubCategory from "@repositories/sub-categories"

type QueryParamType = GeneralQueryParam;

const fetchSubCategories = async ({ queryKey }: QueryParamsType) => {
    const {
        limit,
        page
    } = queryKey[1] as QueryParamType;
    const url = `${API_ENDPOINTS.SUB_CATEGORIES}?limit=${limit}&page=${page}`
    const { data } = await SubCategory.getAllSubCategory(url)
    return { subCategories: { data: data?.data, paginatorInfo: data?.meta } }
}

const useSubCategoriesQuery = (options: QueryParamType) => {
    return useQuery<{ subCategories: IPaginator<SubCategories> }, Error>(
        [API_ENDPOINTS.SUB_CATEGORIES, options],
        fetchSubCategories,
        {
            keepPreviousData: true,
            staleTime: 270000 // 270000ms is 4.5 minutes while cache time is 5 minutes by default
        }
    )
}

export { fetchSubCategories, useSubCategoriesQuery }
