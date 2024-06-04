import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import ShopCategories from "@repositories/shop-categories";


export const useDeleteShopCategoryMutation = () => {
    const { t } = useTranslation();
    const queryClient = useQueryClient();
    return useMutation(
        (categoryId: string) =>
            ShopCategories.deleteShopCategory(`${API_ENDPOINTS.DELETE_SHOP_CATEGORY}/${categoryId}`),
        {
            onSuccess: () => {
                toast.success(t("Deleted successfully"), { duration: 4000 });
            },
            onSettled: () => {
                queryClient.invalidateQueries({
                    queryKey: [API_ENDPOINTS.SHOP_CATEGORIES]
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
