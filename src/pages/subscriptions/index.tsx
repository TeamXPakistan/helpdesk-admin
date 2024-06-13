import CardSupport from '@components/subscriptions/subscriptionsCard'
import Subscriptions from '@components/subscriptions/subscriptionsCard'
import AdminLayout from '@layouts/admin-layout'
import { superAdmin_and_AdminStaff } from '@utils/auth-utils'
import { AdminStaffPermissions } from '@utils/constants'
import React, { ReactNode } from 'react'


const index = () => {
  return (
    <div>
        <Subscriptions/>
    </div>
  )
}

index.authProps = {
    allowedRoles: superAdmin_and_AdminStaff,
    adminStaffPermissions: [AdminStaffPermissions.USERS]
  }
  
  index.getLayout = (page: ReactNode) => <AdminLayout>{page}</AdminLayout>

export default index
