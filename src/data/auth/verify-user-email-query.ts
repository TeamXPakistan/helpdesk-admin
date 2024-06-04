import Auth from "@repositories/auth"
import { useQuery } from "@tanstack/react-query"
import { User } from "@ts-types/generated";
import { API_ENDPOINTS } from "@utils/api/endpoints"


export const verifyEmail = async (token: string | undefined) => {
    const { data } = await Auth.find(`${API_ENDPOINTS.VERIFY_EMAIL}/${token}`)
    return data
}


export const useVerifyEmailQuery = (token: string | undefined, options?: any) => {
    return useQuery<User, Error>([API_ENDPOINTS.VERIFY_EMAIL], () => verifyEmail(token), {
        ...options,
        retry: false,
        refetchOnWindowFocus: false,
        cacheTime: 0,
        staleTime: 0
    })
}