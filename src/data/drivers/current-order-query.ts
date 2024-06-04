import drivers from "@repositories/drivers";
import { useQuery } from "@tanstack/react-query"
import { DriverCurrentOrder } from "@ts-types/generated"
import { API_ENDPOINTS } from "@utils/api/endpoints"


const fetchCurrentOrder = async (id: string) => {
    const url = `${API_ENDPOINTS.DRIVER_CURRENT_ORDER}/${id}`
    const { data } = await drivers.getCurrentOrder(url)
    return data
}

const useCurrentOrderQuery = (id: string) => {
    return useQuery<DriverCurrentOrder, Error>(
        [API_ENDPOINTS.DRIVER_CURRENT_ORDER, id], () => fetchCurrentOrder(id),
    )
}

export { fetchCurrentOrder, useCurrentOrderQuery }