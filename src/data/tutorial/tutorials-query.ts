import tutorial from "@repositories/tutorial"
import { useQuery } from "@tanstack/react-query"
import { GeneralQueryParam, QueryParamsType } from "@ts-types/custom.types"
import { IPaginator, Tutorial } from "@ts-types/generated"
import { API_ENDPOINTS } from "@utils/api/endpoints"

type QueryParamType = GeneralQueryParam;

const fetchTutorials = async ({ queryKey }: QueryParamsType) => {
    const {
        limit,
        page,
        text
    } = queryKey[1] as QueryParamType;
    const url = `${API_ENDPOINTS.TUTORIAL}?limit=${limit}&page=${page}${text && `&search=${text}`}`
    const data = await tutorial.getAllTutorials(url)

    return { tutorial: { data: data?.data, paginatorInfo: data?.meta } }
}

const useTutorialQueries = (options: QueryParamType) => {
    return useQuery<{ tutorial: IPaginator<Tutorial> }, Error>(
        [API_ENDPOINTS.TUTORIAL, options],
        fetchTutorials,
        {
            keepPreviousData: true,
            staleTime: 270000 // 270000ms is 4.5 minutes while cache time is 5 minutes by default
        }

    )
}

export { fetchTutorials, useTutorialQueries }
