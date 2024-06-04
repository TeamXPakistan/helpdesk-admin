import shopCategories from "@repositories/shop-categories"
import { useQuery } from "@tanstack/react-query"
import { ShopCategory } from "@ts-types/generated"
import { API_ENDPOINTS } from "@utils/api/endpoints"


const fetchSubCategory = async (id: string) => {
    const url = `${API_ENDPOINTS.SINGLE_SUB_CATEGORY}/${id}`
    const { data } = await shopCategories.getSingleShopCategory(url)
    return data
}

const useSubCategoryQuery = (id: string) => {
    return useQuery<ShopCategory, Error>(
        [API_ENDPOINTS.SUB_CATEGORIES_BY_SHOP, id], () => fetchSubCategory(id),
    )
}

export { fetchSubCategory, useSubCategoryQuery }