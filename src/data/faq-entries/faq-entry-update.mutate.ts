import { useMutation, useQueryClient } from '@tanstack/react-query';
import { API_ENDPOINTS } from '@utils/api/endpoints';
import toast from 'react-hot-toast'
import users from '@repositories/users';
import { useTranslation } from 'react-i18next';
import { UpdateFaqEntryInput } from '@ts-types/generated';

export const UseFaqEntryUpdateMutation = () => {
    const queryClient = useQueryClient();
    const { t } = useTranslation("form")

    return useMutation(
        (input: UpdateFaqEntryInput) => users.update(`${API_ENDPOINTS.UPDATE_FAQ_ENTRY}/${input?.id}`, input),
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
                queryClient.invalidateQueries([API_ENDPOINTS.FAQ_ENTRIES]);
            },
        }
    );
};
