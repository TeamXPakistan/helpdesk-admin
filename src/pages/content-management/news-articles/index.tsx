import AdminLayout from '@layouts/admin-layout'
import { superAdmin_and_AdminStaff } from '@utils/auth-utils'
import { AdminStaffPermissions } from '@utils/constants'
import React, { ReactNode } from 'react'

const index = () => {
  return (
    <div>index</div>
  )
}

index.authProps = {
    allowedRoles: superAdmin_and_AdminStaff,
    adminStaffPermissions: [AdminStaffPermissions.USERS]
  }
  
  index.getLayout = (page: ReactNode) => <AdminLayout>{page}</AdminLayout>

export default index