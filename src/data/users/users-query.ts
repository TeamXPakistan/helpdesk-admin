import users from "@repositories/users"
import { useQuery } from "@tanstack/react-query"
import { GeneralQueryParam, QueryParamsType } from "@ts-types/custom.types"
import { IPaginator, User } from "@ts-types/generated"
import { API_ENDPOINTS } from "@utils/api/endpoints"

type QueryParamType = GeneralQueryParam;

const fetchUsers = async ({ queryKey }: QueryParamsType) => {
    const {
        limit,
        page,
        text
    } = queryKey[1] as QueryParamType;
    const url = `${API_ENDPOINTS.USERS}?limit=${limit}&page=${page}${text && `&search=${text}`}`
    const { data } = await users.getAllUsers(url)
    return { users: { data: data?.data, paginatorInfo: data?.meta } }
}

const useUsersQuery = (options: QueryParamType) => {
    return useQuery<{ users: IPaginator<User> }, Error>(
        [API_ENDPOINTS.USERS, options],
        fetchUsers,
        {
            keepPreviousData: true,
            staleTime: 270000 // 270000ms is 4.5 minutes while cache time is 5 minutes by default
        }
    )
}

export { fetchUsers, useUsersQuery }
