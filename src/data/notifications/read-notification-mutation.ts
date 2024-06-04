import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import notifications from "@repositories/notifications";


export const useReadNotificationMutation = () => {
    const { t } = useTranslation();
    const queryClient = useQueryClient();
    return useMutation(
        ({ notificationId }: { notificationId: string }) =>
            notifications.readNotification(`${API_ENDPOINTS.READ_NOTIFICATION}/${notificationId}`),
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
