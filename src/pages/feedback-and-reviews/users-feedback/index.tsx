import CustomError from '@components/common/error/custom-error'
import Spinner from '@components/common/spinner/spinner'
import Adminlayout from '@layouts/admin-layout'
import { Card, CardContent, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { superAdmin_and_AdminStaff } from '@utils/auth-utils'
import { AdminStaffPermissions } from '@utils/constants'
import React, { ReactNode, useState } from 'react'
import UsersHelpersFeedbackTabs from 'src/views/components/tabs/UsersHelpersFeedbackTabs'

const UsersFeedbackPage = () => {

    return (
        <>
            <Box sx={{ gap: 4, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', mb: 8 }}>
                <Typography variant='h4' sx={{ color: "text.primary" }}>Users Feedback Page</Typography>
            </Box>

            <Card sx={{ borderRadius: 2 }}>
                <CardContent>
                    <UsersHelpersFeedbackTabs
                        feedbackTable="Feedback Table"
                        reviewsTable="Reviews Table"
                        userHelpersId="1"
                    />
                </CardContent>
            </Card>
        </>
    )
}

UsersFeedbackPage.authProps = {
    allowedRoles: superAdmin_and_AdminStaff,
    adminStaffPermissions: [AdminStaffPermissions.USERS]
}

UsersFeedbackPage.getLayout = (page: ReactNode) => <Adminlayout>{page}</Adminlayout>

export default UsersFeedbackPage