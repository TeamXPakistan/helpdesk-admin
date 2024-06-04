// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Types
import { ThemeColor } from 'src/@core/layouts/types'

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'
import { formatPrice } from '@utils/products'
import CustomTextField1 from '@components/common/text-field/custom-text-field-1'
import { MenuItem } from '@mui/material'
import { DriverAnalyticsFilterBy, VendorDashboardAnalyticsFilterBy } from '@utils/constants'
import { VendorAnalytics } from '@ts-types/generated'
import { useTranslation } from 'react-i18next'

interface DataType {
  icon: string
  stats: string
  title: string
  color: ThemeColor
}

type PropType = {
  analytics?: VendorAnalytics,
  onFilterChange: (val: any) => void,
  filter: string,
}

const RenderStats = (data: DataType[]) => {
  const { t } = useTranslation(["commonn"]);


  return data?.map((sale: DataType, index: number) => (
    <Grid item xs={6} sm={4} md={3} key={index} sx={{ pb: 10 }}>
      <Box key={index} sx={{ display: 'flex', alignItems: 'center' }} >
        <CustomAvatar skin='light' color={sale.color} sx={{ mr: 4, width: 42, height: 42 }}>
          <Icon icon={sale.icon} fontSize='1.5rem' />
        </CustomAvatar>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant='h6'>{t(sale.title)}</Typography>
          <Typography variant='h5'>{sale.stats}</Typography>
        </Box>
      </Box>
    </Grid>
  ))
}

const VendorAnalytics = ({ analytics, filter, onFilterChange }: PropType) => {

  const { t } = useTranslation(["common"]);

  const data: DataType[] = [
    {
      stats: formatPrice(analytics?.totalOrdersEarning ?? 0),
      title: 'common:total-earning',
      color: 'primary',
      icon: 'tabler:currency-dollar'
    },
    {
      color: 'info',
      stats: analytics?.totalOrders?.toString() ?? 0,
      title: 'common:total-order',
      icon: 'tabler:shopping-cart'
    },
    {
      color: 'error',
      stats: analytics?.totalCancilOrders?.toString() ?? 0,
      title: 'common:total-cancel-order',
      icon: 'material-symbols:cancel-outline'
    },
    {
      stats: analytics?.totalProducts?.toString() ?? 0,
      color: 'success',
      title: 'common:total-product',
      icon: 'fluent-mdl2:product-list'
    },
    {
      stats: analytics?.totalReviews?.toString() ?? 0,
      color: 'info',
      title: 'common:Reviews',
      icon: 'material-symbols:comment-outline'
    },
    {
      stats: analytics?.totalRating?.toString() ?? 0,
      color: 'error',
      title: 'common:Rating',
      icon: 'material-symbols:star-rate'
    },
  ]

  return (
    <Card>
      <CardHeader
        title={t('common:DASHBOARD')}
        sx={{ '& .MuiCardHeader-action': { m: 0, alignSelf: 'center' } }}
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
            <MenuItem disabled value=''>{t("Status")}</MenuItem>
            <MenuItem value={VendorDashboardAnalyticsFilterBy.TODAY}>{t("Today")}</MenuItem>
            <MenuItem value={VendorDashboardAnalyticsFilterBy.WEEKLY}>{t("Weekly")}</MenuItem>
            <MenuItem value={VendorDashboardAnalyticsFilterBy.MONTHLY}>{t("Monthly")}</MenuItem>
            <MenuItem value={VendorDashboardAnalyticsFilterBy.YEARLY}>{t("Yearly")}</MenuItem>
          </CustomTextField1>
        }
      />
      <CardContent
        sx={{ pt: theme => `${theme.spacing(7)} !important`, pb: theme => `${theme.spacing(0)} !important` }}
      >
        <Grid container spacing={0}>
          {RenderStats(data)}
        </Grid>
      </CardContent>
    </Card>
  )
}

export default VendorAnalytics
