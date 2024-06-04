import shop from "@repositories/shop"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { UpdateShop } from "@ts-types/generated"
import { API_ENDPOINTS } from "@utils/api/endpoints"
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"


const useUpdateShopMutation = () => {
    const { t } = useTranslation(['form'])
    const queryClient = useQueryClient();
    return useMutation(
        (shopInput: UpdateShop) => {
            return shop.updateShop(`${API_ENDPOINTS.UPDATE_SHOP}/${shopInput._id}`, shopInput)
        },
        {
            onSuccess: () => {
                toast.success("Shop updated successfully")
            },
            onSettled: () => {
                queryClient.invalidateQueries({
                    queryKey: [API_ENDPOINTS.SHOPS]
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
    )
}

export { useUpdateShopMutation }