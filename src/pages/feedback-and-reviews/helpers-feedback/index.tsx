import CustomButton from '@components/common/Button/custom-button'
import Adminlayout from '@layouts/admin-layout'
import { Card, CardContent, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useModal } from '@store/apps/modal'
import { UserType } from '@utils/constants'
import React, { ReactNode } from 'react'
import UsersHelpersFeedbackTabs from 'src/views/components/tabs/UsersHelpersFeedbackTabs'

const HelpersFeedbackPage = () => {
    const { openModal } = useModal();
    return (
        <>
            <Box sx={{ gap: 4, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', mb: 8 }}>
                <Typography variant='h4' sx={{ color: "text.primary" }}>Helpers Feedback</Typography>
                <Box sx={{ gap: 4, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
                    <CustomButton
                        type="button"
                        variant='contained'
                        fullWidth={false}
                        onClick={() => openModal({ view: "BAN_UNBAN_HELPER_MODAL" })}
                    >
                        Ban/UnBan Helper
                    </CustomButton>
                </Box>
            </Box>

            <Card sx={{ borderRadius: 2 }}>
                <CardContent>
                    <UsersHelpersFeedbackTabs
                        feedbackTable="Feedbacks"
                        reviewsTable="Reviews"
                        userHelpersId={UserType.HELP_DESK}
                    />
                </CardContent>
            </Card>
        </>
    )
}

// HelpersFeedbackPage.authProps = {
//     allowedRoles: superAdmin_and_AdminStaff,
//     adminStaffPermissions: [AdminStaffPermissions.USERS]
// }

HelpersFeedbackPage.getLayout = (page: ReactNode) => <Adminlayout>{page}</Adminlayout>

export default HelpersFeedbackPage