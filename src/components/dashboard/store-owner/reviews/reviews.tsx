import { useState } from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Spinner from '@components/common/spinner/spinner';
import CustomError from "@components/common/error/custom-error";
import { useAuthCredentials } from "@store/apps/auth";
import { useShopReviewsQuery } from "@data/reviews/shop-reviews-query";
import { ShopTypes } from "@utils/constants";
import ResturantReviewsList from "./resturant-reviews-list";
import ShopReviewsList from "./shop-reviews-list";
import { useTranslation } from 'react-i18next'

const Reviews = () => {
    const [page, setPage] = useState<number>(1)
    const { authValues } = useAuthCredentials()
    const { t } = useTranslation(["common"])
    const { data: reviews, isLoading, error } = useShopReviewsQuery({
        limit: 10,
        page: page,
        shopId: authValues.user?.shop?._id
    });

    const onPageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    if (isLoading) return <Spinner />
    if (error) return <CustomError errorMsg={error?.message} />
    return <>
        <Card >
            <Box
                sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', p: 8 }}
            >
                <Typography variant='h4' sx={{ color: "text.primary" }}>
                    {t("common:customer-reviews")}</Typography>
            </Box>

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

export default Reviews;