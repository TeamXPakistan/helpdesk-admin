import resturantCategories from "@repositories/resturant-categories"
import { useQuery } from "@tanstack/react-query"
import { ResturantCategory } from "@ts-types/generated"
import { API_ENDPOINTS } from "@utils/api/endpoints"


const fetchResturantCategory = async (id: string) => {
    const url = `${API_ENDPOINTS.SINGLE_RESTURANT_CATEGORY}/${id}`
    const { data } = await resturantCategories.getSingleResturantCategory(url)
    return data
}

const useResturantCategoryQuery = (id: string) => {
    return useQuery<ResturantCategory, Error>(
        [API_ENDPOINTS.RESTURANT_CATEGORIES, id], () => fetchResturantCategory(id),
    )
}

export { fetchResturantCategory, useResturantCategoryQuery }