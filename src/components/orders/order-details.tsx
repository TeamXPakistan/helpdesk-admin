// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import List, { ListProps } from '@mui/material/List'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { Order, OrderProduct } from '@ts-types/generated'
import OrderDetailsSimpleProduct from './order-details-simple-product'
import OrderDetailsVariableProduct from './order-details-variable-product'
import CustomButton from '@components/common/Button/custom-button'
import { OrderStatus } from '@utils/constants'
import { useModal } from '@store/apps/modal'
import { formatPrice } from '@utils/products'
import dayjs from 'dayjs'

const StyledList = styled(List)<ListProps>(({ theme }) => ({
  padding: 0,
  '& .MuiListItem-root': {
    padding: theme.spacing(6),
    // border: `1px solid ${theme.palette.divider}`,
    '&:first-of-type': {
      borderTopLeftRadius: 6,
      borderTopRightRadius: 6
    },
    '&:last-of-type': {
      borderBottomLeftRadius: 6,
      borderBottomRightRadius: 6
    },
    '&:not(:last-of-type)': {
      borderBottom: 0
    },
    '& .MuiListItemText-root': {
      marginTop: 0,
      marginBottom: theme.spacing(4),
      '& .MuiTypography-root': {
        color: theme.palette.text.secondary
      }
    },
    '& .remove-item': {
      top: '0.5rem',
      right: '0.625rem',
      position: 'absolute',
      color: theme.palette.text.disabled
    },
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column'
    }
  }
}))


const HorizontalList = styled(List)<ListProps>(({ theme }) => ({
  padding: 0,
  display: 'flex',
  borderRadius: 6,
  border: `1px solid ${theme.palette.divider}`,
  '& .MuiListItem-root': {
    padding: theme.spacing(6),
    '&:not(:last-of-type)': {
      borderRight: `1px solid ${theme.palette.divider}`
    }
  },
  [theme.breakpoints.down('md')]: {
    display: 'block',
    '& .MuiListItem-root': {
      '&:not(:last-of-type)': {
        borderRight: 0,
        borderBottom: `1px solid ${theme.palette.divider}`
      }
    }
  }
}))

type PropTypes = {
  order: Order
}

