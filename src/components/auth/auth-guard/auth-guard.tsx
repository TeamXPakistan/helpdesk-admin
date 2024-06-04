import { ReactNode, useEffect } from 'react'
import { allRoles, hasAccess, removeLocalForageAuthToken, staffHasPermission } from '@utils/auth-utils'
import FallbackSpinner from '@components/common/spinner/fall-back-spinner'
import AccessDenied from '@components/common/access-denied'
import { AuthProps } from '@ts-types/generated'
import { useAuthCredentials } from '@store/apps/auth'
import { useRouter } from 'next/router'
import { ROUTES } from '@utils/routes'
import { ADMIN_STAFF, STORE_OWNER, SUPER_ADMIN, ShopApprovalStatus } from '@utils/constants'

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
  hasPermission = hasAccess(authProps.allowedRoles, authValues.role) &&
    (authProps.allowedShops ? hasAccess(authProps.allowedShops, authValues.user?.shop?.type) : true) &&
    (authValues?.role === ADMIN_STAFF && authProps.adminStaffPermissions ? staffHasPermission(authProps.adminStaffPermissions, authValues.user?.dynamicRole?.permissions) : true)

  useEffect(() => {

    // checking if merchant has created shop.
    if (isUser && hasPermission &&
      authValues.role === STORE_OWNER &&
      authValues.role !== SUPER_ADMIN as string &&
      !authValues.user?.shop
    ) {
      router.push(ROUTES.CREATE_SHOP);
    }

    // checking if merchant's shop is approved by admin.
    if (
      authValues.role === STORE_OWNER &&
      (authValues.user?.shop?.status === ShopApprovalStatus.reject || authValues.user?.shop?.status === ShopApprovalStatus.pending) &&
      !router?.asPath.includes(ROUTES.EDIT_SHOP) &&
      !router?.asPath.includes(ROUTES.PROFILE)
    ) {
      router.push(ROUTES.DASHBOARD + authValues.user?.shop?._id)
    }
  }, [authValues.user, router.asPath])

  // checking if the logged in user has proper role. 
  if (authValues.role && !allRoles?.includes(authValues.role as string)) {
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
