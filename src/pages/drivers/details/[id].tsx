import { useRouter } from "next/router";
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { ReactNode, useState } from "react";
import Adminlayout from '@layouts/admin-layout'
import { superAdmin_and_AdminStaff } from "@utils/auth-utils";
import Spinner from "@components/common/spinner/spinner";
import CustomError from "@components/common/error/custom-error";
import { AdminStaffPermissions, DriverAnalyticsFilterBy } from "@utils/constants";
import { useDriverAnalyticsQuery } from "@data/analytics/driver-analytics-query";
import DriverProfileCard from "@components/drivers/driver-profile-card";
import DriverAnalytics from "@components/drivers/driver-analytics";
import DriverOrders from "@components/drivers/driver-orders";
import { getFilterDate } from "@utils/helper-functions";
import DriverParcels from "@components/drivers/driver-parcels";
import TabContext from '@mui/lab/TabContext'
import { Tab } from "@mui/material";
import TabPanel from '@mui/lab/TabPanel'
import TabList from "@mui/lab/TabList";



const DriverDatailsPage = () => {
    // states 
    const [value, setValue] = useState<string>('Orders')
    const [time, setTime] = useState<DriverAnalyticsFilterBy>(DriverAnalyticsFilterBy.MONTHLY)
    const [dates, setDates] = useState<{ startDate: Date; endDate: Date }>({
        startDate: getFilterDate(DriverAnalyticsFilterBy.MONTHLY),
        endDate: new Date()
    })


    // hooks 
    const router = useRouter();

    const { data: driverAnalytics, isLoading: loadingAnalytic, error, isFetching: fetchingAnalytics } = useDriverAnalyticsQuery({
        riderId: router?.query?.id as string,
        filterBy: time as DriverAnalyticsFilterBy
    })


    // functions 
    const onStatusChange = (value: DriverAnalyticsFilterBy) => {
        setTime(value);
        setDates({ startDate: getFilterDate(value), endDate: new Date() });
    }

    const handleTabsChange = (event: any, newValue: string) => {
        setValue(newValue)
    }


    // react component 
    if (loadingAnalytic) return <Spinner />
    if (error) return <CustomError errorMsg={error?.message} />
    return (
        <>
            <Box
                sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', mb: 5 }}
            >
                <Typography variant='h4' sx={{ color: "text.primary" }}>
                    Driver Profile
                </Typography>
            </Box>

            <Grid container spacing={6} sx={{ mb: 15 }}>

                {/* PROFILE CARD COMPONENT  */}
                <Grid item xs={12} md={5} lg={4}>
                    <DriverProfileCard driverDetails={driverAnalytics} />
                </Grid>

                <Grid item xs={12} md={7} lg={8}>
                    {/* ANALYTICS COMPONENT  */}
                    <DriverAnalytics driverDetails={driverAnalytics} onStatusChange={onStatusChange} statusValue={time} />
                </Grid>

            </Grid>

            {fetchingAnalytics ?
                <Spinner sx={{ height: "0px" }} /> :
                <TabContext value={value}>
                    <TabList
                        variant='scrollable'
                        scrollButtons={false}
                        onChange={handleTabsChange}
                        sx={{ borderBottom: `0 !important`, '& .MuiTab-root': { py: 3.5, } }}
                    >
                        <Tab value='Orders' label='ORDERS' />
                        <Tab value='Parcels' label='PARCELS' />
                    </TabList>

                    <TabPanel value='Orders' sx={{ px: 0 }}>
                        <DriverOrders dates={dates} />
                    </TabPanel>

                    <TabPanel value='Parcels' sx={{ px: 0 }}>
                        <DriverParcels dates={dates} />
                    </TabPanel>
                </TabContext>
            }
        </>
    )
};

DriverDatailsPage.authProps = {
    allowedRoles: superAdmin_and_AdminStaff,
    adminStaffPermissions: [AdminStaffPermissions.DRIVERS]
}
DriverDatailsPage.getLayout = (page: ReactNode) => <Adminlayout>{page}</Adminlayout>


export default DriverDatailsPage;