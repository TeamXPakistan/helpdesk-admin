import drivers from "@repositories/drivers";
import { useQuery } from "@tanstack/react-query"
import { DriverCurrentParcel } from "@ts-types/generated"
import { API_ENDPOINTS } from "@utils/api/endpoints"


const fetchCurrentParcel = async (id: string) => {
    const url = `${API_ENDPOINTS.DRIVER_CURRENT_PARCEL}/${id}`;
    const { data } = await drivers.getCurrentParcel(url);
    return data;
}

const useCurrentParcelQuery = (id: string) => {
    return useQuery<DriverCurrentParcel, Error>(
        [API_ENDPOINTS.DRIVER_CURRENT_PARCEL, id], () => fetchCurrentParcel(id),
    )
}

export { fetchCurrentParcel, useCurrentParcelQuery }