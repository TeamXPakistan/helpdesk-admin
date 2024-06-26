import adminStaff from "@repositories/admin-staff";
import { useQuery } from "@tanstack/react-query"
import { GeneralQueryParam, QueryParamsType } from "@ts-types/custom.types"
import { IPaginator, User } from "@ts-types/generated"
import { API_ENDPOINTS } from "@utils/api/endpoints"

type QueryParamType = GeneralQueryParam

const fetchStaff = async ({ queryKey }: QueryParamsType) => {
    const {
        limit,
        page,
        text,
    } = queryKey[1] as QueryParamType;
    const url = `${API_ENDPOINTS.ADMIN_STAFFS}?limit=${limit}&page=${page}${text ? `&search=${text}` : ""}`
    const { data } = await adminStaff.getAllStaff(url)
    return { staffs: { data: data?.data, paginatorInfo: data?.meta } }
}

const useStaffsQuery = (options: QueryParamType, fetchOPtions?: Object) => {
    return useQuery<{ staffs: IPaginator<User> }, Error>(
        [API_ENDPOINTS.ADMIN_STAFFS, options],
        fetchStaff,
        {
            ...fetchOPtions,
            keepPreviousData: true,
            staleTime: 270000 // 270000ms is 4.5 minutes while cache time is 5 minutes by default
        }
    )
}

export { fetchStaff, useStaffsQuery }
