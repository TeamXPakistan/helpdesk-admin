import roles from "@repositories/roles"
import { useQuery } from "@tanstack/react-query"
import { GeneralQueryParam, QueryParamsType } from "@ts-types/custom.types"
import { IPaginator, Role } from "@ts-types/generated"
import { API_ENDPOINTS } from "@utils/api/endpoints"

type QueryParamType = GeneralQueryParam;

const fetchRoles = async ({ queryKey }: QueryParamsType) => {
    const {
        limit,
        page,
        text,
    } = queryKey[1] as QueryParamType;
    const url = `${API_ENDPOINTS.ROLES}?limit=${limit}&page=${page}${text ? `&search=${text}` : ""}`
    const { data } = await roles.getAllRoles(url)
    return { roles: { data: data?.data, paginatorInfo: data?.meta } }
}

const useRolesQuery = (options: QueryParamType) => {
    return useQuery<{ roles: IPaginator<Role> }, Error>(
        [API_ENDPOINTS.ROLES, options],
        fetchRoles,
        {
            keepPreviousData: true,
            staleTime: 270000 // 270000ms is 4.5 minutes while cache time is 5 minutes by default
        }
    )
}

export { fetchRoles, useRolesQuery }
