import Auth from '@repositories/auth'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

export const useLogoutUserMutation = () => {
  const { t } = useTranslation(['form'])

  return useMutation(
    Auth.logout,
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
