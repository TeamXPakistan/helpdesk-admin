import Adminlayout from '@layouts/admin-layout'
import { superAdmin_and_AdminStaff } from '@utils/auth-utils'
import { AdminStaffPermissions } from '@utils/constants'
import React, { ReactNode } from 'react'
import UsersHelpersFeedbackTabs from 'src/views/components/tabs/UsersHelpersFeedbackTabs'

const HelpersFeedbackPage = () => {
    return (
        <div>
            <h1>Helpers Feedback Page</h1>
            <UsersHelpersFeedbackTabs feedbackTable="Feedback Table" reviewsTable="Reviews Table" />
        </div>
    )
}

HelpersFeedbackPage.authProps = {
    allowedRoles: superAdmin_and_AdminStaff,
    adminStaffPermissions: [AdminStaffPermissions.USERS]
}

HelpersFeedbackPage.getLayout = (page: ReactNode) => <Adminlayout>{page}</Adminlayout>

export default HelpersFeedbackPage;