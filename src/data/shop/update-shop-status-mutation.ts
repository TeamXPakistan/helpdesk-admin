import { ChangeShopStatus } from "@ts-types/generated";
import Shop from "@repositories/shop";
import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { API_ENDPOINTS } from "@utils/api/endpoints";

export const useUpdateShopStatusMutation = () => {
    const { t } = useTranslation();
    const queryClient = useQueryClient();
    return useMutation(
        (statusInput: ChangeShopStatus) =>
            Shop.updateShopStatus(API_ENDPOINTS.SHOP_STATUS, statusInput),
        {
            onSuccess: () => {
                toast.success(t("Status updated Successfully"), { duration: 4000 });
            },
            onSettled: () => {
                queryClient.invalidateQueries({
                    queryKey: [API_ENDPOINTS.SHOPS]
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
