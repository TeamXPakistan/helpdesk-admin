import { useRouter } from "next/router";
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { ReactNode, useState } from "react";
import Adminlayout from '@layouts/admin-layout'
import { superAdmin_and_AdminStaff } from "@utils/auth-utils";
import ShopOwnerProfileCard from "@components/shop/shop-owner-profile-card";
import { useProductsQuery } from "@data/products/products-query";
import Spinner from "@components/common/spinner/spinner";
import CustomError from "@components/common/error/custom-error";
import { Card, CardContent, CardHeader } from "@mui/material";
import ShopDetailsProductsList from "@components/shop/shop-details-products-list";
import { useShopQuery } from "@data/shop/shop-query";
import { AdminStaffPermissions, VendorDashboardAnalyticsFilterBy } from "@utils/constants";
import { useVendorAnalyticsQuery } from "@data/analytics/vendor-analytics-query";
import VendorAnalytics from "@components/dashboard/store-owner/analytics/ecommerce-statistics";



const VendorDatailsPage = () => {
    const [page, setPage] = useState<number>(1)
    const [filter, setFilter] = useState<VendorDashboardAnalyticsFilterBy>(VendorDashboardAnalyticsFilterBy.MONTHLY);
    const router = useRouter();
    const { data: products, isLoading: fetchingProducts, error } = useProductsQuery({
        limit: 4,
        page: page,
        shopId: router?.query?.id as string,
    });
    const { data: shop, error: shopError, isLoading: fetchingShop } = useShopQuery(router?.query?.id as string)
    const { data: vendorAnalytics, isLoading: loadingAnalytic, error: vendorAnalyticsError } = useVendorAnalyticsQuery({
        filterBy: filter as VendorDashboardAnalyticsFilterBy,
        userId: router?.query?.userId as string
    })


    const onPageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    }

    const onFilterChange = (value: VendorDashboardAnalyticsFilterBy) => {
        setFilter(value);
    }

    if (fetchingProducts || fetchingShop || loadingAnalytic) return <Spinner />
    if (error || shopError) return <CustomError errorMsg={error?.message || shopError?.message || vendorAnalyticsError?.message} />
    return (
        <>
            <Box
                sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', mb: 5 }}
            >
                <Typography variant='h4' sx={{ color: "text.primary" }}>
                    Vendor Profile
                </Typography>
            </Box>

            <Grid container spacing={6}>

                <Grid item xs={12} md={5} lg={4}>
                    <ShopOwnerProfileCard shopDetails={shop} />
                </Grid>

                <Grid item xs={12} md={7} lg={8}>

                    {/* <ShopAnalyticsEarningReports /> */}

                    <VendorAnalytics
                        analytics={vendorAnalytics}
                        onFilterChange={onFilterChange}
                        filter={filter}
                    />

                    <br />
                    <Card>
                        <CardHeader
                            sx={{ pb: 0, mb: 3 }}
                            title='Products'
                        />
                        <CardContent>
                            <Box >
                                {products.products.data.length > 0 ?
                                    <ShopDetailsProductsList
                                        products={products.products.data}
                                        onPaginationChange={onPageChange}
                                        paginatorInfo={products.products.paginatorInfo}
                                    />
                                    :
                                    <Typography>No products for this shop</Typography>}
                            </Box>
                        </CardContent>
                    </Card>

                </Grid>
            </Grid>
        </>
    )
};

VendorDatailsPage.authProps = {
    allowedRoles: superAdmin_and_AdminStaff,
    adminStaffPermissions: [AdminStaffPermissions.VENDORS]
}
VendorDatailsPage.getLayout = (page: ReactNode) => <Adminlayout>{page}</Adminlayout>


export default VendorDatailsPage;