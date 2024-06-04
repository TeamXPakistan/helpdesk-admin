import { ReactNode, useState } from 'react'
import { superAdmin_and_AdminStaff } from '@utils/auth-utils'
import Adminlayout from '@layouts/admin-layout'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CustomTextField1 from '@components/common/text-field/custom-text-field-1';
import ShopsList from '@components/shop/shops-list';
import Spinner from '@components/common/spinner/spinner';
import CustomButton from '@components/common/Button/custom-button';
import { AdminStaffPermissions, ShopApprovalStatus, ShopTypes } from '@utils/constants';
import { useShopsQuery } from '@data/shop/shops-query';
import CustomError from '@components/common/error/custom-error'

const VendorsPage = () => {
    const [statusValue, setStatusValue] = useState<string>('')
    const [text, setText] = useState<string>('')
    const [searchVal, setSearchVal] = useState<string>('')
    const [shopType, setShopType] = useState<string>('')
    const [page, setPage] = useState<number>(1)

    const { data: Shops, isLoading, error } = useShopsQuery({
        limit: Number(process.env.NEXT_PUBLIC_PAGINATED_QUERY_LIMIT),
        page: page,
        text: text,
        shopType: shopType,
        status: statusValue
    });

    const onPageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };
    const onReset = () => {
        setPage(1); setStatusValue(""); setShopType(""); setText(''); setSearchVal('')
    };

    if (isLoading) return <Spinner />
    if (error) return <CustomError errorMsg={error.message} />
    return <>
        <Box
            sx={{ gap: 4, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', mb: 8 }}
        >
            <Typography variant='h4' sx={{ color: "text.primary" }}>Vendors List</Typography>
            <Box sx={{ gap: 4, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
                <form onSubmit={(e) => {
                    e.preventDefault()
                    setText(searchVal)
                }}>
                    <CustomTextField1 value={searchVal} placeholder='Search by email' onChange={e => setSearchVal(e.target.value)} />
                </form>
                <CustomTextField1
                    select
                    sx={{ '& .MuiFilledInput-input.MuiSelect-select': { minWidth: '8rem !important' } }}
                    SelectProps={{
                        displayEmpty: true,
                        value: shopType,
                        onChange: e => setShopType(e.target.value as string)
                    }}
                >
                    <MenuItem disabled value=''>Shop Type</MenuItem>
                    <MenuItem value={ShopTypes.pharmacy}>Health</MenuItem>
                    <MenuItem value={ShopTypes.grocery}>Grocery</MenuItem>
                    <MenuItem value={ShopTypes.resturant}>Resturant</MenuItem>
                    <MenuItem value={ShopTypes.homeBusiness}>Home Business</MenuItem>
                </CustomTextField1>
                <CustomTextField1
                    select
                    sx={{ '& .MuiFilledInput-input.MuiSelect-select': { minWidth: '8rem !important' } }}
                    SelectProps={{
                        displayEmpty: true,
                        value: statusValue,
                        onChange: e => setStatusValue(e.target.value as string)
                    }}
                >
                    <MenuItem disabled value=''>Status</MenuItem>
                    <MenuItem value={ShopApprovalStatus.accept}>Accept</MenuItem>
                    <MenuItem value={ShopApprovalStatus.reject}>Reject</MenuItem>
                    <MenuItem value={ShopApprovalStatus.pending}>Pending</MenuItem>
                </CustomTextField1>
                <CustomButton
                    type="button"
                    variant='contained'
                    fullWidth={false}
                    onClick={() => onReset()}
                >
                    Reset
                </CustomButton>
            </Box>
        </Box>

        <Card sx={{ borderRadius: 2 }}>
            <CardContent>
                <ShopsList
                    onPaginationChange={onPageChange}
                    data={Shops.shops.data}
                    paginatorInfo={Shops.shops.paginatorInfo}
                />
            </CardContent>
        </Card>
    </>
}

VendorsPage.authProps = {
    allowedRoles: superAdmin_and_AdminStaff,
    adminStaffPermissions: [AdminStaffPermissions.VENDORS]
}
VendorsPage.getLayout = (page: ReactNode) => <Adminlayout>{page}</Adminlayout>

export default VendorsPage
