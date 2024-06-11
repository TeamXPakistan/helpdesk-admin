import Adminlayout from '@layouts/admin-layout'
import { Tabs } from '@mui/material'
import { superAdmin_and_AdminStaff } from '@utils/auth-utils'
import { AdminStaffPermissions } from '@utils/constants'
import React, { ReactNode, useState } from 'react'
import UsersHelpersFeedbackTabs from 'src/views/components/tabs/UsersHelpersFeedbackTabs'

const UsersFeedbackPage = () => {

    const [page, setPage] = useState<number>(1)

    return (
        <div>
            <h1>Users Feedback Page</h1>
            <UsersHelpersFeedbackTabs
                feedbackTable="Feedback Table"
                reviewsTable="Reviews Table"
            // onPaginationChange={onPageChange}
            />
        </div>
    )
}

UsersFeedbackPage.authProps = {
    allowedRoles: superAdmin_and_AdminStaff,
    adminStaffPermissions: [AdminStaffPermissions.USERS]
}

UsersFeedbackPage.getLayout = (page: ReactNode) => <Adminlayout>{page}</Adminlayout>

export default UsersFeedbackPage