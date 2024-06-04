import MenuCategories from "@repositories/menu-categories";
import { useQuery } from "@tanstack/react-query"
import { MenuCategory } from "@ts-types/generated"
import { API_ENDPOINTS } from "@utils/api/endpoints"


const fetchMenuCategory = async (id: string) => {
    const url = `${API_ENDPOINTS.MENU_CATEGORY}/${id}`
    const { data } = await MenuCategories.getSingleMenuCategory(url)
    return data
}

const useMenuCategoryQuery = (id: string) => {
    return useQuery<MenuCategory, Error>(
        [API_ENDPOINTS.MENU_CATEGORIES, id], () => fetchMenuCategory(id),
    )
}

export { fetchMenuCategory, useMenuCategoryQuery }