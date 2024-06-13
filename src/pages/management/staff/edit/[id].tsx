import { superAdminOnly } from "@utils/auth-utils";
import { ReactNode } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Grid from '@mui/material/Grid'
import { useRouter } from 'next/router'
import Spinner from "@components/common/spinner/spinner";
import CustomError from "@components/common/error/custom-error";
import AdminLayout from "@layouts/admin-layout";
import { useStaffQuery } from "@data/admin-staff/staff-query";
import EditStaffForm from "@components/admin-staff/edit-staff-form";

const EditStaffPage = () => {
    const router = useRouter()
    const { data, isLoading, error } = useStaffQuery(router?.query?.id as string)

    if (isLoading) return <Spinner />
    if (error) return <CustomError errorMsg={error.message} />

    return <>
        <Card sx={{ borderRadius: 2, height: "90vh" }}>
            <CardContent >
                <Grid container spacing={6}>
                    <Grid item xs={12} md={5} lg={4}>
                        <CardHeader
                            title='Edit Staff'
                            subheader="Edit staff roles from here"
                            sx={{ p: 0 }}
                            titleTypographyProps={{ fontSize: "1.1rem !important" }}
                        />
                    </Grid>
                    <Grid item xs={12} md={7} lg={8} >
                        <EditStaffForm formData={data} />
                    </Grid>

                </Grid>
            </CardContent>
        </Card >
    </>
}

EditStaffPage.authProps = {
    allowedRoles: superAdminOnly,
}

EditStaffPage.getLayout = (page: ReactNode) => <AdminLayout>{page}</AdminLayout>

export default EditStaffPage;
