import users from "@repositories/users"
import { useQuery } from "@tanstack/react-query"
import { GeneralQueryParam, QueryParamsType, UsersQueryParam } from "@ts-types/custom.types"
import { IPaginator, User } from "@ts-types/generated"
import { API_ENDPOINTS } from "@utils/api/endpoints"


type QueryParamType = GeneralQueryParam & UsersQueryParam;

const fetchUsers = async ({ queryKey }: QueryParamsType) => {
    const {
        limit = 20,
        page = 1,
        text,
        role
    } = queryKey[1] as QueryParamType;
    const url = `${API_ENDPOINTS.USERS}?limit=${limit}&page=${page}${text ? `&text=${text}` : ""}${role ? `&role=${role}` : ''}`
    const { data: { docs, ...rest } } = await users.getAllUsers(url)
    return { users: { data: docs, paginatorInfo: rest } }
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
