
import feedback from "@repositories/feedback"
import { useQuery } from "@tanstack/react-query"
import { GeneralQueryParam, QueryParamsType } from "@ts-types/custom.types"
import { Feedback, IPaginator } from "@ts-types/generated"
import { API_ENDPOINTS } from "@utils/api/endpoints"

type QueryParamType = GeneralQueryParam;

const fetchHelpersUsersFeedback = async ({ queryKey }: QueryParamsType) => {
    const {
        limit,
        page,
        roleId
    } = queryKey[1] as QueryParamType;
    const url = `${API_ENDPOINTS.FEEDBACK}/${roleId}?limit=${limit}&page=${page}`
    const { data } = await feedback.getAllFeedback(url);
    return { feedback: { data: data?.data, paginatorInfo: data?.meta } }
}

const useHelpersUsersFeedbackQuery = (options: QueryParamType) => {
    return useQuery<{ feedback: IPaginator<Feedback> }, Error>(
        [API_ENDPOINTS.FEEDBACK, options],
        fetchHelpersUsersFeedback,
        {
            keepPreviousData: true,
            staleTime: 270000 // 270000ms is 4.5 minutes while cache time is 5 minutes by default
        }
    )
}

export { fetchHelpersUsersFeedback, useHelpersUsersFeedbackQuery }
