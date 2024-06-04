import users from "@repositories/users"
import { useQuery } from "@tanstack/react-query"
import { User } from "@ts-types/generated"
import { API_ENDPOINTS } from "@utils/api/endpoints"


const fetchUser = async (id: string) => {
    const url = `${API_ENDPOINTS.SINGLE_USER}/${id}`
    const { data } = await users.getSingleUser(url)
    return data
}

const useUserQuery = (id: string) => {
    return useQuery<User, Error>(
        [API_ENDPOINTS.SINGLE_USER, id], () => fetchUser(id),
    )
}

export { fetchUser, useUserQuery }