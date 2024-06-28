import { useQuery } from "@tanstack/react-query"
import { GeneralQueryParam, QueryParamsType } from "@ts-types/custom.types"
import { IPaginator, NestedSubCategory, SubCategories } from "@ts-types/generated"
import { API_ENDPOINTS } from "@utils/api/endpoints"
import SubCategory from "@repositories/sub-categories"

type QueryParamType = GeneralQueryParam;

const fetchNestedSubCategories = async ({ queryKey }: QueryParamsType) => {
    const {
        limit,
        page
    } = queryKey[1] as QueryParamType;
    const url = `${API_ENDPOINTS.NESTED_SUB_CATEGORIES}?limit=${limit}&page=${page}`
    const { data } = await SubCategory.getAllSubCategory(url)

    return { nestedSubcategories: { data: data?.data, paginatorInfo: data?.meta } }
}

const useNestedSubCategoriesQuery = (options: QueryParamType) => {
    return useQuery<{ nestedSubcategories: IPaginator<NestedSubCategory> }, Error>(
        [API_ENDPOINTS.NESTED_SUB_CATEGORIES, options],
        fetchNestedSubCategories,
        {
            keepPreviousData: true,
            staleTime: 270000 // 270000ms is 4.5 minutes while cache time is 5 minutes by default
        }
    )
}

export { fetchNestedSubCategories, useNestedSubCategoriesQuery }
