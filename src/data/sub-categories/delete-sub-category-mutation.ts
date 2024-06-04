import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import subCategories from "@repositories/sub-categories";

export const useDeleteSubCategoryMutation = () => {
    const { t } = useTranslation();
    const queryClient = useQueryClient();
    return useMutation(
        (subCategoryId: string) =>
            subCategories.deleteSubCategory(`${API_ENDPOINTS.DELETE_SUB_CATEGORY}/${subCategoryId}`),
        {
            onSuccess: () => {
                toast.success(t("Deleted successfully"), { duration: 4000 });
            },
            onSettled: () => {
                queryClient.invalidateQueries({
                    queryKey: [API_ENDPOINTS.SUB_CATEGORIES_BY_SHOP]
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
