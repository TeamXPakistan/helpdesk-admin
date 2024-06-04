import { superAdmin_and_AdminStaff } from '@utils/auth-utils'
import Adminlayout from '@layouts/admin-layout'
import { AdminStaffPermissions, DRIVER, MerchantWithDrawalStatus, STORE_OWNER } from '@utils/constants';
import AdminWithdrawsTable from '@components/withdraws/admin-withdraws-table';
import { ReactNode, useState } from 'react'
import Spinner from "@components/common/spinner/spinner";
import CustomError from "@components/common/error/custom-error";
import { useMerchantWithdrawsQuery } from "@data/withdraws/users-query";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CustomTextField1 from '@components/common/text-field/custom-text-field-1';
import MenuItem from '@mui/material/MenuItem'
import CustomButton from '@components/common/Button/custom-button';

const Withdraws = () => {
    const [page, setPage] = useState<number>(1);
    const [status, setStatus] = useState<string>('');
    const [role, setRole] = useState<string>('');

    const { data: withdraws, isLoading, error } = useMerchantWithdrawsQuery({
        limit: Number(process.env.NEXT_PUBLIC_PAGINATED_QUERY_LIMIT),
        page: page,
        status: status,
        role: role
    });

    const onReset = () => {
        setPage(1); setStatus(""); setRole("")
    };

    const onPageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    if (isLoading) return <Spinner />
    if (error) return <CustomError errorMsg={error?.message} />

    return (
        <>
            <Box
                sx={{ gap: 4, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', mb: 8 }}
            >
                <Typography variant='h4' sx={{ color: "text.primary" }}>Withdraws</Typography>
                <Box sx={{ gap: 4, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
                    <CustomTextField1
                        select
                        sx={{ '& .MuiFilledInput-input.MuiSelect-select': { minWidth: '8rem !important' } }}
                        SelectProps={{
                            displayEmpty: true,
                            value: status,
                            onChange: e => setStatus(e.target.value as string)
                        }}
                    >
                        <MenuItem disabled value=''>Status</MenuItem>
                        <MenuItem value={MerchantWithDrawalStatus.ACCEPTED}>Accepted</MenuItem>
                        <MenuItem value={MerchantWithDrawalStatus.REJECTED}>Rejected</MenuItem>
                        <MenuItem value={MerchantWithDrawalStatus.PENDING}>Pending</MenuItem>
                    </CustomTextField1>
                    <CustomTextField1
                        select
                        sx={{ '& .MuiFilledInput-input.MuiSelect-select': { minWidth: '8rem !important' } }}
                        SelectProps={{
                            displayEmpty: true,
                            value: role,
                            onChange: e => setRole(e.target.value as string)
                        }}
                    >
                        <MenuItem disabled value=''>Role</MenuItem>
                        <MenuItem value={STORE_OWNER}>Shop Owner</MenuItem>
                        <MenuItem value={DRIVER}>Driver</MenuItem>
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
                    <AdminWithdrawsTable
                        onPaginationChange={onPageChange}
                        data={withdraws?.withdraws?.data}
                        paginatorInfo={withdraws?.withdraws?.paginatorInfo} />
                </CardContent>
            </Card>
        </>
    )
}

Withdraws.authProps = {
    allowedRoles: superAdmin_and_AdminStaff,
    adminStaffPermissions: [AdminStaffPermissions.EARNINGS]
}
Withdraws.getLayout = (page: ReactNode) => <Adminlayout>{page}</Adminlayout>

export default Withdraws
