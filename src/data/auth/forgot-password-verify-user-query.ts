import Auth from "@repositories/auth"
import { useQuery } from "@tanstack/react-query"
import { API_ENDPOINTS } from "@utils/api/endpoints"


export const verifyUser = async (token: string | undefined) => {
    const { data } = await Auth.forgotPasswordVerifyUser(`${API_ENDPOINTS.FORGOT_PASSWORD_VERIFY_USER}/${token}`)
    return data
}

export const useVerifyUserQuery = (token: string | undefined, options?: any) => {
    return useQuery<{ success: boolean }, Error>([API_ENDPOINTS.FORGOT_PASSWORD_VERIFY_USER], () => verifyUser(token), {
        ...options,
        refetchOnWindowFocus: false,
        cacheTime: 0,
        staleTime: 0,
        retry: 2
    })
}