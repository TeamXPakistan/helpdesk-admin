import StoreOwnerLayout from "@layouts/store-owner-layout";
import { superAdmin_AdminStaff_and_StoreOwner } from "@utils/auth-utils";
import { ReactNode } from 'react'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CreateProductForm from "@components/products/create-product-form";
import CreateFoodForm from "@components/products/create-food-form";
import { useAuthCredentials } from "@store/apps/auth";
import { ShopTypes } from "@utils/constants";


const CreateProduct = () => {
    const { authValues } = useAuthCredentials();
    return <>
        <Card sx={{ borderRadius: 2, p: 4 }}>
            <CardHeader
                title='Add Product'
                subheader="Create a product for your shop"
                sx={{ p: 0 }}
                titleTypographyProps={{ fontSize: "1.1rem !important" }}
            />
            {authValues.user?.shop?.type === ShopTypes.resturant ?
                <CreateFoodForm /> : <CreateProductForm />}
        </Card >
    </>
}
CreateProduct.authProps = {
    allowedRoles: superAdmin_AdminStaff_and_StoreOwner,
}
CreateProduct.getLayout = (page: ReactNode) => <StoreOwnerLayout>{page}</StoreOwnerLayout>
export default CreateProduct;