// ** MUI Imports
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Custom Component Import
import Icon from 'src/@core/components/icon'
import CustomAvatar from 'src/@core/components/mui/avatar'
import { Box } from '@mui/system'
import { Grid } from '@mui/material'
import { AdminAnalytics } from '@ts-types/generated'
import { formatPrice } from '@utils/products'
import { useTranslation } from 'react-i18next'

type DataType = {
  value: string
  subtitle: string
  avatarColor: "error" | "primary" | "secondary" | "warning" | "info" | "success" | undefined
  avatarIcon: string
}

type PropTypes = {
  analytics: AdminAnalytics;
}

const analyticsArray = (analytics: AdminAnalytics): DataType[] => {
  return [
    {
      value: formatPrice(analytics?.totalEarning),
      subtitle: "Total Earnings",
      avatarColor: "error",
      avatarIcon: "tabler:currency-dollar"
    },
    {
      value: formatPrice(analytics?.totalParcelsEarning),
      subtitle: "Total Parcel Earnings",
      avatarColor: "error",
      avatarIcon: "tabler:currency-dollar"
    },
    {
      value: formatPrice(analytics?.totalOrdersEarning),
      subtitle: "Total Orders Earnings",
      avatarColor: "error",
      avatarIcon: "tabler:currency-dollar"
    },
    {
      value: analytics?.totalOrders?.toString(),
      subtitle: "Total Orders",
      avatarColor: "error",
      avatarIcon: 'tabler:shopping-cart'
    },
    {
      value: analytics?.totalParcels?.toString(),
      subtitle: "Total Parcels",
      avatarColor: "error",
      avatarIcon: "arcticons:parcel-tracker"
    },
    {
      value: analytics?.totalUsers?.toString(),
      subtitle: "Total Users",
      avatarColor: "error",
      avatarIcon: "teenyicons:users-solid"
    },
    {
      value: analytics?.totalHealths?.toString(),
      subtitle: "Total Pharmacy",
      avatarColor: "error",
      avatarIcon: "covid:vaccine-protection-medicine-pill"
    },
    {
      value: analytics?.totalHomeBase?.toString(),
      subtitle: "Total Home Business",
      avatarColor: "error",
      avatarIcon: "ic:outline-add-business"
    },
    {
      value: analytics?.totalGroceryStores?.toString(),
      subtitle: "Total Grocery Stores",
      avatarColor: "error",
      avatarIcon: "ic:outline-add-business"
    },
    {
      value: analytics?.totalResturants?.toString(),
      subtitle: "Total Resturants",
      avatarColor: "error",
      avatarIcon: "streamline:store-1"
    },
    {
      value: analytics?.totalDrivers?.toString(),
      subtitle: "Total Drivers",
      avatarColor: "error",
      avatarIcon: "mdi:bike"
    },
    {
      value: analytics?.totalMerchants?.toString(),
      subtitle: "Total Merchants",
      avatarColor: "error",
      avatarIcon: "streamline:store-1"
    },

    {
      value: analytics?.totalCancilOrders?.toString(),
      subtitle: "Total Cancel Orders",
      avatarColor: "error",
      avatarIcon: 'material-symbols:cancel-outline'
    },
  ]
}

const EcommerceStatistics = ({ analytics }: PropTypes) => {

  const { t } = useTranslation(["common"]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: "start", gap: 4 }}>
      <Grid container spacing={6}>
        {analyticsArray(analytics).map((item) => (
          <>
            <Grid item xs={12} sm={4} md={3}>
              <Card >
                <CardContent sx={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', flexWrap: "nowrap", gap: 4 }}>
                  <CustomAvatar
                    skin='light'
                    variant='rounded'
                    color={item?.avatarColor}
                    sx={{ mb: 3.5, width: 44, height: 44 }}
                  >
                    <Icon icon={item?.avatarIcon} fontSize={'1.75rem'} />
                  </CustomAvatar>
                  <Box>
                    <Typography variant='h5'>
                      {item?.value}
                    </Typography>
                    <Typography variant='body1' sx={{ mb: 1, color: 'text.disabled' }}>
                      {t(item?.subtitle)}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </>
        ))}
      </Grid>
    </Box>
  )
}

export default EcommerceStatistics;
