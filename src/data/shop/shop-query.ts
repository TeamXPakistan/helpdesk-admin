import shop from "@repositories/shop"
import { useQuery } from "@tanstack/react-query"
import { Shop } from "@ts-types/generated"
import { API_ENDPOINTS } from "@utils/api/endpoints"


const fetchShop = async (id: string) => {
    const url = `${API_ENDPOINTS.SINGLE_SHOP}/${id}`
    const { data } = await shop.getSingleShop(url)
    return data
}

const useShopQuery = (id: string) => {
    return useQuery<Shop, Error>(
        [API_ENDPOINTS.SHOPS, id], () => fetchShop(id),
    )
}

export { fetchShop, useShopQuery }