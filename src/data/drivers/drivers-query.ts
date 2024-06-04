import drivers from "@repositories/drivers";
import { useQuery } from "@tanstack/react-query"
import { DriversQueryParam, GeneralQueryParam, QueryParamsType } from "@ts-types/custom.types"
import { Driver, IPaginator } from "@ts-types/generated"
import { API_ENDPOINTS } from "@utils/api/endpoints"


type QueryParamType = GeneralQueryParam & DriversQueryParam

const fetchDrivers = async ({ queryKey }: QueryParamsType) => {
    const {
        limit = 20,
        page = 1,
        text,
        status,
        current
    } = queryKey[1] as QueryParamType;
    const url = `${API_ENDPOINTS.DRIVERS}?limit=${limit}&page=${page}&${text ? `text=${text}` : ""}${status ? `&status=${status}` : ""}${current ? `&current=${current}` : ''}`
    const { data: { docs, ...rest } } = await drivers.getAllDrivers(url)
    return { drivers: { data: docs, paginatorInfo: rest } }
}

const useDriversQuery = (options: QueryParamType, fetchOPtions?: Object) => {
    return useQuery<{ drivers: IPaginator<Driver> }, Error>(
        [API_ENDPOINTS.DRIVERS, options],
        fetchDrivers,
        {
            ...fetchOPtions,
            keepPreviousData: true,
            staleTime: 270000 // 270000ms is 4.5 minutes while cache time is 5 minutes by default
        }
    )
}

export { fetchDrivers, useDriversQuery }