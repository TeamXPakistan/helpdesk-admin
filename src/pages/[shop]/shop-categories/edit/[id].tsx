import StoreOwnerLayout from "@layouts/store-owner-layout";
import { health_grocery_and_homeBusinessOnly, superAdmin_AdminStaff_and_StoreOwner } from "@utils/auth-utils";
import { ReactNode } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Grid from '@mui/material/Grid'
import EditShopCategoryForm from "@components/shop-categories/edit-shop-category-form";
import { useRouter } from 'next/router'
import { useShopCategoryQuery } from "@data/shop-categories/shop-categoy-query copy";
import Spinner from "@components/common/spinner/spinner";
import CustomError from "@components/common/error/custom-error";


const CreateShopCategory = () => {
    const router = useRouter()
    const { data, isLoading, error } = useShopCategoryQuery(router?.query?.id as string)

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
                        <EditShopCategoryForm formData={data} />
                    </Grid>

                </Grid>
            </CardContent>
        </Card >
    </>
}
CreateShopCategory.authProps = {
    allowedRoles: superAdmin_AdminStaff_and_StoreOwner,
    allowedShops: health_grocery_and_homeBusinessOnly
}
CreateShopCategory.getLayout = (page: ReactNode) => <StoreOwnerLayout>{page}</StoreOwnerLayout>
export default CreateShopCategory;