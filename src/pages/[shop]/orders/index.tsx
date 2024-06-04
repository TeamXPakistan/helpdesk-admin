import StoreOwnerLayout from "@layouts/store-owner-layout";
import { superAdmin_AdminStaff_and_StoreOwner } from "@utils/auth-utils";
import { ReactNode, useState } from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CustomTextField1 from '@components/common/text-field/custom-text-field-1';
import Spinner from '@components/common/spinner/spinner';
import CustomButton from '@components/common/Button/custom-button';
import CustomError from "@components/common/error/custom-error";
import { useOrdersQuery } from "@data/orders/orders-query";
import { CurrentOrPastOrders as CurrentOrPastOrdersEnum, OrderStatus, PaymentType } from "@utils/constants";
import OrdersList from "@components/orders/orders-list";
import { MenuItem } from "@mui/material";
import DatePicker from "react-datepicker"
import CustomInputs from '@components/common/datepicker-custom-input'
import DatePickerWrapper from "src/@core/styles/libs/react-datepicker";
import { useTranslation } from "react-i18next";


const OrdersIndex = () => {
    const [page, setPage] = useState<number>(1)
    const [text, setText] = useState<string>('')
    const [searchVal, setSearchVal] = useState<string>('')
    const [currentOrPastOrders, setCurrentOrPastOrders] = useState<CurrentOrPastOrdersEnum>(CurrentOrPastOrdersEnum.CURRENT)
    const [ordersStatus, setOrdersStatus] = useState<OrderStatus | "">("")
    const [paymentType, setPaymentType] = useState<PaymentType | "">("")
    const [startDate, setStartDate] = useState<Date | null>(null)
    const [endDate, setEndDate] = useState<Date | null>(null)
    const { t } = useTranslation(["common"])
    const { data: orders, isLoading, error } = useOrdersQuery({
        limit: Number(process.env.NEXT_PUBLIC_PAGINATED_QUERY_LIMIT),
        page: page,
        text: text,
        currentOrPastOrders: currentOrPastOrders,
        status: ordersStatus,
        orderType: paymentType,
        startDate: endDate ? startDate : null,
        endDate: endDate ? endDate : null,
    });

    const onPageChange = (event: any, value: number) => {
        setPage(value);
    };
    const onReset = () => {
        setPage(1); setText(''); setSearchVal(''); setOrdersStatus(""); setPaymentType(""); setStartDate(null); setEndDate(null)
    };
    const onCurrentOrPastOrderChange = (value: CurrentOrPastOrdersEnum) => {
        setCurrentOrPastOrders(value);
        onReset();
    };

    if (isLoading) return <Spinner />
    if (error) return <CustomError errorMsg={error.message} />
    return <>
        <Box
            sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}
        >
            <Typography variant='h4' sx={{ color: "text.primary" }}>
                {currentOrPastOrders === CurrentOrPastOrdersEnum.PAST ? t("Past Orders (Order History)") : t("common:current-orders")}
            </Typography>

            {/* SEARCH BAR  */}
            <Box sx={{ gap: 4, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
                <form onSubmit={(e) => {
                    e.preventDefault()
                    setText(searchVal)
                }}>
                    <CustomTextField1 value={searchVal} placeholder={`${t('common:placeholder-search-by-order-id')}`} onChange={e => setSearchVal(e.target.value)} />
                </form>

                {/* CURRENT OR PAST ORDERS  */}
                <CustomTextField1
                    select
                    sx={{ '& .MuiFilledInput-input.MuiSelect-select': { minWidth: '8rem !important' } }}
                    SelectProps={{
                        displayEmpty: true,
                        value: currentOrPastOrders,
                        onChange: (e) => onCurrentOrPastOrderChange(e.target.value as CurrentOrPastOrdersEnum)
                    }}
                >
                    <MenuItem value={CurrentOrPastOrdersEnum.CURRENT}>{t("common:current-orders")}</MenuItem>
                    <MenuItem value={CurrentOrPastOrdersEnum.PAST}>{t("common:past-orders")}</MenuItem>
                </CustomTextField1>

                {currentOrPastOrders === CurrentOrPastOrdersEnum.PAST ?
                    // PAST ORDER STATUSES 
                    <CustomTextField1
                        select
                        sx={{ '& .MuiFilledInput-input.MuiSelect-select': { minWidth: '8rem !important' } }}
                        SelectProps={{
                            displayEmpty: true,
                            value: ordersStatus,
                            onChange: (e) => setOrdersStatus(e.target.value as OrderStatus)
                        }}
                    >
                        <MenuItem disabled value={""}>{t("select-status")}</MenuItem>
                        <MenuItem value={OrderStatus.CANCELLED}>{t(OrderStatus.CANCELLED)}</MenuItem>
                        <MenuItem value={OrderStatus.DELIVERED}>{t(OrderStatus.DELIVERED)}</MenuItem>

                    </CustomTextField1>
                    :
                    // CURRENT ORDER STATUSES 
                    <CustomTextField1
                        select
                        sx={{ '& .MuiFilledInput-input.MuiSelect-select': { minWidth: '8rem !important' } }}
                        SelectProps={{
                            displayEmpty: true,
                            value: ordersStatus,
                            onChange: (e) => setOrdersStatus(e.target.value as OrderStatus)
                        }}
                    >
                        <MenuItem disabled value={""}>{t("select-status")}</MenuItem>
                        <MenuItem value={OrderStatus.READY}>{t(OrderStatus.READY)}</MenuItem>
                        <MenuItem value={OrderStatus.CONFIRMED}>{t(OrderStatus.CONFIRMED)}</MenuItem>
                        <MenuItem value={OrderStatus.PICKED}>{t(OrderStatus.PICKED)}</MenuItem>
                        <MenuItem value={OrderStatus.PLACED}>{t(OrderStatus.PLACED)}</MenuItem>
                    </CustomTextField1>
                }

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
                    <MenuItem disabled value={""}>{t("common:select-payment")}</MenuItem>
                    <MenuItem value={PaymentType.CASH_ON_DELIVERY}>{t("common:cash-on-delivery")}</MenuItem>
                    <MenuItem value={PaymentType.ONLINE_PAYMENTS}>{t("Online")}</MenuItem>
                </CustomTextField1>

                <CustomButton
                    type="button"
                    variant='contained'
                    fullWidth={false}
                    onClick={() => onReset()}>
                    {t("Reset")}
                </CustomButton>
            </Box>
        </Box>


        <Box sx={{ gap: 4, display: 'flex', flexDirection: "row", justifyContent: "end", mb: 8 }}>
            {/* Date Range Filter  */}
            <DatePickerWrapper>
                <Box sx={{ display: 'flex', flexWrap: 'wrap' }} className='demo-space-x'>
                    <div>
                        <DatePicker
                            selected={startDate}
                            dateFormat="MMMM d, yyyy"
                            showYearDropdown
                            showMonthDropdown
                            // showTimeSelect
                            todayButton="today"
                            name='tradeLicence.tradeLicenseIssueAt'
                            id='basic-input'
                            onChange={(date: Date) => setStartDate(() => {
                                const dateVal = new Date(date)
                                dateVal.setHours(1)
                                dateVal.setMinutes(0)
                                return dateVal;
                            })}
                            placeholderText={`${t("common:placeholder-filter-date")}`}
                            customInput={<CustomInputs label={`${t('start-date')}`} />}
                        />
                    </div>
                    <div>
                        <DatePicker
                            selected={endDate}
                            dateFormat="MMMM d, yyyy"
                            disabled={startDate ? false : true}
                            showYearDropdown
                            showMonthDropdown
                            // showTimeSelect
                            todayButton="today"
                            id='disabled-input'
                            minDate={startDate}
                            name='tradeLicence.tradeLicenseExpireAt'
                            onChange={(date: Date) => setEndDate(() => {
                                const dateVal = new Date(date)
                                dateVal.setHours(23)
                                dateVal.setMinutes(59)
                                return dateVal;
                            })}
                            placeholderText={`${t("common:placeholder-filter-date")}`}
                            customInput={<CustomInputs label={`${t('end-date')}`} />}
                        />
                    </div>
                </Box>
            </DatePickerWrapper>
        </Box>


        <Card sx={{ borderRadius: 2 }}>
            <CardContent>
                <OrdersList
                    onPaginationChange={onPageChange}
                    data={orders?.orders.data}
                    paginatorInfo={orders.orders?.paginatorInfo}
                />
            </CardContent>
        </Card>
    </>
}

OrdersIndex.authProps = {
    allowedRoles: superAdmin_AdminStaff_and_StoreOwner,
}
OrdersIndex.getLayout = (page: ReactNode) => <StoreOwnerLayout>{page}</StoreOwnerLayout>
export default OrdersIndex;