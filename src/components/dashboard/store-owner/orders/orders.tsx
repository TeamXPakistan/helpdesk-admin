import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { useEffect, useState } from "react";
import Spinner from "@components/common/spinner/spinner";
import CustomError from "@components/common/error/custom-error";
import { Card, CardContent, MenuItem } from "@mui/material";
import OrdersList from "./orders-list";
import { OrderStatus, VendorDashboardAnalyticsFilterBy, } from "@utils/constants";
import CustomTextField1 from "@components/common/text-field/custom-text-field-1";
import { useOrdersQuery } from "@data/orders/orders-query";
import { useTranslation } from 'react-i18next';

type PropTypes = {
    dates: { startDate: Date; endDate: Date },
    filter: VendorDashboardAnalyticsFilterBy,
    ordersStatus: OrderStatus
};

const Orders = ({ dates, filter, ordersStatus }: PropTypes) => {

    const [page, setPage] = useState<number>(1);
    const [status, setStatus] = useState<OrderStatus | "">(ordersStatus);
    const { t } = useTranslation(["common"])
    const { data: orders, isLoading: fetchingOrders, error: orderError } = useOrdersQuery({
        limit: Number(10),
        page: page,
        startDate: dates.endDate ? dates.startDate : null,
        endDate: dates.endDate ? dates.endDate : null,
        status: status
    });

    const onPageChange = (event: any, value: number) => {
        setPage(value);
    };

    useEffect(() => {
        setStatus(ordersStatus);
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
                        {filter === VendorDashboardAnalyticsFilterBy.TODAY ? t("common:new-orders") : t("common:orders")}
                    </Typography>

                    <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
                        {filter === VendorDashboardAnalyticsFilterBy.TODAY ? null :
                            <CustomTextField1
                                select
                                sx={{ '& .MuiFilledInput-input.MuiSelect-select': { minWidth: '8rem !important' } }}
                                SelectProps={{
                                    displayEmpty: true,
                                    value: status,
                                    onChange: (e) => setStatus(e.target.value as OrderStatus)
                                }}
                            >
                                <MenuItem disabled value={""}>Select status</MenuItem>
                                <MenuItem value={OrderStatus.CANCELLED}>{OrderStatus.CANCELLED}</MenuItem>
                                <MenuItem value={OrderStatus.DELIVERED}>{OrderStatus.DELIVERED}</MenuItem>
                            </CustomTextField1>
                        }
                    </Box>
                </Box>

                <CardContent sx={{ height: "58vh" }}>
                    <Box>
                        {orders?.orders?.data?.length as number > 0 ?
                            <OrdersList
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


export default Orders;