import { useMutation, useQueryClient } from '@tanstack/react-query';
import { API_ENDPOINTS } from '@utils/api/endpoints';
import toast from 'react-hot-toast'
import users from '@repositories/users';
import { useTranslation } from 'react-i18next';
import { UserBanPayload } from '@ts-types/generated';

export const useUpdateUserMutation = () => {
    const queryClient = useQueryClient();
    const { t } = useTranslation("form")

    return useMutation(
        (input: UserBanPayload) => users.update(`${API_ENDPOINTS.USER_STATUS}`, input),
        {
            onSuccess: () => {
                toast.success(t("Successfully Updated"))
            },
            onError: (error: any) => {
                toast.error(
                    typeof error?.response?.data?.message === 'string'
                        ? error?.response?.data?.message
                        : error?.response?.data?.message?.[0]
                );
            },

            // Always refetch after error or success:
            onSettled: () => {
                queryClient.invalidateQueries([API_ENDPOINTS.USERS]);
            },
        }
    );
};
