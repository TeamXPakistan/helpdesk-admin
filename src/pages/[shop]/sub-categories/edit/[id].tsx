import StoreOwnerLayout from "@layouts/store-owner-layout";
import { health_grocery_and_homeBusinessOnly, superAdmin_AdminStaff_and_StoreOwner } from "@utils/auth-utils";
import { ReactNode } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Grid from '@mui/material/Grid'
import { useRouter } from 'next/router'
import Spinner from "@components/common/spinner/spinner";
import CustomError from "@components/common/error/custom-error";
import { useSubCategoryQuery } from "@data/sub-categories/sub-categoy-query";
import EditSubCategoryForm from "@components/sub-categories/edit-sub-category-form";
import { useShopCategoriesQuery } from "@data/shop-categories/shop-categories-query";
import { useAuthCredentials } from "@store/apps/auth";
import { ShopCategory } from "@ts-types/generated";

const EditSubCategory = () => {
    const router = useRouter()
    const { authValues } = useAuthCredentials()
    const { data, isLoading, error } = useSubCategoryQuery(router?.query?.id as string)
    const { data: categories, isLoading: fetchingCategories } = useShopCategoriesQuery({
        limit: 9999,
        page: 1,
        shopId: authValues.user?.shop?._id
    });

    if (isLoading || fetchingCategories) return <Spinner />
    if (error) return <CustomError errorMsg={error.message} />
    return <>
        <Card sx={{ borderRadius: 2, height: "90vh" }}>
            <CardContent >
                <Grid container spacing={6}>
                    <Grid item xs={12} md={5} lg={4}>
                        <CardHeader
                            title='Edit Sub Category'
                            subheader="Edit sub categories for your products from here"
                            sx={{ p: 0 }}
                            titleTypographyProps={{ fontSize: "1.1rem !important" }}
                        />
                    </Grid>
                    <Grid item xs={12} md={7} lg={8} >
                        <EditSubCategoryForm
                            formData={data}
                            shopCategories={categories?.categories?.data?.map((category: ShopCategory) => {
                                return { label: category.name, value: category._id }
                            })}
                        />
                    </Grid>
                </Grid>
            </CardContent>
        </Card >
    </>
}

EditSubCategory.authProps = {
    allowedRoles: superAdmin_AdminStaff_and_StoreOwner,
    allowedShops: health_grocery_and_homeBusinessOnly
}
EditSubCategory.getLayout = (page: ReactNode) => <StoreOwnerLayout>{page}</StoreOwnerLayout>
export default EditSubCategory;