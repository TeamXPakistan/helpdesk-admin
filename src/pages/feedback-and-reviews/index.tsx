import Adminlayout from '@layouts/admin-layout'
import { superAdmin_and_AdminStaff } from '@utils/auth-utils'
import { AdminStaffPermissions } from '@utils/constants'
import React, { ReactNode } from 'react'

const FeedBackAndReviewsPage = () => {
    return (
        <div>
            Main Page
        </div>
    )
}

FeedBackAndReviewsPage.authProps = {
    allowedRoles: superAdmin_and_AdminStaff,
    adminStaffPermissions: [AdminStaffPermissions.USERS]
}

FeedBackAndReviewsPage.getLayout = (page: ReactNode) => <Adminlayout>{page}</Adminlayout>

export default FeedBackAndReviewsPage