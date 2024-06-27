import { CreateTutorialEntryInput } from "@ts-types/generated";
import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import tutorial from "@repositories/tutorial";

export const useCreateTutorialMutation = () => {
    const { t } = useTranslation();

    const queryClient = useQueryClient();
    return useMutation(
        (tutorialInput: CreateTutorialEntryInput) =>
            tutorial.createTutorial(`${API_ENDPOINTS.CREATE_TUTORIAL}`, tutorialInput), 
        {
            
            onSuccess: () => {
                toast.success(t("Tutorial created successfully"), { duration: 4000 });
             
            },
            onSettled: () => {
                queryClient.invalidateQueries({
                    queryKey: [API_ENDPOINTS.TUTORIAL]
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
