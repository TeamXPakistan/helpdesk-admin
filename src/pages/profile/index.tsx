import ProfileSetting from "@components/profile/profile-settings"
import UserInfo from "@components/profile/user-info"
import StoreOwnerLayout from "@layouts/store-owner-layout"
import Box from "@mui/material/Box"
import Grid from '@mui/material/Grid'
import Typography from "@mui/material/Typography"
import { superAdmin_AdminStaff_and_StoreOwner } from "@utils/auth-utils"
import { ReactNode } from "react"
import { useTranslation } from "react-i18next"


export const ProfileIndex = () => {
    const { t } = useTranslation("common");
    return (
        <>
            <Box>
                <Box sx={{ mb: 5 }}>
                    <Typography variant='h3' sx={{ color: "primary.main", fontWeight: 800 }} >{t("common:vendor-profile")}</Typography>
                </Box>
                <Grid container spacing={6}>
                    <Grid item xs={12} md={5} lg={4}>
                        <UserInfo />
                    </Grid>
                    <Grid item xs={12} md={7} lg={8}>
                        <ProfileSetting />
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}

ProfileIndex.authProps = { allowedRoles: superAdmin_AdminStaff_and_StoreOwner }
ProfileIndex.getLayout = (page: ReactNode) => <StoreOwnerLayout>{page}</StoreOwnerLayout>

export default ProfileIndex