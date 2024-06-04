import products from "@repositories/products"
import { useQuery } from "@tanstack/react-query"
import { GeneralQueryParam, QueryParamsType } from "@ts-types/custom.types"
import { IPaginator, ShopReview } from "@ts-types/generated"
import { API_ENDPOINTS } from "@utils/api/endpoints"


type QueryParamType = GeneralQueryParam;

const fetchShopReviews = async ({ queryKey }: QueryParamsType) => {
    const {
        limit = 20,
        page = 1,
        text,
        shopId,
    } = queryKey[1] as QueryParamType;
    const url = `${API_ENDPOINTS.SHOP_REVIEWS}?limit=${limit}&page=${page}${text ? `&text=${text}` : ""}&${shopId ? `shopId=${shopId}` : ""}`
    const { data: { docs, ...rest } } = await products.getAllProducts(url)
    return { reviews: { data: docs, paginatorInfo: rest } }
}

const useShopReviewsQuery = (options: QueryParamType) => {
    return useQuery<{ reviews: IPaginator<ShopReview> }, Error>(
        [API_ENDPOINTS.SHOP_REVIEWS, options],
        fetchShopReviews,
        {
            keepPreviousData: true,
            staleTime: 270000 // 270000ms is 4.5 minutes while cache time is 5 minutes by default
        }
    )
}

export { fetchShopReviews, useShopReviewsQuery }