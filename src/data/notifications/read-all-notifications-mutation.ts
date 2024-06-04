import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import notifications from "@repositories/notifications";


export const useReadAllNotificationsMutation = () => {
    const { t } = useTranslation();
    const queryClient = useQueryClient();
    return useMutation(
        () =>
            notifications.readAllNotifications(`${API_ENDPOINTS.READ_ALL_NOTIFICATIONS}`),
        {
            onSettled: () => {
                queryClient.invalidateQueries({
                    queryKey: [API_ENDPOINTS.NOTIFICATIONS]
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
