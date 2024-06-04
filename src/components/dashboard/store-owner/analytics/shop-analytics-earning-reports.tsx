// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import { useTheme } from '@mui/material/styles'
import LinearProgress from '@mui/material/LinearProgress'


// ** Type Import
import { ThemeColor } from 'src/@core/layouts/types'

// ** Custom Components Imports
import Icon from 'src/@core/components/icon'
import CustomAvatar from 'src/@core/components/mui/avatar'
import { formatPrice } from '@utils/products'
import { VendorAnalytics } from '@ts-types/generated'
import CustomTextField1 from '@components/common/text-field/custom-text-field-1'
import { DriverAnalyticsFilterBy, VendorDashboardAnalyticsFilterBy } from '@utils/constants'
import { MenuItem } from '@mui/material'

// ** Util Import

interface DataType {
  stats: string
  title: string
  progress: number
  avatarIcon: string
  avatarColor?: ThemeColor
  progressColor?: ThemeColor
}

type PropType = {
  analytics: VendorAnalytics,
  onFilterChange: (val: any) => void,
  filter: string,
}



const VendorAnalytics = ({ analytics, filter, onFilterChange }: PropType) => {
  // ** Hook
  const theme = useTheme()

  const data: DataType[] = [
    {
      progress: 90,
      stats: formatPrice(analytics?.totalOrdersEarning ?? 0),
      title: 'Total Earning',
      avatarColor: 'info',
      progressColor: 'info',
      avatarIcon: 'tabler:currency-dollar'
    },
    {
      progress: 90,
      avatarColor: 'success',
      stats: analytics?.totalOrders?.toString() ?? 0,
      title: 'Total Orders',
      progressColor: 'success',
      avatarIcon: 'tabler:shopping-cart'
    },
    {
      progress: 90,
      stats: analytics?.totalReviews?.toString() ?? 0,
      avatarColor: 'primary',
      title: 'Reviews',
      progressColor: 'primary',
      avatarIcon: 'material-symbols:comment-outline'
    },

    {
      progress: 90,
      stats: analytics?.totalProducts?.toString() ?? 0,
      avatarColor: 'info',
      progressColor: 'info',
      title: 'Total Products',
      avatarIcon: 'fluent-mdl2:product-list'
    },
    {
      progress: 90,
      avatarColor: 'success',
      progressColor: 'success',
      stats: analytics?.totalCancilOrders?.toString() ?? 0,
      title: 'Total Cancel Orders',
      avatarIcon: 'material-symbols:cancel-outline'
    },
    {
      progress: 90,
      stats: analytics?.totalRating?.toString() ?? 0,
      avatarColor: 'primary',
      title: 'Rating',
      progressColor: 'primary',
      avatarIcon: 'material-symbols:star-rate'
    },
  ]


  return (
    <Card>
      <CardHeader
        sx={{ pb: 0 }}
        title='DASHBOARD'
        subheader='Overview'
        action={
          <CustomTextField1
            select
            sx={{ pr: 0, pt: 0, '& .MuiFilledInput-input.MuiSelect-select': { minWidth: '8rem !important' } }}
            SelectProps={{
              displayEmpty: true,
              value: filter,
              onChange: e => onFilterChange(e?.target?.value as DriverAnalyticsFilterBy)
            }}
          >
            <MenuItem disabled value=''>Status</MenuItem>
            <MenuItem value={VendorDashboardAnalyticsFilterBy.TODAY}>Today</MenuItem>
            <MenuItem value={VendorDashboardAnalyticsFilterBy.WEEKLY}>Weekly</MenuItem>
            <MenuItem value={VendorDashboardAnalyticsFilterBy.MONTHLY}>Monthly</MenuItem>
            <MenuItem value={VendorDashboardAnalyticsFilterBy.YEARLY}>Yearly</MenuItem>
          </CustomTextField1>
        }
      />
      <CardContent>
        <Box sx={{ mt: 6, borderRadius: 1, p: theme.spacing(4, 5) }}>
          <Grid container spacing={6}>
            {data.map((item: DataType, index: number) => (
              <Grid item xs={12} sm={4} key={index} sx={{ pb: 10 }}>
                <Box sx={{ mb: 2.5, display: 'flex', alignItems: 'center' }}>
                  <CustomAvatar
                    skin='light'
                    variant='rounded'
                    color={item.avatarColor}
                    sx={{ mr: 2, width: 26, height: 26 }}
                  >
                    <Icon fontSize='1.125rem' icon={item.avatarIcon} />
                  </CustomAvatar>
                  <Typography variant='h6'>{item.title}</Typography>
                </Box>
                <Typography variant='h4' sx={{ mb: 2.5 }}>
                  {item.stats}
                </Typography>
                <LinearProgress
                  variant='determinate'
                  value={item.progress}
                  color={item.progressColor}
                  sx={{ height: 4 }}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </CardContent>
    </Card>
  )
}

export default VendorAnalytics
