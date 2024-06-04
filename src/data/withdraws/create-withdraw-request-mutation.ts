import { WithdrawRequest } from "@ts-types/generated";
import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import withdraws from "@repositories/withdraws";


export const useCreateWithdrawRequestMutation = () => {
    const { t } = useTranslation();
    const queryClient = useQueryClient();
    return useMutation(
        (input: WithdrawRequest) =>
            withdraws.createWithdrawRequest(API_ENDPOINTS.CREATE_WITHDRAW_REQUEST, input),
        {
            onSuccess: () => {
                toast.success(t("Created successfully"), { duration: 4000 });
            },
            onSettled: () => {
                queryClient.invalidateQueries({
                    queryKey: [API_ENDPOINTS.MERCHANT_WITHDRAWS]
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
