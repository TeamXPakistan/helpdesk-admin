import parcels from "@repositories/parcels"
import { useQuery } from "@tanstack/react-query"
import { GeneralQueryParam, ParcelsQueryParam, QueryParamsType } from "@ts-types/custom.types"
import { IPaginator, Parcel } from "@ts-types/generated"
import { API_ENDPOINTS } from "@utils/api/endpoints"

type QueryParamType = GeneralQueryParam & ParcelsQueryParam;

const fetchParcels = async ({ queryKey }: QueryParamsType) => {
    const {
        limit = 20,
        page = 1,
        text,
        startDate,
        endDate,
        riderId,
        status
    } = queryKey[1] as QueryParamType;
    const url = `${API_ENDPOINTS.PARCELS}?limit=${limit}&page=${page}${text ? `&text=${text}` : ""}${riderId ? `&riderId=${riderId}` : ""}${status ? `&status=${status}` : ""}${startDate ? `&startDate=${startDate}` : ""}${endDate ? `&endDate=${endDate}` : ""}`
    const { data: { docs, ...rest } } = await parcels.getAllParcels(url)
    return { parcels: { data: docs, paginatorInfo: rest } }
}

const useParcelsQuery = (options: QueryParamType) => {
    return useQuery<{ parcels: IPaginator<Parcel> }, Error>(
        [API_ENDPOINTS.PARCELS, options],
        fetchParcels,
        {
            keepPreviousData: true,
            staleTime: 270000 // 270000ms is 4.5 minutes while cache time is 5 minutes by default
        }
    )
}

export { fetchParcels, useParcelsQuery }