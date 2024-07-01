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
import EditStaffForm from "@components/admin-staff/edit-staff-form";
import UpdateParentCategoryForm from "@components/categories/parent-categories/update-parent-category-form";
import { useParentCategoryQuery } from "@data/category/parent-category/parent-category-query";

const UpdateParentCategory = () => {
    const router = useRouter()
    const { data, isLoading, error } = useParentCategoryQuery(router?.query?.id as string)

    if (isLoading) return <Spinner />
    if (error) return <CustomError errorMsg={error.message} />

    return <>
        <Card sx={{ borderRadius: 2, height: "90vh" }}>
            <CardContent >
                <Grid container spacing={6}>
                    <Grid item xs={12} md={5} lg={4}>
                        <CardHeader
                            title="Update Parent Category"
                            subheader="Update Parent Category from here"
                            sx={{ p: 0 }}
                            titleTypographyProps={{ fontSize: "1.1rem !important" }}
                        />
                    </Grid>

                    <Grid item xs={12} md={7} lg={8} >
                        <UpdateParentCategoryForm data={data} />
                    </Grid>

                </Grid>
            </CardContent>
        </Card >
    </>
}

UpdateParentCategory.authProps = {
    allowedRoles: superAdminOnly,
}

UpdateParentCategory.getLayout = (page: ReactNode) => <AdminLayout>{page}</AdminLayout>

export default UpdateParentCategory;
