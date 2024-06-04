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
import { useParcelQuery } from "@data/parcels/parcel-query";
import UserProfileCard from "@components/users/user-profile-card";
import ParcelDetailsCard from "@components/parcels/parcel-details-card";



const ParcelDatailsPage = () => {
    const router = useRouter();

    const { data: parcel, error: parcelError, isLoading: fetchingParcel } = useParcelQuery(router?.query?.id as string)


    if (fetchingParcel) return <Spinner />
    if (parcelError) return <CustomError errorMsg={parcelError?.message} />
    return (
        <>
            <Box
                sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', mb: 5 }}
            >
                <Typography variant='h4' sx={{ color: "text.primary" }}>
                    Parcel Details
                </Typography>
            </Box>

            <Grid container spacing={6}>
                <Grid item xs={12} md={7} lg={8}>
                    <ParcelDetailsCard parcel={parcel} />
                </Grid>

                <Grid item xs={12} md={5} lg={4}>
                    <UserProfileCard userDetails={parcel?.senderId} />
                </Grid>
            </Grid>
        </>
    )
};

ParcelDatailsPage.authProps = {
    allowedRoles: superAdmin_and_AdminStaff,
    adminStaffPermissions: [AdminStaffPermissions.PARCELS]
}
ParcelDatailsPage.getLayout = (page: ReactNode) => <Adminlayout>{page}</Adminlayout>


export default ParcelDatailsPage;