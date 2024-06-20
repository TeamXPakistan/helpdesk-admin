import users from "@repositories/users"
import { useQuery } from "@tanstack/react-query"
import { GeneralQueryParam, QueryParamsType } from "@ts-types/custom.types"
import { IPaginator, User } from "@ts-types/generated"
import { API_ENDPOINTS } from "@utils/api/endpoints"


const fetchSearchUser = async (text: string) => {
    const url = `${API_ENDPOINTS.USERS}?search=${text}`
    const { data } = await users.getSingleUser(url)
    console.log('hello user', data?.data);

    return data?.data;
}

const useSearchUserQuery = (text: string) => {
    return useQuery<any, Error>(
        [API_ENDPOINTS.USERS, text], () => fetchSearchUser(text)
    )
}

export { fetchSearchUser, useSearchUserQuery }
