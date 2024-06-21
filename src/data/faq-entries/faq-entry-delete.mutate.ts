import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import faqEntries from "@repositories/faq-entries";

export const useDeleteFaqEntryMutation = () => {
    const { t } = useTranslation();
    const queryClient = useQueryClient();

    return useMutation(
        ({ id, title, description }: { title: string, description: string, id: string }) =>
            faqEntries.deleteFaq(`${API_ENDPOINTS.DELETE_FAQ_ENTRY}/${id}`,),
        {
            onSuccess: () => {
                toast.success(t("FAQ Entry deleted successfully"), { duration: 4000 });
            },
            onSettled: () => {
                queryClient.invalidateQueries({
                    queryKey: [API_ENDPOINTS.FAQ_ENTRIES]
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