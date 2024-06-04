import Auth from '@repositories/auth'
import { useMutation } from '@tanstack/react-query'
import { loginInput } from '@ts-types/generated'
import { API_ENDPOINTS } from '@utils/api/endpoints'

export const useLoginUserMutation = () => {

  return useMutation(
    (loginInput: loginInput) => {
      return Auth.login(API_ENDPOINTS.LOGIN, loginInput)
    },
    {
      onError: (
        // error: any
      ) => {
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
