import StoreOwnerLayout from "@layouts/store-owner-layout";
import { superAdmin_AdminStaff_and_StoreOwner } from "@utils/auth-utils";
import { ReactNode, useState } from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Spinner from '@components/common/spinner/spinner';
import CustomError from "@components/common/error/custom-error";
import { useAuthCredentials } from "@store/apps/auth";
import { useShopReviewsQuery } from "@data/reviews/shop-reviews-query";
import ShopReviewsList from "@components/reviews/shop-reviews-list";
import ResturantReviewsList from "@components/reviews/resturant-reviews-list";
import { ShopTypes } from "@utils/constants";
import { useTranslation } from "react-i18next";

const ShopCategoriesIndex = () => {
    const [page, setPage] = useState<number>(1)
    const { authValues } = useAuthCredentials()
    const { t } = useTranslation(["common"]);
    const { data: reviews, isLoading, error } = useShopReviewsQuery({
        limit: Number(process.env.NEXT_PUBLIC_PAGINATED_QUERY_LIMIT),
        page: page,
        shopId: authValues.user?.shop?._id
    });

    const onPageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    if (isLoading) return <Spinner />
    if (error) return <CustomError errorMsg={error?.message} />
    return <>
        <Box
            sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', mb: 8 }}
        >
            <Typography variant='h4' sx={{ color: "text.primary" }}>{t("Reviews")}</Typography>
        </Box>

        <Card sx={{ borderRadius: 2 }}>
            <CardContent>
                {authValues?.user?.shop?.type === ShopTypes.resturant ?
                    <ResturantReviewsList
                        onPaginationChange={onPageChange}
                        data={reviews?.reviews?.data}
                        paginatorInfo={reviews?.reviews?.paginatorInfo}
                    /> :
                    <ShopReviewsList
                        onPaginationChange={onPageChange}
                        data={reviews?.reviews?.data}
                        paginatorInfo={reviews?.reviews?.paginatorInfo}
                    />
                }

            </CardContent>
        </Card>
    </>
}
ShopCategoriesIndex.authProps = {
    allowedRoles: superAdmin_AdminStaff_and_StoreOwner,
}
ShopCategoriesIndex.getLayout = (page: ReactNode) => <StoreOwnerLayout>{page}</StoreOwnerLayout>
export default ShopCategoriesIndex;