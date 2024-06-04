import StoreOwnerLayout from "@layouts/store-owner-layout";
import { superAdmin_AdminStaff_and_StoreOwner } from "@utils/auth-utils";
import { ReactNode } from 'react'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import { useRouter } from 'next/router'
import Spinner from "@components/common/spinner/spinner";
import CustomError from "@components/common/error/custom-error";
import { useProductQuery } from "@data/products/product-query";
import EditProductForm from "@components/products/edit-product-form";
import { useShopCategoriesQuery } from "@data/shop-categories/shop-categories-query";
import { useSubCategoriesByShopQuery } from "@data/sub-categories/sub-categories-by-shopID-query";
import { useAuthCredentials } from "@store/apps/auth";
import { MenuCategory, ShopCategory, SubCategory } from "@ts-types/generated";
import { ShopTypes } from "@utils/constants";
import EditFoodForm from "@components/products/edit-food-form";
import { useMenuCategoriesQuery } from "@data/menu-categories/menu-categories-query";


const EditProduct = () => {
    const { authValues } = useAuthCredentials()
    const router = useRouter()

    // fetching product 
    const { data, isLoading: fetchingProduct, error } = useProductQuery(router?.query?.id as string)

    // fetching Shop Categories 
    const { data: shopCategories, isFetching: fetchingCategories } = useShopCategoriesQuery({
        limit: 99999,
        page: 1,
        shopId: authValues.user?.shop?._id
    }, {
        enabled: authValues?.user?.shop?.type === ShopTypes.resturant ? false : true
    });

    // fetching Shop Sub Categories 
    const { data: subCategories, isFetching: fetchingSubCategories } = useSubCategoriesByShopQuery({
        limit: 99999,
        page: 1,
        shopId: authValues.user?.shop?._id
    }, {
        enabled: authValues?.user?.shop?.type === ShopTypes.resturant ? false : true
    });

    // fetching menu categories 
    const { data: menuCategories, isFetching: fetchingMenuCategories, } = useMenuCategoriesQuery({
        limit: 99999,
        page: 1,
    }, {
        enabled: authValues?.user?.shop?.type === ShopTypes.resturant ? true : false
    });

    if (fetchingProduct || fetchingCategories || fetchingSubCategories || fetchingMenuCategories) return <Spinner />
    if (error) return <CustomError errorMsg={error.message} />
    return <>
        <Card sx={{ borderRadius: 2, p: 4 }}>
            <CardHeader
                title='Edit Product'
                subheader="Edit a product for your shop"
                sx={{ p: 0 }}
                titleTypographyProps={{ fontSize: "1.1rem !important" }}
            />

            {authValues.user?.shop?.type === ShopTypes.resturant ?
                <EditFoodForm
                    formData={data?.product}
                    menuCategories={menuCategories?.categories?.data?.map((menuCategory: MenuCategory) => {
                        return { label: menuCategory.title, value: menuCategory._id }
                    })}
                />
                :
                <EditProductForm
                    shopCategories={shopCategories?.categories?.data?.map((category: ShopCategory) => {
                        return { label: category.name, value: category._id }
                    })}
                    subCategories={subCategories?.subCategories?.data?.map((subCategory: SubCategory) => {
                        return { label: subCategory.title, value: subCategory._id, categoryId: subCategory.categoryId._id }
                    })}
                    formData={data?.product}
                />
            }
        </Card >
    </>
}

EditProduct.authProps = {
    allowedRoles: superAdmin_AdminStaff_and_StoreOwner,
}
EditProduct.getLayout = (page: ReactNode) => <StoreOwnerLayout>{page}</StoreOwnerLayout>
export default EditProduct;