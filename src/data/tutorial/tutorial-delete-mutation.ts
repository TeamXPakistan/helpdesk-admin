import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { DeleteTutorial, UpdateFaqEntryInput } from "@ts-types/generated";
import tutorial from "@repositories/tutorial";

export const useDeleteTutorialMutation = () => {
    const { t } = useTranslation();
    const queryClient = useQueryClient();

    return useMutation(
        (tutorialInput: DeleteTutorial) => {

            return tutorial.deleteTutorial(`${API_ENDPOINTS.DELETE_TUTORIAL}/${tutorialInput?.id}`)
        },
        
        {
            onSuccess: () => {
                toast.success(t("Tutorial deleted successfully"), { duration: 4000 });
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