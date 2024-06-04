import products from "@repositories/products"
import { useQuery } from "@tanstack/react-query"
import { GeneralQueryParam, QueryParamsType } from "@ts-types/custom.types"
import { IPaginator, Product } from "@ts-types/generated"
import { API_ENDPOINTS } from "@utils/api/endpoints"


type QueryParamType = GeneralQueryParam;

const fetchPopularProducts = async ({ queryKey }: QueryParamsType) => {
    const {
        limit = 20,
        page = 1,
        text,
        shopId,
    } = queryKey[1] as QueryParamType;
    const url = `${API_ENDPOINTS.POPULAR_PRODUCTS}?limit=${limit}&page=${page}${text ? `&text=${text}` : ""}&${shopId ? `shopId=${shopId}` : ""}`
    const { data: { docs, ...rest } } = await products.getPopularProducts(url)
    return { products: { data: docs, paginatorInfo: rest } }
}

const usePopularProductsQuery = (options: QueryParamType) => {
    return useQuery<{ products: IPaginator<Product> }, Error>(
        [API_ENDPOINTS.POPULAR_PRODUCTS, options],
        fetchPopularProducts,
        {
            keepPreviousData: true,
            staleTime: 270000 // 270000ms is 4.5 minutes while cache time is 5 minutes by default
        }
    )
}

export { fetchPopularProducts, usePopularProductsQuery }