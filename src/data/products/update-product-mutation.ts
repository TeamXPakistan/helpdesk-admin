import { UpdateProduct } from "@ts-types/generated";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import products from "@repositories/products";


export const useUpdateProductMutation = () => {
    const { t } = useTranslation();
    const router = useRouter();
    const queryClient = useQueryClient();
    return useMutation(
        (productInput: UpdateProduct) =>
            products.updateProduct(`${API_ENDPOINTS.UPDATE_PRODUCT}/${productInput._id}`, productInput),
        {
            onSuccess: () => {
                toast.success(t("Product updated successfully"), { duration: 4000 });
                router.back();
            },
            onSettled: () => {
                queryClient.invalidateQueries({
                    queryKey: [API_ENDPOINTS.PRODUCTS]
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
