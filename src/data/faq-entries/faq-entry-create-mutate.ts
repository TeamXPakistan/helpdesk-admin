import {CreateFaqEntryInput } from "@ts-types/generated";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import adminStaff from "@repositories/admin-staff";
import faqEntries from "@repositories/faq-entries";

export const useCreateFaqMutation = () => {
    const { t } = useTranslation();
    const router = useRouter();
    const queryClient = useQueryClient();
    return useMutation(
        (faqInput: CreateFaqEntryInput) =>
            faqEntries.createFaq(`${API_ENDPOINTS.CREATE_FAQ_ENTRY}`, faqInput), 
        {
            
            onSuccess: () => {
                toast.success(t("FAQ created successfully"), { duration: 4000 });
             
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
