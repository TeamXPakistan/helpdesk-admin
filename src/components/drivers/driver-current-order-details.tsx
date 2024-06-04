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
import { DriverCurrentOrder, OrderProduct } from '@ts-types/generated'
import { OrderStatus } from '@utils/constants'
import { formatPrice } from '@utils/products'
import OrderDetailsVariableProduct from '@components/orders/order-details-variable-product'
import OrderDetailsSimpleProduct from '@components/orders/order-details-simple-product'

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
  order: DriverCurrentOrder;
}

const DriverCurrentOrderDetails = ({ order }: PropTypes) => {
  const { customer, orderType, subTotal, tax, total, deliveryCharges, products, specialNote, orderId } = order.orders;
  const { dropOff, pickup, shop } = order;

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
              25/05/2020 13:35pm
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


            <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
              <Box sx={{ mr: 1.5, display: 'flex' }}>
                <Icon icon='tabler:home' fontSize={20} />
              </Box>
              <Typography variant='h6' sx={{ textDecoration: "underline" }}>Shop Details</Typography>
            </Box>
            <Typography fontWeight="bold">Shop Name</Typography>
            <Typography>{shop?.name ?? "-"}</Typography>
            <Typography fontWeight="bold">Contact</Typography>
            <Typography>{shop?.setting?.contact ?? "-"}</Typography>

          </ListItem>

          {/* PICK UP Address */}
          <ListItem sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
            <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
              <Box sx={{ mr: 1.5, display: 'flex' }}>
                <Icon icon='tabler:map-pin' fontSize={20} />
              </Box>
              <Typography variant='h6' sx={{ textDecoration: "underline" }}>Pick up</Typography>
            </Box>
            <Typography fontWeight="bold">Address</Typography>
            <Typography>{pickup?.formattedAddress ?? "-"}</Typography>
            <Typography fontWeight="bold">State</Typography>
            <Typography>{pickup?.state ?? "-"}</Typography>
            <Typography fontWeight="bold">City</Typography>
            <Typography>{pickup?.city ?? "-"}</Typography>
          </ListItem>

          {/* DropOFF Address */}
          <ListItem sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
            <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
              <Box sx={{ mr: 1.5, display: 'flex' }}>
                <Icon icon='tabler:map-pin' fontSize={20} />
              </Box>
              <Typography variant='h6' sx={{ textDecoration: "underline" }}>Drop off</Typography>
            </Box>
            <Typography fontWeight="bold">Address</Typography>
            <Typography>{dropOff?.address ?? "-"}</Typography>
            <Typography fontWeight="bold">Additional Direction</Typography>
            <Typography>{dropOff?.additionalDirection ?? "-"}</Typography>
            <Typography fontWeight="bold">Building</Typography>
            <Typography>{dropOff?.building ?? "-"}</Typography>
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
                <Typography>Sub Total</Typography>
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
              <Typography sx={{ fontWeight: "bold" }}>{formatPrice(total)}</Typography>
            </Box>
          </CardContent>
        </Box>

      </Grid>
    </Grid >
  )
}

export default DriverCurrentOrderDetails
