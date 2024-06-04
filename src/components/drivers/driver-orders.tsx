import { useRouter } from "next/router";
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { useEffect, useState } from "react";
import Spinner from "@components/common/spinner/spinner";
import CustomError from "@components/common/error/custom-error";
import { Card, CardContent, MenuItem } from "@mui/material";
import { useUserOrdersForAdminQuery } from "@data/orders/user-orders-for-admin-query";
import DriverOrdersList from "./driver-orders-list";
import { PaymentType, CurrentOrPastOrders as CurrentOrPastOrdersEnum, OrderStatus, } from "@utils/constants";
import CustomTextField1 from "@components/common/text-field/custom-text-field-1";
import CustomButton from "@components/common/Button/custom-button";
import DatePickerWrapper from "src/@core/styles/libs/react-datepicker";
import DatePicker from "react-datepicker"
import CustomInputs from '@components/common/datepicker-custom-input'

type PropTypes = {
    dates: { startDate: Date; endDate: Date }
};

const DriverOrders = ({ dates }: PropTypes) => {
    const [page, setPage] = useState<number>(1);
    const [paymentType, setPaymentType] = useState<PaymentType | "">("");
    const [startDate, setStartDate] = useState<Date | null>(dates?.startDate);
    const [endDate, setEndDate] = useState<Date | null>(dates?.endDate);
    const router = useRouter();


    const { data: orders, isLoading: fetchingOrders, error: orderError } = useUserOrdersForAdminQuery({
        limit: Number(process.env.NEXT_PUBLIC_PAGINATED_QUERY_LIMIT),
        page: page,
        driverId: router?.query?.id as string,
        currentOrPastOrders: CurrentOrPastOrdersEnum.PAST,
        orderType: paymentType,
        startDate: endDate ? startDate : null,
        endDate: endDate ? endDate : null,
        status: OrderStatus.DELIVERED
    });

    const onPageChange = (event: any, value: number) => {
        setPage(value);
    };
    const onReset = () => {
        setPage(1); setPaymentType(""); setStartDate(dates?.startDate); setEndDate(dates?.endDate)
    };

    console.log(orders)
    useEffect(() => {
        setStartDate(dates?.startDate)
        setEndDate(dates?.endDate)
    }, [dates])


    if (fetchingOrders) return <Spinner />
    if (orderError) return <CustomError errorMsg={orderError?.message} />
    return (
        <>
            <Card >
                <Box
                    sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', p: 8 }}
                >
                    <Typography variant='h4' sx={{ color: "text.primary" }}>
                        Past Orders (Order History)
                    </Typography>

                    <Box sx={{ gap: 4, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>

                        {/* PAYMENT TYPES */}
                        <CustomTextField1
                            select
                            sx={{ '& .MuiFilledInput-input.MuiSelect-select': { minWidth: '8rem !important' } }}
                            SelectProps={{
                                displayEmpty: true,
                                value: paymentType,
                                onChange: (e) => setPaymentType(e.target.value as PaymentType)
                            }}
                        >
                            <MenuItem disabled value={""}>Select Payment</MenuItem>
                            <MenuItem value={PaymentType.CASH_ON_DELIVERY}>Cash on delivery</MenuItem>
                            <MenuItem value={PaymentType.ONLINE_PAYMENTS}>Online</MenuItem>
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

                <Box sx={{ gap: 4, display: 'flex', flexDirection: "row", justifyContent: "end", mb: 8, mt: -8, px: 4 }}>
                    {/* Date Range Filter  */}
                    <DatePickerWrapper>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap' }} className='demo-space-x'>
                            <div>
                                <DatePicker
                                    selected={startDate}
                                    dateFormat="MMMM d, yyyy"
                                    showYearDropdown
                                    showMonthDropdown
                                    name='tradeLicence.tradeLicenseIssueAt'
                                    id='basic-input'
                                    onChange={(date: Date) => setStartDate(() => {
                                        const dateVal = new Date(date)
                                        dateVal.setHours(1)
                                        dateVal.setMinutes(0)
                                        return dateVal;
                                    })}
                                    placeholderText='Click to select a date'
                                    customInput={<CustomInputs label='Start Date' />}
                                />
                            </div>
                            <div>
                                <DatePicker
                                    selected={endDate}
                                    dateFormat="MMMM d, yyyy"
                                    disabled={startDate ? false : true}
                                    showYearDropdown
                                    showMonthDropdown
                                    id='disabled-input'
                                    minDate={startDate}
                                    name='tradeLicence.tradeLicenseExpireAt'
                                    onChange={(date: Date) => setEndDate(() => {
                                        const dateVal = new Date(date)
                                        dateVal.setHours(23)
                                        dateVal.setMinutes(59)
                                        return dateVal;
                                    })}
                                    placeholderText='Click to select a date'
                                    customInput={<CustomInputs label='End Date' />}
                                />
                            </div>
                        </Box>
                    </DatePickerWrapper>
                </Box>

                <CardContent>
                    <Box >
                        {orders?.orders?.data?.length as number > 0 ?
                            <DriverOrdersList
                                onPaginationChange={onPageChange}
                                data={orders?.orders?.data}
                                paginatorInfo={orders?.orders?.paginatorInfo}
                            />
                            :
                            <Typography variant="h5" sx={{ py: 5 }}>No orders</Typography>}
                    </Box>
                </CardContent>
            </Card>

        </>
    )
};


export default DriverOrders;