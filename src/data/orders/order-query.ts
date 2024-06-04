import orders from "@repositories/orders"
import { useQuery } from "@tanstack/react-query"
import { Order } from "@ts-types/generated"
import { API_ENDPOINTS } from "@utils/api/endpoints"

const fetchOrder = async (id: string) => {
    const url = `${API_ENDPOINTS.SINGLE_ORDER}/${id}`
    const { data } = await orders.geSingleOrder(url)
    return data
}

const useOrderQuery = (id: string) => {
    return useQuery<Order, Error>(
        [API_ENDPOINTS.ORDERS, id], () => fetchOrder(id),
    )
}

export { fetchOrder, useOrderQuery }