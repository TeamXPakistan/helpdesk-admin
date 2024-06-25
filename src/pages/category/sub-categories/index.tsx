import AdminLayout from '@layouts/admin-layout'
import { superAdmin_and_AdminStaff } from '@utils/auth-utils'
import { AdminStaffPermissions } from '@utils/constants'
import React, { ReactNode } from 'react'

const SubCategories = () => {
    return (
        <div>
            sub category
        </div>
    )
}
SubCategories.authProps = {
    allowedRoles: superAdmin_and_AdminStaff,
    adminStaffPermissions: [AdminStaffPermissions.USERS]
}
SubCategories.getLayout = (page: ReactNode) => <AdminLayout>{page}</AdminLayout>
export default SubCategories
