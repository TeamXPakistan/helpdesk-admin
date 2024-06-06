import { useRouter } from "next/router";
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { ReactNode, useState } from "react";
import Adminlayout from '@layouts/admin-layout'
import { superAdmin_and_AdminStaff } from "@utils/auth-utils";
import Spinner from "@components/common/spinner/spinner";
import CustomError from "@components/common/error/custom-error";
import { Card, CardContent, CardHeader } from "@mui/material";
import { AdminStaffPermissions, UserAnalyticsFilterBy } from "@utils/constants";
import { useUserQuery } from "@data/users/user-query";
import UserProfileCard from "@components/users/user-profile-card";
import { useUserOrdersForAdminQuery } from "@data/orders/user-orders-for-admin-query";
import { getUserDashboardFilterDate } from "@utils/helper-functions";
import { useUserAnalyticsQuery } from "@data/analytics/user-analytics-query";


const UserDetailPage = () => {
    const [page, setPage] = useState<number>(1)
    const [time, setTime] = useState<UserAnalyticsFilterBy>(UserAnalyticsFilterBy.MONTHLY)
    const [dates, setDates] = useState<{ startDate: Date; endDate: Date }>({
        startDate: getUserDashboardFilterDate(UserAnalyticsFilterBy.MONTHLY),
        endDate: new Date()
    })

    const router = useRouter();

    const { data: user, error: userError, isLoading: fetchingUser } = useUserQuery(router?.query?.id as string);
    // const { data: orders, isLoading: fetchingOrders } = useUserOrdersForAdminQuery({
    //     limit: Number(process.env.NEXT_PUBLIC_PAGINATED_QUERY_LIMIT),
    //     page: page,
    //     userId: router?.query?.id as string,
    //     startDate: dates?.endDate ? dates?.startDate : null,
    //     endDate: dates?.endDate ? dates?.endDate : null,
    // });
    // const { data: userAnalaytics } = useUserAnalyticsQuery({
    //     userId: router?.query?.id as string,
    //     filterBy: time as UserAnalyticsFilterBy
    // })


    const onPageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    }

    // functions 
    const onStatusChange = (value: UserAnalyticsFilterBy) => {
        setTime(value);
        setDates({ startDate: getUserDashboardFilterDate(value), endDate: new Date() });
    }


    if (fetchingUser) return <Spinner />
    if (userError) return <CustomError errorMsg={userError?.message} />

    return (
        <>
            <Box
                sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', mb: 5 }}
            >
                <Typography variant='h4' sx={{ color: "text.primary" }}>
                    User Profile
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
