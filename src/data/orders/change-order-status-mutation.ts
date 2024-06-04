import { ChangeOrderStatus } from "@ts-types/generated";
import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import orders from "@repositories/orders";


export const useChangeOrderStatusMutation = () => {
    const { t } = useTranslation();
    const queryClient = useQueryClient();
    return useMutation(
        (statusInput: ChangeOrderStatus) =>
            orders.changeOrderStatus(`${API_ENDPOINTS.UPDATE_ORDER_STATUS}`, statusInput),
        {
            onSuccess: () => {
                toast.success(t("Status changed successfully"), { duration: 4000 });
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