const OrderDetails = ({ order }: PropTypes) => {
  const { customer, dropOff, orderType, subTotal, tax, deliveryCharges, products, specialNote, orderId, driver } = order;
  const { openModal } = useModal()

  console.log(order)

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Box sx={{ display: 'flex', textAlign: 'center', alignItems: 'center', flexDirection: 'column' }}>
          <Typography variant='h4' sx={{ mb: 4 }}>
            Order Details
          </Typography>
          {
            (
              order.status === OrderStatus.PICKED ||
              order.status === OrderStatus.DELIVERED ||
              order.status === OrderStatus.CANCELLED
            ) ? null :
              <Typography sx={{ mb: 4, color: 'text.secondary' }}>
                New order{' '}
                <Box
                  href='/'
                  component={Link}
                  onClick={e => e.preventDefault()}
                  sx={{ color: 'primary.main', textDecoration: 'none' }}
                >
                  {orderId}
                </Box>{' '}
                has been placed!
              </Typography>
          }

          <Box sx={{ display: 'flex', alignItems: 'center', '& svg': { color: 'text.secondary' } }}>
            <Icon icon='tabler:clock' fontSize={20} />
            <Typography sx={{ ml: 1.5, color: 'text.secondary' }}>
              <Typography component='span' sx={{ fontWeight: 500, color: 'text.secondary' }}>
                Time placed:
              </Typography>{' '}
              {dayjs(order?.createdAt).format('h:mm A')} {' | '}
              {dayjs(order?.createdAt).format('DD-MMMM-YYYY')}
            </Typography>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <HorizontalList>

          {/* Customer Details */}
          <ListItem sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
            <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
              <Box sx={{ mr: 1.5, display: 'flex' }}>
                <Icon icon='tabler:user-circle' fontSize={20} />
              </Box>
              <Typography variant='h6' sx={{ textDecoration: "underline" }}>Customer Details</Typography>
            </Box>
            <Typography fontWeight="bold">Customer Name</Typography>
            <Typography>{customer.name ?? "-"}</Typography>
            <Typography fontWeight="bold">Email</Typography>
            <Typography>{customer.email ?? "-"}</Typography>
            <Typography fontWeight="bold">Contact</Typography>
            <Typography>{customer.contact ?? "-"}</Typography>
          </ListItem>

          {/* Billing Address */}
          <ListItem sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
            <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
              <Box sx={{ mr: 1.5, display: 'flex' }}>
                <Icon icon='tabler:map-pin' fontSize={20} />
              </Box>
              <Typography variant='h6' sx={{ textDecoration: "underline" }}>Billing Address</Typography>
            </Box>
            <Typography fontWeight="bold">Name</Typography>
            <Typography>{customer.name ?? "-"}</Typography>
            <Typography fontWeight="bold">Address</Typography>
            <Typography>{dropOff.address ?? "-"}</Typography>
            <Typography fontWeight="bold">Contact</Typography>
            <Typography>{customer.contact ?? "-"}</Typography>
          </ListItem>

          {/* Payment Details  */}
          <ListItem sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
            <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
              <Box sx={{ mr: 1.5, display: 'flex' }}>
                <Icon icon='tabler:credit-card' fontSize={20} />
              </Box>
              <Typography variant='h6' sx={{ textDecoration: "underline" }}>Payment Details</Typography>
            </Box>

            <Typography fontWeight="bold">Payment Type</Typography>
            <Typography>{orderType ?? "-"}</Typography>
          </ListItem>

          {/* Driver Details  */}
          {driver &&
            <ListItem sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
              <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
                <Box sx={{ mr: 1.5, display: 'flex' }}>
                  <Icon icon='tabler:user-circle' fontSize={20} />
                </Box>
                <Typography variant='h6' sx={{ textDecoration: "underline" }}>Driver Details</Typography>
              </Box>
              <Typography fontWeight="bold">Driver Name</Typography>
              <Typography>{driver?.name ?? "-"}</Typography>
              <Typography fontWeight="bold">Email</Typography>
              <Typography>{driver.email ?? "-"}</Typography>
              <Typography fontWeight="bold">Contact</Typography>
              <Typography>{driver.contact ?? "-"}</Typography>
            </ListItem>
          }

        </HorizontalList>
      </Grid>


      {/* <<<<<<<<<<<<<<<<<<<<<<<<<<<<<  PRODUCTS LIST & DETAILS  >>>>>>>>>>>>>>>>>>>>>>>>> */}
      <Grid item xs={12} md={8} xl={9}>
        <StyledList>
          {products?.map((product: OrderProduct, index) => {
            if (product.veriations) {
              return <OrderDetailsVariableProduct product={product} key={index} />
            } else {
              return <OrderDetailsSimpleProduct product={product} key={index} />
            }
          })}
        </StyledList>
      </Grid>

      {/* <<<<<<<<<<<<<<<<<<<<<<<<<<<<<  PRICE DETAILS  >>>>>>>>>>>>>>>>>>>>>>>>> */}
      <Grid item xs={12} md={4} xl={3}>

        {specialNote &&
          <Box sx={{ display: "flex", flexDirection: "column", border: `1px solid rgba(21, 1, 1, 0.16)`, borderRadius: "6px", px: 3, py: 4, mb: 3 }}>
            <Typography sx={{ color: 'text.main', fontWeight: "bold", mr: 2 }}>Special Note: </Typography>
            <Typography sx={{ color: 'text.main' }}>{specialNote}</Typography>
          </Box>
        }

        <Box sx={{ mb: 4, borderRadius: 1, border: theme => `1px solid ${theme.palette.divider}` }}>
          <CardContent>
            <Typography sx={{ mb: 4, fontWeight: "bold", textDecoration: "underline" }} variant='h6'>
              Price Details
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Box
                sx={{
                  mb: 4,
                  gap: 2,
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <Typography>(Vendor's) Sub Total</Typography>
                <Typography sx={{ color: 'text.secondary' }}>{formatPrice(subTotal) ?? "0.00"}</Typography>
              </Box>
              <Box
                sx={{
                  mb: 4,
                  gap: 2,
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <Typography>Tax</Typography>
                <Typography sx={{ color: 'text.secondary' }}>{formatPrice(tax) ?? "0.00"}</Typography>
              </Box>
              <Box
                sx={{
                  gap: 2,
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <Typography>Delivery Charges</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                  {deliveryCharges ?
                    <Typography sx={{ mr: 2 }}>{formatPrice(deliveryCharges)}</Typography> :
                    <CustomChip rounded size='small' skin='light' color='success' label='Free' />
                  }
                </Box>
              </Box>
            </Box>
          </CardContent>
          <Divider sx={{ m: '0 !important' }} />
          <CardContent sx={{ py: theme => `${theme.spacing(3.5)} !important` }}>
            <Box
              sx={{ gap: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}
            >
              <Typography sx={{ fontWeight: "bold" }}>Total</Typography>
              <Typography sx={{ fontWeight: "bold" }}>{formatPrice(deliveryCharges + tax + subTotal)}</Typography>
            </Box>
          </CardContent>
        </Box>

        {
          (
            order.status === OrderStatus.PICKED ||
            order.status === OrderStatus.DELIVERED ||
            order.status === OrderStatus.CANCELLED
          ) ? null :
            <CustomButton
              type="button"
              variant='contained'
              fullWidth={false}
              onClick={() => openModal({ view: "CANCEL_ORDER_VIEW", data: { orderId: order._id } })}
            >
              Cancel order
            </CustomButton>
        }

      </Grid>
    </Grid >
  )
}

export default OrderDetails
