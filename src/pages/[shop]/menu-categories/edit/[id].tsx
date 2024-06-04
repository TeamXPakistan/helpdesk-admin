import StoreOwnerLayout from "@layouts/store-owner-layout";
import { resturantOnly, storeOwnerOnly } from "@utils/auth-utils";
import { ReactNode } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Grid from '@mui/material/Grid'
import { useRouter } from 'next/router'
import Spinner from "@components/common/spinner/spinner";
import CustomError from "@components/common/error/custom-error";
import { useMenuCategoryQuery } from "@data/menu-categories/menu-categoy-query";
import MenuCategoryEditForm from "@components/menu-categories/menu-category-edit-form";
import { useTranslation } from "react-i18next";


const CreateShopCategory = () => {
    const router = useRouter()
    const { data, isLoading, error } = useMenuCategoryQuery(router?.query?.id as string)
    const { t } = useTranslation(["common"]);

    if (isLoading) return <Spinner />
    if (error) return <CustomError errorMsg={error.message} />
    return <>
        <Card sx={{ borderRadius: 2, height: "90vh" }}>
            <CardContent >
                <Grid container spacing={6}>
                    <Grid item xs={12} md={5} lg={4}>
                        <CardHeader
                            title={`${t("common:nav-store-owner-text-menu-category")}`}
                            subheader={`${t("common:edit-menu-sub-heading")}`}
                            sx={{ p: 0 }}
                            titleTypographyProps={{ fontSize: "1.1rem !important" }}
                        />
                    </Grid>
                    <Grid item xs={12} md={7} lg={8} >
                        <MenuCategoryEditForm formData={data} />
                    </Grid>

                </Grid>
            </CardContent>
        </Card >
    </>
}

CreateShopCategory.authProps = {
    allowedRoles: storeOwnerOnly,
    allowedShops: resturantOnly
}
CreateShopCategory.getLayout = (page: ReactNode) => <StoreOwnerLayout>{page}</StoreOwnerLayout>
export default CreateShopCategory;