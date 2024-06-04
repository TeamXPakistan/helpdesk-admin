import shopCategories from "@repositories/shop-categories"
import { useQuery } from "@tanstack/react-query"
import { ShopCategory } from "@ts-types/generated"
import { API_ENDPOINTS } from "@utils/api/endpoints"


const fetchShopCategory = async (id: string) => {
    const url = `${API_ENDPOINTS.SINGLE_SHOP_CATEGORY}/${id}`
    const { data } = await shopCategories.getSingleShopCategory(url)
    return data
}

const useShopCategoryQuery = (id: string) => {
    return useQuery<ShopCategory, Error>(
        [API_ENDPOINTS.SHOP_CATEGORIES, id], () => fetchShopCategory(id),
    )
}

export { fetchShopCategory, useShopCategoryQuery }