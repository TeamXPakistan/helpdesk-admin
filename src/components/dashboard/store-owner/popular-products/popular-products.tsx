import { useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Spinner from '@components/common/spinner/spinner';
import CustomError from '@components/common/error/custom-error'
import SimpleProductsList from './simple-products-list'
import { useAuthCredentials } from '@store/apps/auth'
import { ShopTypes } from '@utils/constants'
import FoodProductsList from './food-products-list'
import { usePopularProductsQuery } from '@data/products/popular-products-query';
import { Card } from '@mui/material';
import { useTranslation } from 'react-i18next';

const PopularProducts = () => {
    const [page, setPage] = useState<number>(1)
    const { authValues } = useAuthCredentials();
    const { t } = useTranslation(["common"])

    const { data: products, isLoading, error } = usePopularProductsQuery({
        limit: 4,
        page: page,
    });

    const onPageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    if (isLoading) return <Spinner />
    if (error) return <CustomError errorMsg={error.message} />
    return <>
        <Card
            sx={{ p: 8 }}
        >
            <Box
                sx={{ gap: 4, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', mb: 8 }}
            >
                <Typography variant='h4' sx={{ color: "text.primary" }}>{t("common:popular-products")}</Typography>
            </Box>

            <Box >
                {authValues.user?.shop?.type === ShopTypes.resturant ?
                    <FoodProductsList
                        products={products.products.data}
                        onPaginationChange={onPageChange}
                        paginatorInfo={products.products.paginatorInfo}
                    />
                    :
                    <SimpleProductsList
                        products={products.products.data}
                        onPaginationChange={onPageChange}
                        paginatorInfo={products.products.paginatorInfo}
                    />
                }
            </Box>
        </Card>
    </>
}

export default PopularProducts