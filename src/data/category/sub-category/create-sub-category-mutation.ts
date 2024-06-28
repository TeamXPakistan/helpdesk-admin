import { CreateSubCategoryInput } from "@ts-types/generated";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import adminStaff from "@repositories/admin-staff";
import subCategories from "@repositories/sub-categories";

export const useCreateSubCategoryMutation = () => {
    const { t } = useTranslation();
    const router = useRouter();
    const queryClient = useQueryClient();
    return useMutation(
        (categoryInput: CreateSubCategoryInput) => {
            return (subCategories.createSubCateorgy(`${API_ENDPOINTS.CREATE_SUB_CATEGORY}`,
                categoryInput)
            )
        },
        {
            onSuccess: () => {
                toast.success(t("SubCategory Created Successfully"), { duration: 4000 });
                router.back();
            },
            onSettled: () => {
                queryClient.invalidateQueries({
                    queryKey: [API_ENDPOINTS.SUB_CATEGORIES]
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
