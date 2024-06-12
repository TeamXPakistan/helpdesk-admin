
import reviews from "@repositories/reviews"
import { useQuery } from "@tanstack/react-query"
import { GeneralQueryParam, QueryParamsType, UsersQueryParam } from "@ts-types/custom.types"
import { IPaginator, REVIEW, User } from "@ts-types/generated"
import { API_ENDPOINTS } from "@utils/api/endpoints"


type QueryParamType = GeneralQueryParam;

const fetchHelpersUsersReviews = async ({ queryKey }: QueryParamsType) => {
    const {
        limit,
        page,
        text
    } = queryKey[1] as QueryParamType;
    // const url = `${API_ENDPOINTS.REVIEWS}?limit=${limit}&page=${page}${text && `&search=${text}`}`

    const url = `${API_ENDPOINTS.REVIEWS}/${text}`
    const { data } = await reviews.getAllReviews(url);

    // console.log(data?.data, "...back Reviews Data");

    return { reviews: { data: data?.data, paginatorInfo: data?.meta } }
}

const useHelpersUsersReviewsQuery = (options: QueryParamType) => {
    return useQuery<{ reviews: IPaginator<REVIEW> }, Error>(
        [API_ENDPOINTS.REVIEWS, options],
        fetchHelpersUsersReviews,
        {
            keepPreviousData: true,
            staleTime: 270000 // 270000ms is 4.5 minutes while cache time is 5 minutes by default
        }
    )
}

export { fetchHelpersUsersReviews, useHelpersUsersReviewsQuery }
