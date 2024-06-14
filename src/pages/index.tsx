import { allRoles } from '@utils/auth-utils'
import { ReactNode } from 'react'
import FallbackSpinner from '@components/common/spinner/fall-back-spinner'
import { ADMIN_STAFF, SUPER_ADMIN } from '@utils/constants'
import AppLayout from 'src/layouts/app-layout'
import { useAuthCredentials } from '@store/apps/auth'
import AdminDashboard from '@components/dashboard/admin-dashboard/dashboard'
import StaffDashboard from '@components/dashboard/staff-dashboard/dashboard'

const Home = () => {
  const { authValues } = useAuthCredentials()

  if (authValues?.role === SUPER_ADMIN) {
    return <AdminDashboard />
  }
  if (authValues?.role === ADMIN_STAFF) {
    return <StaffDashboard />
  }
  return <FallbackSpinner />
}

Home.authProps = {
  allowedRoles: allRoles,
}

Home.getLayout = (page: ReactNode) => {
  return <AppLayout page={page} />
}

export default Home;
