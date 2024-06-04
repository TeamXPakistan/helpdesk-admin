import withdraws from "@repositories/withdraws"
import { useQuery } from "@tanstack/react-query"
import { GeneralQueryParam, MerchantWithdrawsQueryParam, QueryParamsType } from "@ts-types/custom.types"
import { IPaginator, MerchantWithdraw } from "@ts-types/generated"
import { API_ENDPOINTS } from "@utils/api/endpoints"


type QueryParamType = GeneralQueryParam & MerchantWithdrawsQueryParam;

const fetchMechantWithdraws = async ({ queryKey }: QueryParamsType) => {
    const {
        limit = 20,
        page = 1,
        status,
        role
    } = queryKey[1] as QueryParamType;
    const url = `${API_ENDPOINTS.MERCHANT_WITHDRAWS}?limit=${limit}&page=${page}${status ? `&status=${status}` : ""}${role ? `&role=${role}` : ""}`
    const { data: { docs, ...rest } } = await withdraws.getAllMerchantWithdraws(url)
    return { withdraws: { data: docs, paginatorInfo: rest } }
}

const useMerchantWithdrawsQuery = (options: QueryParamType) => {
    return useQuery<{ withdraws: IPaginator<MerchantWithdraw> }, Error>(
        [API_ENDPOINTS.MERCHANT_WITHDRAWS, options],
        fetchMechantWithdraws,
        {
            keepPreviousData: true,
            staleTime: 270000 // 270000ms is 4.5 minutes while cache time is 5 minutes by default
        }
    )
}

export { fetchMechantWithdraws, useMerchantWithdrawsQuery }
