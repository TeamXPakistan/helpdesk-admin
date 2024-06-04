import shop from "@repositories/shop"
import { useMutation } from "@tanstack/react-query"
import { CreateShop } from "@ts-types/generated"
import { API_ENDPOINTS } from "@utils/api/endpoints"
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"


const useCreateShopMutation = () => {
    const { t } = useTranslation(['form'])

    return useMutation(
        (shopInput: CreateShop) => {
            return shop.createShop(API_ENDPOINTS.CREATE_SHOP, shopInput)
        },
        {
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

export { useCreateShopMutation }