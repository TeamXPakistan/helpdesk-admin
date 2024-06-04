import parcels from "@repositories/parcels"
import { useQuery } from "@tanstack/react-query"
import { Parcel } from "@ts-types/generated"
import { API_ENDPOINTS } from "@utils/api/endpoints"

const fetchParcel = async (id: string) => {
    const url = `${API_ENDPOINTS.SINGLE_PARCEL}/${id}`
    const { data } = await parcels.geSingleParcel(url)
    return data
}

const useParcelQuery = (id: string) => {
    return useQuery<Parcel, Error>(
        [API_ENDPOINTS.SINGLE_PARCEL, id], () => fetchParcel(id),
    )
}

export { fetchParcel, useParcelQuery }