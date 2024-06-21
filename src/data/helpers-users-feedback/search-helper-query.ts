import users from "@repositories/users"
import { useQuery } from "@tanstack/react-query"
import { API_ENDPOINTS } from "@utils/api/endpoints"

const fetchSearchHelper = async (text: string) => {
    const url = `${API_ENDPOINTS.USERS}?search=${text}`
    const { data } = await users.getSingleUser(url)
    return data?.data
}

const useSearchHelperQuery = (text: string) => {
    return useQuery<any, Error>(
        [API_ENDPOINTS.USERS, text], () => fetchSearchHelper(text)
    )
}
export { fetchSearchHelper, useSearchHelperQuery }

