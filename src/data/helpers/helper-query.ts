import helpers from "@repositories/helpers"
import { useQuery } from "@tanstack/react-query"
import { Helpers } from "@ts-types/generated"
import { API_ENDPOINTS } from "@utils/api/endpoints"

const fetchHelper = async (id: string) => {
    const url = `${API_ENDPOINTS.SINGLE_HELPER}/${id}`
    const { data } = await helpers.getSingleHelper(url)
    return data
}

const useHelperQuery = (id: string) => {
    return useQuery<Helpers, Error>(
        [API_ENDPOINTS.SINGLE_HELPER, id], () => fetchHelper(id),
    )
}

export { fetchHelper, useHelperQuery }
