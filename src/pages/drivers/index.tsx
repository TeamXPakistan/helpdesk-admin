import { ReactNode, useState } from 'react'
import { superAdmin_and_AdminStaff } from '@utils/auth-utils'
import Adminlayout from '@layouts/admin-layout'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CustomTextField1 from '@components/common/text-field/custom-text-field-1';
import Spinner from '@components/common/spinner/spinner';
import CustomButton from '@components/common/Button/custom-button';
import { AdminStaffPermissions, AttandenceStatus, DriverCurrentRequest } from '@utils/constants';
import CustomError from '@components/common/error/custom-error'
import { useDriversQuery } from '@data/drivers/drivers-query'
import DriversList from '@components/drivers/drivers-list'

const VendorsPage = () => {
    const [statusValue, setStatusValue] = useState<string>('')
    const [currentRequest, setCurrentRequest] = useState<string>('')
    const [text, setText] = useState<string>('')
    const [searchVal, setSearchVal] = useState<string>('')
    const [page, setPage] = useState<number>(1)

    const { data: drivers, isLoading, error } = useDriversQuery({
        limit: Number(process.env.NEXT_PUBLIC_PAGINATED_QUERY_LIMIT),
        page: page,
        text: text,
        status: statusValue as AttandenceStatus,
        current: currentRequest as DriverCurrentRequest
    });

    const onPageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };
    const onReset = () => {
        setPage(1); setStatusValue(""); setText(''); setSearchVal(''); setCurrentRequest("")
    };

    if (isLoading) return <Spinner />
    if (error) return <CustomError errorMsg={error.message} />
    return <>
        <Box
            sx={{ gap: 4, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', mb: 8 }}
        >
            <Typography variant='h4' sx={{ color: "text.primary" }}>Drivers List</Typography>
            <Box sx={{ gap: 4, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
                <form onSubmit={(e) => {
                    e.preventDefault()
                    setText(searchVal)
                }}>
                    <CustomTextField1 value={searchVal} placeholder='Search by name , contact' onChange={e => setSearchVal(e.target.value)} />
                </form>
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
                    <MenuItem value={AttandenceStatus.CHECK_IN}>Online</MenuItem>
                    <MenuItem value={AttandenceStatus.CHECK_OUT}>Offline</MenuItem>
                </CustomTextField1>

                <CustomTextField1
                    select
                    sx={{ '& .MuiFilledInput-input.MuiSelect-select': { minWidth: '8rem !important' } }}
                    SelectProps={{
                        displayEmpty: true,
                        value: currentRequest,
                        onChange: e => setCurrentRequest(e.target.value as string)
                    }}
                >
                    <MenuItem disabled value=''>Current Request</MenuItem>
                    <MenuItem value={DriverCurrentRequest.PARCEL}>Parcel</MenuItem>
                    <MenuItem value={DriverCurrentRequest.ORDER}>Order</MenuItem>
                    <MenuItem value={DriverCurrentRequest.IDLE}>Ideal</MenuItem>
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
                <DriversList
                    onPaginationChange={onPageChange}
                    data={drivers?.drivers?.data}
                    paginatorInfo={drivers?.drivers?.paginatorInfo}
                />
            </CardContent>
        </Card>
    </>
}

VendorsPage.authProps = {
    allowedRoles: superAdmin_and_AdminStaff,
    adminStaffPermissions: [AdminStaffPermissions.DRIVERS]
}
VendorsPage.getLayout = (page: ReactNode) => <Adminlayout>{page}</Adminlayout>

export default VendorsPage
