import { superAdminOnly } from "@utils/auth-utils";
import { ReactNode } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Grid from '@mui/material/Grid'
import AdminLayout from "@layouts/admin-layout";
import CreateStaffForm from "@components/admin-staff/create-staff-form";

const CreateStaff = () => {

    return <>
        <Card sx={{ borderRadius: 2, height: "90vh" }}>
            <CardContent >
                <Grid container spacing={6}>
                    <Grid item xs={12} md={5} lg={4}>
                        <CardHeader
                            title='Create Staff'
                            subheader="Create staff by assigning role from here"
                            sx={{ p: 0 }}
                            titleTypographyProps={{ fontSize: "1.1rem !important" }}
                        />
                    </Grid>

                    <Grid item xs={12} md={7} lg={8} >
                        <CreateStaffForm />
                    </Grid>

                </Grid>
            </CardContent>
        </Card >
    </>
}

CreateStaff.authProps = {
    allowedRoles: superAdminOnly
}

CreateStaff.getLayout = (page: ReactNode) => <AdminLayout>{page}</AdminLayout>

export default CreateStaff;
