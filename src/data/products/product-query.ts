import products from "@repositories/products"
import { useQuery } from "@tanstack/react-query"
import { Product } from "@ts-types/generated"
import { API_ENDPOINTS } from "@utils/api/endpoints"


const fetchProduct = async (id: string) => {
    const url = `${API_ENDPOINTS.SINGLE_PRODUCT}/${id}`
    const { data } = await products.getSingleProduct(url)
    return data
}

const useProductQuery = (id: string) => {
    return useQuery<{ product: Product, recommended: Product[] }, Error>(
        [API_ENDPOINTS.PRODUCTS, id], () => fetchProduct(id),
    )
}

export { fetchProduct, useProductQuery }