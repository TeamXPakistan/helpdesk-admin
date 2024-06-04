import { CreateSubCategory } from "@ts-types/generated";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import subCategories from "@repositories/sub-categories";


export const useCreateSubCategoryMutation = () => {
    const { t } = useTranslation();
    const router = useRouter();
    const queryClient = useQueryClient();
    return useMutation(
        (subCategoryInput: CreateSubCategory) =>
            subCategories.createSubCategories(API_ENDPOINTS.CREATE_SUB_CATEGORY, subCategoryInput),
        {
            onSuccess: () => {
                toast.success(t("Sub category created successfully"), { duration: 4000 });
                router.back();
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
