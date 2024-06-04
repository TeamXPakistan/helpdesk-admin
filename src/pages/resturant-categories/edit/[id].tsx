import { superAdmin_and_AdminStaff } from "@utils/auth-utils";
import { ReactNode } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Grid from '@mui/material/Grid'
import { useRouter } from 'next/router'
import Spinner from "@components/common/spinner/spinner";
import CustomError from "@components/common/error/custom-error";
import AdminLayout from "@layouts/admin-layout";
import { useResturantCategoryQuery } from "@data/resturant-categories/resturant-categoy-query";
import EditResturantCategoryForm from "@components/resturant-categories/edit-resturant-category-form";
import { AdminStaffPermissions } from "@utils/constants";


const CreateShopCategory = () => {
    const router = useRouter()
    const { data, isLoading, error } = useResturantCategoryQuery(router?.query?.id as string)

    if (isLoading) return <Spinner />
    if (error) return <CustomError errorMsg={error.message} />
    return <>
        <Card sx={{ borderRadius: 2, height: "90vh" }}>
            <CardContent >
                <Grid container spacing={6}>
                    <Grid item xs={12} md={5} lg={4}>
                        <CardHeader
                            title='Edit Category'
                            subheader="Edit shop categories for your products from here"
                            sx={{ p: 0 }}
                            titleTypographyProps={{ fontSize: "1.1rem !important" }}
                        />
                    </Grid>
                    <Grid item xs={12} md={7} lg={8} >
                        <EditResturantCategoryForm formData={data} />
                    </Grid>

                </Grid>
            </CardContent>
        </Card >
    </>
}

CreateShopCategory.authProps = {
    allowedRoles: superAdmin_and_AdminStaff,
    adminStaffPermissions: [AdminStaffPermissions.RESTURANT_CATEGORIES]
}
CreateShopCategory.getLayout = (page: ReactNode) => <AdminLayout>{page}</AdminLayout>
export default CreateShopCategory;