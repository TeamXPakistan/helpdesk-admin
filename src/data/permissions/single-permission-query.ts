import permissions from "@repositories/permissions"
import roles from "@repositories/roles"
import { useQuery } from "@tanstack/react-query"
import { Permission } from "@ts-types/generated"
import { API_ENDPOINTS } from "@utils/api/endpoints"


const fetchSinglePermission = async (id: string) => {
    const url = `${API_ENDPOINTS.SINGLE_PERMISSION}/${id}`
    const { data } = await permissions.getSinglePermission(url)
    return data
}

const useSinglePermissionQuery = (id: string) => {
    return useQuery<Permission, Error>(
        [API_ENDPOINTS.SINGLE_PERMISSION, id], () => fetchSinglePermission(id),
    )
}

export { fetchSinglePermission, useSinglePermissionQuery }