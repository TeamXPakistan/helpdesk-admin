import StoreOwnerLayout from "@layouts/store-owner-layout";
import { health_grocery_and_homeBusinessOnly, superAdmin_AdminStaff_and_StoreOwner } from "@utils/auth-utils";
import { ReactNode, useState } from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CustomTextField1 from '@components/common/text-field/custom-text-field-1';
import Spinner from '@components/common/spinner/spinner';
import CustomButton from '@components/common/Button/custom-button';
import CustomError from "@components/common/error/custom-error";
import { useShopCategoriesQuery } from "@data/shop-categories/shop-categories-query";
import { useAuthCredentials } from "@store/apps/auth";
import ShopCategoriesList from "@components/shop-categories/shop-categories-list";
import Icon from '@components/common/icon/icon';
import { useRouter } from 'next/router'

const ShopCategoriesIndex = () => {
    const [text, setText] = useState<string>('')
    const [searchVal, setSearchVal] = useState<string>('')
    const [page, setPage] = useState<number>(1)
    const { authValues } = useAuthCredentials()
    const router = useRouter();

    const { data: categories, isLoading, error } = useShopCategoriesQuery({
        limit: Number(process.env.NEXT_PUBLIC_PAGINATED_QUERY_LIMIT),
        page: page,
        text: text,
        shopId: authValues.user?.shop?._id
    });

    const onPageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };
    const onReset = () => {
        setPage(1); setText(''); setSearchVal('')
    };

    if (isLoading) return <Spinner />
    if (error) return <CustomError errorMsg={error.message} />
    return <>
        <Box
            sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', mb: 8 }}
        >
            <Typography variant='h4' sx={{ color: "text.primary" }}>Categories</Typography>

            <Box sx={{ gap: 4, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
                <form onSubmit={(e) => {
                    e.preventDefault()
                    setText(searchVal)
                }}>
                    <CustomTextField1 value={searchVal} placeholder='Search by name' onChange={e => setSearchVal(e.target.value)} />
                </form>
                <CustomButton
                    type="button"
                    variant='contained'
                    fullWidth={false}
                    onClick={() => onReset()}
                >
                    Reset
                </CustomButton>
                <CustomButton
                    type="button"
                    variant='contained'
                    fullWidth={false}
                    onClick={() => router.push(router.asPath + "/create")}
                    startIcon={<Icon color='white' fontSize='1.625rem' icon={'mdi:add-bold'} />}
                >
                    Create Category
                </CustomButton>
            </Box>
        </Box>

        <Card sx={{ borderRadius: 2 }}>
            <CardContent>
                <ShopCategoriesList
                    onPaginationChange={onPageChange}
                    data={categories?.categories?.data}
                    paginatorInfo={categories?.categories?.paginatorInfo}
                />
            </CardContent>
        </Card>
    </>
}
ShopCategoriesIndex.authProps = {
    allowedRoles: superAdmin_AdminStaff_and_StoreOwner,
    allowedShops: health_grocery_and_homeBusinessOnly
}
ShopCategoriesIndex.getLayout = (page: ReactNode) => <StoreOwnerLayout>{page}</StoreOwnerLayout>
export default ShopCategoriesIndex;