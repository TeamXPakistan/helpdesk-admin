import roles from "@repositories/roles"
import { useQuery } from "@tanstack/react-query"
import { Role } from "@ts-types/generated"
import { API_ENDPOINTS } from "@utils/api/endpoints"


const fetchRole = async (id: string) => {
    const url = `${API_ENDPOINTS.SINGLE_ROLE}/${id}`
    const { data } = await roles.getSingleRole(url)
    return data
}

const useRoleQuery = (id: string) => {
    return useQuery<Role, Error>(
        [API_ENDPOINTS.ROLES, id], () => fetchRole(id),
    )
}

export { fetchRole, useRoleQuery }