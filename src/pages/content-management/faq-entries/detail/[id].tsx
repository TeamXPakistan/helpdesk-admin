import { useRouter } from "next/router";
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { ReactNode } from "react";
import Adminlayout from '@layouts/admin-layout'
import { superAdmin_and_AdminStaff } from "@utils/auth-utils";
import Spinner from "@components/common/spinner/spinner";
import CustomError from "@components/common/error/custom-error";
import { AdminStaffPermissions } from "@utils/constants";
import { useUserQuery } from "@data/users/user-query";
import UserProfileCard from "@components/users/user-profile-card";

const UserDetailPage = () => {
    const router = useRouter();

    const { data: user, error: userError, isLoading: fetchingUser } = useUserQuery(router?.query?.id as string);

    if (fetchingUser) return <Spinner />
    if (userError) return <CustomError errorMsg={userError?.message} />

    return (
        <>
            <Box
                sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', mb: 5 }}
            >
                <Typography variant='h4' sx={{ color: "text.primary" }}>
                     Profile
                </Typography>
            </Box>

            <Grid container spacing={6}>

                <Grid item xs={12} md={5} lg={4}>
                    <UserProfileCard userDetails={user} />
                </Grid>
            </Grid>
        </>
    )
};

UserDetailPage.authProps = {
    allowedRoles: superAdmin_and_AdminStaff,
    adminStaffPermissions: [AdminStaffPermissions.USERS]
}

UserDetailPage.getLayout = (page: ReactNode) => <Adminlayout>{page}</Adminlayout>


export default UserDetailPage;
