import adminStaff from "@repositories/admin-staff";
import { useQuery } from "@tanstack/react-query"
import { User } from "@ts-types/generated";
import { API_ENDPOINTS } from "@utils/api/endpoints"


const fetchAdminState = async (id: string) => {
    const url = `${API_ENDPOINTS.ADMIN_STAFF}/${id}`
    const { data } = await adminStaff.getSingleStaff(url)
    return data
}

const useStaffQuery = (id: string) => {
    return useQuery<User, Error>(
        [API_ENDPOINTS.ADMIN_STAFFS, id], () => fetchAdminState(id),
    )
}

export { fetchAdminState, useStaffQuery }