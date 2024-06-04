import { useState } from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import { useAuthCredentials } from '@store/apps/auth'
import Typography from '@mui/material/Typography'
import CustomAvatar from 'src/@core/components/mui/avatar'
import UserSubscriptionDialog from 'src/views/apps/user/view/UserSubscriptionDialog'
import UserSuspendDialog from 'src/views/apps/user/view/UserSuspendDialog'
import { ThemeColor } from 'src/@core/layouts/types'
import { useTranslation } from 'react-i18next'

const UserInfo = () => {

    const { authValues } = useAuthCredentials()
    const { t } = useTranslation(["form", "common"]);
    const [suspendDialogOpen, setSuspendDialogOpen] = useState<boolean>(false)
    const [subscriptionDialogOpen, setSubscriptionDialogOpen] = useState<boolean>(false)

    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <Card>
                    <CardContent sx={{ pt: 13.5, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                        {authValues.user?.profileImage ? (
                            <CustomAvatar
                                src={authValues.user?.profileImage}
                                variant='rounded'
                                alt={authValues.user?.name}
                                sx={{ width: 130, height: 130, mb: 4 }}
                            />
                        ) : (
                            <CustomAvatar
                                skin='light'
                                variant='rounded'
                                color={"primary" as ThemeColor}
                                sx={{ width: 100, height: 100, mb: 4, fontSize: '2rem' }}
                            >
                                {authValues.user?.name}
                            </CustomAvatar>
                        )}
                        <Typography variant='h4' sx={{ mb: 3, fontWeight: "700", color: "text.black", fontSize: "1.2rem" }}>
                            {authValues.user?.name}
                        </Typography>
                    </CardContent>

                    <CardContent sx={{ pb: 4 }}>
                        <Typography variant='h6' sx={{ textTransform: 'uppercase', color: "text.black", fontSize: "0.95rem", fontWeight: "900", mb: 3 }}>
                            {t("common:profile-information")}
                        </Typography>

                        <Box sx={{ pt: 4 }}>
                            <Box sx={{ display: 'flex', mb: 3, flexDirection: "column" }}>
                                <Typography variant='h6' sx={{ textTransform: 'uppercase', color: "text.black", fontSize: "0.85rem", fontWeight: "900", mb: 1 }}>
                                    {t("form:form-register-email-label")}
                                </Typography>
                                <Typography sx={{ color: 'text.light', fontSize: "0.9rem", fontWeight: "500" }}>@{authValues.user?.email}</Typography>
                            </Box>

                            <Box sx={{ display: 'flex', mb: 3, flexDirection: "column" }}>
                                <Typography variant='h6' sx={{ textTransform: 'uppercase', color: "text.black", fontSize: "0.85rem", fontWeight: "900", mb: 1 }}>
                                    {t("common:mobile-number")}
                                </Typography>
                                <Typography sx={{ color: 'text.light', fontSize: "0.9rem", fontWeight: "500" }}>{authValues.user?.contact}</Typography>
                            </Box>
                        </Box>
                    </CardContent>

                    <UserSuspendDialog open={suspendDialogOpen} setOpen={setSuspendDialogOpen} />
                    <UserSubscriptionDialog open={subscriptionDialogOpen} setOpen={setSubscriptionDialogOpen} />
                </Card>
            </Grid>
        </Grid >
    )
}

export default UserInfo