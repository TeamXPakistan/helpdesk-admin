import CustomButton from '@components/common/Button/custom-button'
import Adminlayout from '@layouts/admin-layout'
import { Card, CardContent, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useModal } from '@store/apps/modal'
import { superAdmin_and_AdminStaff } from '@utils/auth-utils'
import { AdminStaffPermissions, UserHelpDeskId } from '@utils/constants'
import React, { ReactNode, useState } from 'react'
import UsersHelpersFeedbackTabs from 'src/views/components/tabs/UsersHelpersFeedbackTabs'

const UsersFeedbackPage = () => {
    const { openModal } = useModal();

    return (
        <>
            <Box sx={{ gap: 4, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', mb: 8 }}>
                <Typography variant='h4' sx={{ color: "text.primary" }}>Users Feedback</Typography>
                <Box sx={{ gap: 4, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
                    <CustomButton
                        type="button"
                        variant='contained'
                        fullWidth={false}
                        onClick={() => openModal({ view: "BAN_UNBAN_USER_MODAL" })} >
                        Ban/UnBan User
                    </CustomButton>
                </Box>
            </Box>

            <Card sx={{ borderRadius: 2 }}>
                <CardContent>
                    <UsersHelpersFeedbackTabs
                        feedbackTable="Feedbacks"
                        reviewsTable="Reviews"
                        userHelpersId={UserHelpDeskId.USER}
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