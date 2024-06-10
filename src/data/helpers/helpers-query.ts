import helpers from "@repositories/helpers"
import { useQuery } from "@tanstack/react-query"
import { GeneralQueryParam, QueryParamsType } from "@ts-types/custom.types"
import { Helpers, IPaginator } from "@ts-types/generated"
import { API_ENDPOINTS } from "@utils/api/endpoints"

type QueryParamType = GeneralQueryParam;

const fetchHelpers = async ({ queryKey }: QueryParamsType) => {
    const {
        limit,
        page,
        text
    } = queryKey[1] as QueryParamType;
    const url = `${API_ENDPOINTS.HELPERS_LIST}?limit=${limit}&page=${page}${text && `&search=${text}`}`
    const { data: { data } } = await helpers.getAllHelpers(url)
    return { helpers: { data: data?.data, paginatorInfo: data?.meta } }
}

const useHelpersQuery = (options: QueryParamType) => {
    return useQuery<{ helpers: IPaginator<Helpers> }, Error>(
        [API_ENDPOINTS.HELPERS_LIST, options],
        fetchHelpers,
        {
            keepPreviousData: true,
            staleTime: 270000 // 270000ms is 4.5 minutes while cache time is 5 minutes by default
        }
    )
}

export { fetchHelpers, useHelpersQuery }
