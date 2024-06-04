import Auth from '@repositories/auth'
import { useMutation } from '@tanstack/react-query'
import { RegisterInput } from '@ts-types/generated'
import { API_ENDPOINTS } from '@utils/api/endpoints'
import { ROUTES } from '@utils/routes'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'

export const useRegisterUserMutation = () => {
  const router = useRouter()

  return useMutation(
    (registerInput: RegisterInput): any => {
      return Auth.register(API_ENDPOINTS.REGISTER, registerInput)
    },
    {
      onSuccess: ({ data }: { data: any }) => {
        toast.success(data.message, { duration: 5000 })
        router.push(ROUTES.LOGIN)
      },
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
