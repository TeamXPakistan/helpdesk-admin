import { allRoles } from '@utils/auth-utils'
import { ReactNode } from 'react'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import FallbackSpinner from '@components/common/spinner/fall-back-spinner'
import { ADMIN_STAFF, STORE_OWNER, SUPER_ADMIN } from '@utils/constants'
import AppLayout from 'src/layouts/app-layout'
import { useAuthCredentials } from '@store/apps/auth'
import AdminDashboardHd from '@components/dashboardHd/admin-dashboardHd/dashboard'

// const AdminDashboard = dynamic(() => import('@components/dashboard/admin-dashboard/dashboard'))

const Home = () => {
  const { authValues } = useAuthCredentials()
  const router = useRouter()

  if (authValues?.role === SUPER_ADMIN || authValues?.role === ADMIN_STAFF) {
    return <AdminDashboardHd />
  }
  if (authValues?.role == STORE_OWNER && authValues.user?.shop) {
    router?.push(authValues?.user?.shop?._id as string)
  }
  return <FallbackSpinner />
}

Home.authProps = {
  allowedRoles: allRoles,
}
Home.getLayout = (page: ReactNode) => {
  return <AppLayout page={page} />
}

export default Home




























// import { allRoles } from '@utils/auth-utils'
// import { ReactNode } from 'react'
// import { useRouter } from 'next/router'
// import dynamic from 'next/dynamic'
// import FallbackSpinner from '@components/common/spinner/fall-back-spinner'
// import { ADMIN_STAFF, STORE_OWNER, SUPER_ADMIN } from '@utils/constants'
// import AppLayout from 'src/layouts/app-layout'
// import { useAuthCredentials } from '@store/apps/auth'

// const AdminDashboard = dynamic(() => import('@components/dashboard/admin-dashboard/dashboard'))

// const Home = () => {
//   const { authValues } = useAuthCredentials()
//   const router = useRouter()

//   if (authValues?.role === SUPER_ADMIN || authValues?.role === ADMIN_STAFF) {
//     return <AdminDashboard />
//   }
//   if (authValues?.role == STORE_OWNER && authValues.user?.shop) {
//     router?.push(authValues?.user?.shop?._id as string)
//   }
//   return <FallbackSpinner />
// }

// Home.authProps = {
//   allowedRoles: allRoles,
// }
// Home.getLayout = (page: ReactNode) => {
//   return <AppLayout page={page} />
// }

// export default Home
