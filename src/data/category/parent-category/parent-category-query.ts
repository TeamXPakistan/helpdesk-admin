import { useQuery } from "@tanstack/react-query"
import { ParentCategories } from "@ts-types/generated";
import { API_ENDPOINTS } from "@utils/api/endpoints"
import ParentCategory from "@repositories/parent-categories"

const fetchParentCategory = async (id: string) => {
    const url = `${API_ENDPOINTS.SINGLE_PARENT_CATEGORY}/${id}`
    const { data } = await ParentCategory.singleParentCategory(url)
    return data
}

const useParentCategoryQuery = (id: string) => {
    return useQuery<ParentCategories, Error>(
        [API_ENDPOINTS.SINGLE_PARENT_CATEGORY, id], () => fetchParentCategory(id),
    )
}

export { fetchParentCategory, useParentCategoryQuery }
