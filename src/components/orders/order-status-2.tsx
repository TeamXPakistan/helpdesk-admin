import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { MenuItem, Typography } from '@mui/material';
import { OrderStatus } from '@utils/constants';
import CustomTextField1 from '@components/common/text-field/custom-text-field-1';
import CustomButton from '@components/common/Button/custom-button';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { styled } from '@mui/material/styles';
import { Order } from '@ts-types/generated';
import { useChangeOrderStatusMutation } from '@data/orders/change-order-status-mutation';
import Icon from '@components/common/icon/icon';
import { useTranslation } from 'react-i18next';




const steps = [
    "PLACED",
    "CONFIRMED",
    "READY FOR PICKUP",
    "PICKED BY RIDER",
    "DELIVERED",
];

const activeStep = (orderStatus: string) => {
    if (orderStatus === OrderStatus.PLACED) return 1;
    if (orderStatus === OrderStatus.CONFIRMED) return 2;
    if (orderStatus === OrderStatus.READY) return 3;
    if (orderStatus === OrderStatus.PICKED) return 4;
    if (orderStatus === OrderStatus.DELIVERED) return 5;
}

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 11,
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundColor: theme.palette.primary.main,
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        height: 4,
        border: 0,
        backgroundColor:
            theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
        borderRadius: 5,
        marginRight: 8,
        marginLeft: 8,
        marginTop: 6
    },
}));

type PropTypes = {
    order: Order
}

export default function OrderStatus2({ order }: PropTypes) {
    const { t } = useTranslation(['common'])
    const [orderStatus, setOrderStatus] = React.useState<OrderStatus>(order?.status)
    const { mutate, isLoading } = useChangeOrderStatusMutation()

    const changeStatus = () => {
        mutate({ orderId: order._id, status: orderStatus });
    }

    return (<>
        <Box
            sx={{ gap: 4, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', mb: 8 }}
        >
            <Typography variant='h4' sx={{ color: "text.primary" }}>Order ID: {order.orderId}</Typography>

            {/* ORDER STATUS COMPONENT  */}
            {
                (
                    order.status === OrderStatus.PICKED ||
                    order.status === OrderStatus.DELIVERED ||
                    order.status === OrderStatus.CANCELLED
                ) ? null :
                    <Box sx={{ gap: 4, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>

                        <CustomTextField1
                            select
                            sx={{ '& .MuiFilledInput-input.MuiSelect-select': { minWidth: '8rem !important' } }}
                            SelectProps={{
                                displayEmpty: true,
                                value: orderStatus,
                                onChange: e => setOrderStatus(e.target.value as OrderStatus)
                            }}
                        >
                            <MenuItem disabled value={OrderStatus.PLACED}>Placed</MenuItem>
                            <MenuItem value={OrderStatus.CONFIRMED}>Confirm Order</MenuItem>
                            <MenuItem value={OrderStatus.READY}>Ready for Pickup</MenuItem>
                        </CustomTextField1>

                        <CustomButton
                            type="button"
                            variant='contained'
                            loading={isLoading}
                            disabled={isLoading || orderStatus === order.status}
                            fullWidth={false}
                            onClick={() => changeStatus()}
                        >
                            Change Status
                        </CustomButton>
                    </Box>
            }
        </Box>

        {
            (order.status === OrderStatus.CANCELLED) ?
                // if ORDER IS CANCELED
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 3, mb: 10 }}>
                    <Typography variant='h3'>Order Canceled</Typography>
                    <Icon color='red' fontSize='2.625rem' icon={'charm:circle-cross'} />
                </Box>
                :
                (order.status === OrderStatus.DELIVERED) ?
                    // if ORDER IS DELIVERED
                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 3, mb: 10 }}>
                        <Typography variant='h3'>Order Delivered</Typography>
                        <Icon color='green' fontSize='2.625rem' icon={'gg:check-o'} />
                    </Box>
                    :
                    // ORDER STATUS BAR / STEPPER
                    <Box sx={{ width: '100%', my: 10 }}>
                        <Stepper
                            activeStep={activeStep(order?.status)}
                            alternativeLabel
                            sx={{
                                "& .css-160yihj-MuiSvgIcon-root-MuiStepIcon-root": { width: 40, height: 40 },
                            }}
                            connector={< ColorlibConnector />}
                        >
                            {
                                steps.map((step) => (
                                    <Step key={step} >
                                        <StepLabel>{step}</StepLabel>
                                    </Step>
                                ))
                            }
                        </Stepper>
                    </Box >
        }

    </>
    );
}
