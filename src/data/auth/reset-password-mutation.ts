import { useMutation } from "@tanstack/react-query"
import { ResetPasswordInput } from "@ts-types/generated"
import Auth from '@repositories/auth'
import { API_ENDPOINTS } from "@utils/api/endpoints"
import toast from "react-hot-toast"


export const useResetPasswordMutation = () => {

    return useMutation(
        (resetPasswordValues: ResetPasswordInput) => {
            return Auth.resetPassword(API_ENDPOINTS.RESET_PASSWORD, resetPasswordValues)
        },
        {
            onSuccess: ({ data }: { data: any }) => {
                toast.success(data.message, { duration: 5000 })
            },
            onError: (error: any) => {
                console.log("ERROR", error)
                // toast.error(
                //   error?.response?.data?.message
                //     ? Array.isArray(error?.response?.data?.message)
                //       ? error?.response?.data?.message[0]
                //       : error?.response?.data?.message
                //     : t('errors.something-went-wrong')
                // )
            }
        }
    )
}