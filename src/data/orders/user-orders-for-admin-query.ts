import orders from "@repositories/orders"
import { useQuery } from "@tanstack/react-query"
import { GeneralQueryParam, OrdersQueryParam, QueryParamsType } from "@ts-types/custom.types"
import { IPaginator, Order } from "@ts-types/generated"
import { API_ENDPOINTS } from "@utils/api/endpoints"

type QueryParamType = GeneralQueryParam & OrdersQueryParam;

const fetchOrders = async ({ queryKey }: QueryParamsType) => {
    const {
        limit = 20,
        page = 1,
        text,
        currentOrPastOrders,
        status,
        orderType,
        startDate,
        endDate,
        userId,
        driverId
    } = queryKey[1] as QueryParamType;
    const url = `${API_ENDPOINTS.USER_ORDERS_FOR_ADMIN}?limit=${limit}&page=${page}${text ? `&text=${text}` : ""}${currentOrPastOrders ? `&currentOrders=${currentOrPastOrders}` : ""}${status ? `&status=${status}` : ""}${orderType ? `&orderType=${orderType}` : ""}${startDate ? `&startDate=${startDate}` : ""}${endDate ? `&endDate=${endDate}` : ""}${userId ? `&userId=${userId}` : ''}${driverId ? `&driverId=${driverId}` : ''}`
    const { data: { docs, ...rest } } = await orders.getUserOrdersForAdmin(url)
    return { orders: { data: docs, paginatorInfo: rest } }
}

const useUserOrdersForAdminQuery = (options: QueryParamType) => {
    return useQuery<{ orders: IPaginator<Order> }, Error>(
        [API_ENDPOINTS.USER_ORDERS_FOR_ADMIN, options],
        fetchOrders,
        {
            keepPreviousData: true,
            staleTime: 270000 // 270000ms is 4.5 minutes while cache time is 5 minutes by default
        }
    )
}

export { fetchOrders, useUserOrdersForAdminQuery }