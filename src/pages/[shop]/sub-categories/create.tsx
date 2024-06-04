import StoreOwnerLayout from "@layouts/store-owner-layout";
import { health_grocery_and_homeBusinessOnly, superAdmin_AdminStaff_and_StoreOwner } from "@utils/auth-utils";
import { ReactNode } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Grid from '@mui/material/Grid'
import CreateSubCategoryForm from "@components/sub-categories/create-sub-category-form copy";

const CreateShopCategory = () => {

    return <>
        <Card sx={{ borderRadius: 2, height: "90vh" }}>
            <CardContent >
                <Grid container spacing={6}>
                    <Grid item xs={12} md={5} lg={4}>
                        <CardHeader
                            title='Create Sub Categoy'
                            subheader="Create sub categories for your products from here"
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
CreateShopCategory.authProps = {
    allowedRoles: superAdmin_AdminStaff_and_StoreOwner,
    allowedShops: health_grocery_and_homeBusinessOnly
}
CreateShopCategory.getLayout = (page: ReactNode) => <StoreOwnerLayout>{page}</StoreOwnerLayout>
export default CreateShopCategory;