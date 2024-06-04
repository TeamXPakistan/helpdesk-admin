import StoreOwnerLayout from "@layouts/store-owner-layout";
import { storeOwnerOnly } from "@utils/auth-utils";
import { ReactNode, useState } from 'react'
import { Card, CardContent, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import WithdrawsCards from "@components/withdraws/withdraws-cards";
import CustomButton from "@components/common/Button/custom-button";
import Icon from '@components/common/icon/icon';
import Spinner from "@components/common/spinner/spinner";
import CustomError from "@components/common/error/custom-error";
import { useMerchantWithdrawsQuery } from "@data/withdraws/users-query";
import WithdrawsList from "@components/withdraws/withdraws-list";
import { useModal } from "@store/apps/modal";
import CustomTextField1 from '@components/common/text-field/custom-text-field-1';
import MenuItem from '@mui/material/MenuItem'
import { MerchantWithDrawalStatus } from "@utils/constants";
import { useTranslation } from "react-i18next";

const ShopCategoriesIndex = () => {
    const [page, setPage] = useState<number>(1)
    const [status, setStatus] = useState<string>('');
    const { t } = useTranslation(["common"]);
    const { openModal } = useModal();

    const { data: withdraws, isLoading, error } = useMerchantWithdrawsQuery({
        limit: Number(process.env.NEXT_PUBLIC_PAGINATED_QUERY_LIMIT),
        page: page,
        status: status
    });

    const onReset = () => {
        setPage(1); setStatus("");
    };

    const onPageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    if (isLoading) return <Spinner />
    if (error) return <CustomError errorMsg={error?.message} />
    return <>
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <Box
                    sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', mb: 8 }}
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
                            onClick={() => openModal({ view: "CREATE_WITHDRAW_REQUEST" })}
                            //@ts-ignore
                            startIcon={<Icon color='white' fontSize='1.625rem' icon={'streamline:payment-cash-out-3'} />}
                        >
                            Withdraw
                        </CustomButton>
                    </Box>
                </Box>

                <WithdrawsCards />
            </Grid>

            <Grid item xs={12}>

                <Card sx={{ borderRadius: 2 }}>
                    <CardContent>
                        <WithdrawsList
                            onPaginationChange={onPageChange}
                            data={withdraws?.withdraws?.data}
                            paginatorInfo={withdraws?.withdraws?.paginatorInfo}
                        />
                    </CardContent>
                </Card>
            </Grid>

        </Grid>
    </>
}

ShopCategoriesIndex.authProps = {
    allowedRoles: storeOwnerOnly
}
ShopCategoriesIndex.getLayout = (page: ReactNode) => <StoreOwnerLayout>{page}</StoreOwnerLayout>
export default ShopCategoriesIndex;