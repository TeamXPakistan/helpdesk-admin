import { useQuery } from "@tanstack/react-query"
import { GeneralQueryParam, QueryParamsType } from "@ts-types/custom.types"
import { IPaginator, ParentCategories } from "@ts-types/generated"
import { API_ENDPOINTS } from "@utils/api/endpoints"
import ParentCategory from "@repositories/parent-categories"

type QueryParamType = GeneralQueryParam;

const fetchParentCategories = async ({ queryKey }: QueryParamsType) => {
    const {
        limit,
        page
    } = queryKey[1] as QueryParamType;
    const url = `${API_ENDPOINTS.PARENT_CATEGORIES}?limit=${limit}&page=${page}`
    const { data } = await ParentCategory.getAllParentCategory(url)
    console.log(data, "parnt cat backend");

    return { parentCategories: { data: data?.data, paginatorInfo: data?.meta } }
}

const useParentCategoriesQuery = (options: QueryParamType) => {
    return useQuery<{ parentCategories: IPaginator<ParentCategories> }, Error>(
        [API_ENDPOINTS.PARENT_CATEGORIES, options],
        fetchParentCategories,
        {
            keepPreviousData: true,
            staleTime: 270000 // 270000ms is 4.5 minutes while cache time is 5 minutes by default
        }
    )
}

export { fetchParentCategories, useParentCategoriesQuery }
