import { superAdminOnly } from "@utils/auth-utils";
import { ReactNode } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Grid from '@mui/material/Grid'
import AdminLayout from "@layouts/admin-layout";
import CreateParentCategoryForm from "@components/categories/parent-categories/create-parent-category-form";

const CreateParentCategory = () => {

    return <>
        <Card sx={{ borderRadius: 2, height: "90vh" }}>
            <CardContent >
                <Grid container spacing={6}>
                    <Grid item xs={12} md={5} lg={4}>
                        <CardHeader
                            title="Create Parent Category"
                            subheader="Create Parent Category from here"
                            sx={{ p: 0 }}
                            titleTypographyProps={{ fontSize: "1.1rem !important" }}
                        />
                    </Grid>

                    <Grid item xs={12} md={7} lg={8} >
                        <CreateParentCategoryForm />
                    </Grid>

                </Grid>
            </CardContent>
        </Card >
    </>
}

CreateParentCategory.authProps = {
    allowedRoles: superAdminOnly
}

CreateParentCategory.getLayout = (page: ReactNode) => <AdminLayout>{page}</AdminLayout>

export default CreateParentCategory;
