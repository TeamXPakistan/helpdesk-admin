import { ReactNode } from 'react'
import { allRoles, hasAccess, removeLocalForageAuthToken, staffHasPermission } from '@utils/auth-utils'
import FallbackSpinner from '@components/common/spinner/fall-back-spinner'
import AccessDenied from '@components/common/access-denied'
import { AuthProps } from '@ts-types/generated'
import { useAuthCredentials } from '@store/apps/auth'
import { useRouter } from 'next/router'
import { ROUTES } from '@utils/routes'
import { ADMIN_STAFF } from '@utils/constants'

type PropTypes = {
  children: ReactNode
  authProps: AuthProps
}

const AuthGuard = ({ children, authProps }: PropTypes) => {
  const { authValues } = useAuthCredentials()
  const router = useRouter()

  let isUser: boolean | null
  let hasPermission: boolean | null

  isUser = !!authValues.token
  hasPermission = hasAccess(authProps.allowedRoles, authValues?.user?.role?.name) &&
    (authValues?.user?.role?.name === ADMIN_STAFF && authProps.adminStaffPermissions ? staffHasPermission(authProps.adminStaffPermissions, authValues?.user?.role?.roles) : true)


  // checking if the logged in user has proper role. 
  if (authValues?.user?.role?.name && !allRoles?.includes(authValues?.user?.role?.name as string)) {
    removeLocalForageAuthToken()
    router.push(ROUTES.LOGIN)
  }

  if (isUser && !hasPermission) {
    return <AccessDenied />
  }

  if (isUser && hasPermission) {
    return <>{children}</>
  }

  return (
    <>
      <FallbackSpinner />
    </>
  )
}

export default AuthGuard
