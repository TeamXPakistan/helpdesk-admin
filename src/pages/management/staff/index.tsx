import { ReactNode, useState } from 'react'
import { superAdminOnly } from '@utils/auth-utils'
import Adminlayout from '@layouts/admin-layout'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Spinner from '@components/common/spinner/spinner';
import CustomButton from '@components/common/Button/custom-button';
import CustomError from '@components/common/error/custom-error'
import Icon from '@components/common/icon/icon';
import { useRouter } from 'next/router'
import StaffList from '@components/admin-staff/staff-list'
import { useStaffsQuery } from '@data/admin-staff/staffs-query'


const VendorsPage = () => {
    const [page, setPage] = useState<number>(1)
    const router = useRouter();

    const { data: staff, isLoading, error } = useStaffsQuery({
        limit: Number(process.env.NEXT_PUBLIC_PAGINATED_QUERY_LIMIT),
        page: page,
    });


    const onPageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    if (isLoading) return <Spinner />
    if (error) return <CustomError errorMsg={error.message} />
    return <>
        <Box
            sx={{ gap: 4, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', mb: 8 }}
        >
            <Typography variant='h4' sx={{ color: "text.primary" }}>Staff List</Typography>
            <Box sx={{ gap: 4, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
                <CustomButton
                    type="button"
                    variant='contained'
                    fullWidth={false}
                    onClick={() => router.push(router.asPath + "/create")}
                    startIcon={<Icon color='white' fontSize='1.625rem' icon={'mdi:add-bold'} />}
                >
                    Create Staff
                </CustomButton>
            </Box>
        </Box>

        <Card sx={{ borderRadius: 2 }}>
            <CardContent>
                <StaffList
                    onPaginationChange={onPageChange}
                    data={staff?.staffs?.data}
                    paginatorInfo={staff?.staffs?.paginatorInfo}
                />
            </CardContent>
        </Card>
    </>
}

VendorsPage.authProps = {
    allowedRoles: superAdminOnly
}
VendorsPage.getLayout = (page: ReactNode) => <Adminlayout>{page}</Adminlayout>

export default VendorsPage
