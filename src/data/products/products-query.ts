import products from "@repositories/products"
import { useQuery } from "@tanstack/react-query"
import { GeneralQueryParam, ProductsQueryParam, QueryParamsType } from "@ts-types/custom.types"
import { IPaginator, Product } from "@ts-types/generated"
import { API_ENDPOINTS } from "@utils/api/endpoints"


type QueryParamType = GeneralQueryParam & ProductsQueryParam;

const fetchProducts = async ({ queryKey }: QueryParamsType) => {
    const {
        limit = 20,
        page = 1,
        text,
        shopId,
        disabled
    } = queryKey[1] as QueryParamType;
    const url = `${API_ENDPOINTS.PRODUCTS}?limit=${limit}&page=${page}${text ? `&text=${text}` : ""}&${shopId ? `shopId=${shopId}` : ""}&${disabled ? `disabled=${disabled}` : ""}`
    const { data: { docs, ...rest } } = await products.getAllProducts(url)
    return { products: { data: docs, paginatorInfo: rest } }
}

const useProductsQuery = (options: QueryParamType) => {
    return useQuery<{ products: IPaginator<Product> }, Error>(
        [API_ENDPOINTS.PRODUCTS, options],
        fetchProducts,
        {
            keepPreviousData: true,
            staleTime: 270000 // 270000ms is 4.5 minutes while cache time is 5 minutes by default
        }
    )
}

export { fetchProducts, useProductsQuery }