import { ReactNode, useState } from 'react'
import { superAdmin_AdminStaff_and_StoreOwner } from '@utils/auth-utils'
import Box from '@mui/material/Box'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import CustomTextField1 from '@components/common/text-field/custom-text-field-1';
import Spinner from '@components/common/spinner/spinner';
import CustomButton from '@components/common/Button/custom-button';
import CustomError from '@components/common/error/custom-error'
import StoreOwnerLayout from '@layouts/store-owner-layout'
import SimpleProductsList from '@components/products/simple-products-list'
import { useProductsQuery } from '@data/products/products-query'
import { useAuthCredentials } from '@store/apps/auth'
import Icon from '@components/common/icon/icon';
import { useRouter } from 'next/router'
import { ShopTypes } from '@utils/constants'
import FoodProductsList from '@components/products/food-products-list'
import { useTranslation } from 'react-i18next'

const ProductsIndex = () => {
    const [text, setText] = useState<string>('')
    const [searchVal, setSearchVal] = useState<string>('')
    const [disabled, setDisabled] = useState<boolean>(false)
    const [page, setPage] = useState<number>(1)
    const { authValues } = useAuthCredentials();
    const router = useRouter()
    const { t } = useTranslation(["common"])

    const { data: products, isLoading, error } = useProductsQuery({
        limit: Number(process.env.NEXT_PUBLIC_PAGINATED_QUERY_LIMIT),
        page: page,
        text: text,
        shopId: authValues.user?.shop?._id,
        disabled: disabled
    });

    const onPageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };
    const onReset = () => {
        setPage(1); setDisabled(false); setText(''); setSearchVal('')
    };
    console.log(products)
    if (isLoading) return <Spinner />
    if (error) return <CustomError errorMsg={error.message} />
    return <>
        <Box
            sx={{ gap: 4, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', mb: 8 }}
        >
            <Typography variant='h4' sx={{ color: "text.primary" }}>{t("Products")}</Typography>

            <Box sx={{ gap: 4, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
                <form onSubmit={(e) => {
                    e.preventDefault()
                    setText(searchVal)
                }}>
                    <CustomTextField1 value={searchVal} placeholder={t('common:placeholder-search-product')} onChange={e => setSearchVal(e.target.value)} />
                </form>
                <CustomTextField1
                    select
                    sx={{ '& .MuiFilledInput-input.MuiSelect-select': { minWidth: '8rem !important' } }}
                    SelectProps={{
                        displayEmpty: true,
                        value: disabled,
                        onChange: e => setDisabled(e.target.value as boolean)
                    }}
                >
                    {/* @ts-ignore */}
                    <MenuItem value={false}>{t("common:All")}</MenuItem>
                    {/* @ts-ignore */}
                    <MenuItem value={true}>{t("common:Disabled")}</MenuItem>
                </CustomTextField1>

                <CustomButton
                    type="button"
                    variant='contained'
                    fullWidth={false}
                    onClick={() => onReset()}
                >
                    {t("common:Reset")}
                </CustomButton>

                <CustomButton
                    type="button"
                    variant='contained'
                    fullWidth={false}
                    onClick={() => router.push(router.asPath + "/create")}
                    startIcon={<Icon color='white' fontSize='1.625rem' icon={'mdi:add-bold'} />}
                >
                    {t("common:create-product")}
                </CustomButton>
            </Box>
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
    </>
}

ProductsIndex.authProps = {
    allowedRoles: superAdmin_AdminStaff_and_StoreOwner,
}
ProductsIndex.getLayout = (page: ReactNode) => <StoreOwnerLayout>{page}</StoreOwnerLayout>

export default ProductsIndex
