import CustomError from "@components/common/error/custom-error";
import Spinner from "@components/common/spinner/spinner";
import EditShopForm from "@components/shop/edit-shop-form";
import { useShopQuery } from "@data/shop/shop-query";
import StoreOwnerLayout from "@layouts/store-owner-layout";
import { Card, CardContent, CardHeader, Grid } from "@mui/material";
import { useAuthCredentials } from "@store/apps/auth";
import { superAdmin_and_storeOWner } from "@utils/auth-utils";
import { ReactNode } from "react";
import { useTranslation } from "react-i18next";

const EditShop = () => {
    const { authValues } = useAuthCredentials()
    const { t } = useTranslation(["common"]);
    const { data: shop, error: shopError, isLoading: fetchingShop } = useShopQuery(authValues.user?.shop?._id as string)

    if (fetchingShop) return <Spinner />
    if (shopError) return <CustomError errorMsg={shopError?.message} />
    return <>
        <Card sx={{ borderRadius: 2 }}>
            <CardContent >
                <Grid container spacing={6}>
                    <Grid item xs={12} md={5} lg={4}>
                        <CardHeader
                            title={`${t("nav-store-owner-text-profile-settings")}`}
                            subheader={`${t("common:nav-store-owner-text-edit-shop-sub-heading")}`}
                            sx={{ p: 0 }}
                            titleTypographyProps={{ fontSize: "1.1rem !important" }}
                        />
                    </Grid>
                    <Grid item xs={12} md={7} lg={8} >
                        <EditShopForm shopData={shop} />
                    </Grid>
                </Grid>
            </CardContent>
        </Card >
    </>
}

EditShop.authProps = {
    allowedRoles: superAdmin_and_storeOWner
}
EditShop.getLayout = (page: ReactNode) => <StoreOwnerLayout>{page}</StoreOwnerLayout>

export default EditShop;