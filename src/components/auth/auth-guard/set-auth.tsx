import { useAuthCredentials } from '@store/apps/auth'
import { getLocalForageAuthToken, removeLocalForageAuthToken } from '@utils/auth-utils'
import { ReactNode } from 'react'
import { useMeQuery } from '@data/auth/me-query'
import { useRouter } from 'next/router'
import { User } from '@ts-types/generated'
import { ROUTES } from '@utils/routes'
import { setNetworkError } from '@store/apps/networkError'

const SetAuth = ({ children }: { children: ReactNode }) => {
  const { setCredentials, removeCredentials } = useAuthCredentials()
  const router = useRouter()

  useMeQuery({
    onSuccess: async (data: User) => {

      if (data?.hasOwnProperty('role')) {
        setCredentials({ role: data?.role?.name, token: await getLocalForageAuthToken(), user: data })
      }
    },
    onError: (error: any) => {
      if (error.response) {
        removeLocalForageAuthToken()
        removeCredentials()
        router.replace(ROUTES.LOGIN)
      }
      if (!error.response) {
        setNetworkError(true)
      }
    }
  })

  return <>{children}</>
}

export default SetAuth
