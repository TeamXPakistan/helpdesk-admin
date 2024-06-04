import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import orders from "@repositories/orders";


export const useCancelOrderMutation = () => {
    const { t } = useTranslation();
    const queryClient = useQueryClient();
    return useMutation(
        (orderId: string) =>
            orders.canceleOrder(`${API_ENDPOINTS.CANCEL_ORDER}/${orderId}`),
        {
            onSuccess: () => {
                toast.success(t("Order cancelled successfully"), { duration: 4000 });
            },
            onSettled: () => {
                queryClient.invalidateQueries({
                    queryKey: [API_ENDPOINTS.ORDERS]
                });
            },
            onError: (error: any) => {
                toast.error(
                    error?.response?.data?.message
                        ? Array.isArray(error?.response?.data?.message)
                            ? error?.response?.data?.message[0]
                            : error?.response?.data?.message
                        : t('errors.something-went-wrong')
                )
            }
        }
    );
};
