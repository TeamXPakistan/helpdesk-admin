import { ADMIN_STAFF, SUPER_ADMIN } from '@utils/constants'
import { ReactNode } from 'react'
import AdminLayout from './admin-layout'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import { useAuthCredentials } from '@store/apps/auth'

const AppLayout = ({ page }: { page: ReactNode }) => {
  const { authValues } = useAuthCredentials()

  if (authValues?.role === SUPER_ADMIN || authValues?.role === ADMIN_STAFF) {
    return <AdminLayout>{page}</AdminLayout>
  }

  return <BlankLayout>{page}</BlankLayout>

}

export default AppLayout
