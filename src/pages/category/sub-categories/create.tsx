import { superAdminOnly } from "@utils/auth-utils";
import { ReactNode, useState } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Grid from '@mui/material/Grid'
import AdminLayout from "@layouts/admin-layout";
import CreateSubCategoryForm from "@components/categories/sub-categories/create-sub-category-form";
import { useNestedSubCategoriesQuery } from "@data/category/sub-category/nested-sub-categories-query";


const CreateSubCategory = () => {

    return <>
        <Card sx={{ borderRadius: 2, height: "100vh" }}>
            <CardContent >
                <Grid container spacing={6}>
                    <Grid item xs={12} md={5} lg={4}>
                        <CardHeader
                            title="Create Sub Category"
                            subheader="Create Sub Category from here"
                            sx={{ p: 0 }}
                            titleTypographyProps={{ fontSize: "1.1rem !important" }}
                        />
                    </Grid>

                    <Grid item xs={12} md={7} lg={8} >
                        <CreateSubCategoryForm />
                    </Grid>

                </Grid>
            </CardContent>
        </Card >
    </>
}

CreateSubCategory.authProps = {
    allowedRoles: superAdminOnly
}

CreateSubCategory.getLayout = (page: ReactNode) => <AdminLayout>{page}</AdminLayout>

export default CreateSubCategory;
