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
import { DriverAnalytics } from '@ts-types/generated'
import CustomTextField1 from '@components/common/text-field/custom-text-field-1'
import { MenuItem } from '@mui/material'
import { DriverAnalyticsFilterBy } from '@utils/constants'

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
  driverDetails: DriverAnalytics,
  onStatusChange: (val: any) => void,
  statusValue: string
}

const DriverAnalytics = ({ driverDetails, onStatusChange, statusValue }: PropType) => {
  // ** Hook
  const theme = useTheme()
  const { totalEarning, totalOrders, totalOrdersEarning, totalParcels, totalParcelsEarning, totalSpendTime } = driverDetails

  const data: DataType[] = [
    {
      progress: 0,
      stats: formatPrice(totalEarning),
      title: 'Total Earnings',
      avatarIcon: 'tabler:currency-dollar'
    },
    {
      progress: 0,
      title: 'Total Order Earnings',
      stats: formatPrice(totalOrdersEarning),
      avatarColor: 'info',
      progressColor: 'info',
      avatarIcon: 'tabler:currency-dollar'
    },
    {
      progress: 0,
      title: 'Total parcel Earnings',
      stats: formatPrice(totalParcelsEarning),
      avatarColor: 'error',
      progressColor: 'error',
      avatarIcon: 'tabler:currency-dollar'
    },
    {
      progress: 0,
      stats: totalOrders.toString(),
      title: 'Total completed Orders',
      avatarIcon: 'tabler:box'
    },
    {
      progress: 0,
      title: 'Total completed parcels',
      stats: totalParcels.toString(),
      avatarColor: 'info',
      progressColor: 'info',
      avatarIcon: 'tabler:box'
    },
    {
      progress: 0,
      stats: `${totalSpendTime.hours}h ${totalSpendTime.minuts}m`,
      title: 'Total Spend Time (Today)',
      avatarColor: 'error',
      progressColor: 'error',
      avatarIcon: 'tabler:chart-pie-2'
    }
  ]

  return (
    <Card>

      <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <CardHeader
          sx={{ pb: 0 }}
          title='Analytics'
          subheader='Overview'
        />

        <CustomTextField1
          select
          sx={{ pr: 10, pt: 5, '& .MuiFilledInput-input.MuiSelect-select': { minWidth: '8rem !important' } }}
          SelectProps={{
            displayEmpty: true,
            value: statusValue,
            onChange: e => onStatusChange(e?.target?.value as DriverAnalyticsFilterBy)
          }}
        >
          <MenuItem disabled value=''>Status</MenuItem>
          <MenuItem value={DriverAnalyticsFilterBy.TODAY}>Today</MenuItem>
          <MenuItem value={DriverAnalyticsFilterBy.WEEKLY}>Weekly</MenuItem>
          <MenuItem value={DriverAnalyticsFilterBy.MONTHLY}>Monthly</MenuItem>
          <MenuItem value={DriverAnalyticsFilterBy.YEARLY}>Yearly</MenuItem>
        </CustomTextField1>
      </Box>

      <CardContent>
        <Box sx={{ mt: 6, borderRadius: 1, p: theme.spacing(4, 5) }}>
          <Grid container spacing={6}>
            {data.map((item: DataType, index: number) => (
              <Grid item xs={12} sm={4} key={index} sx={{ mb: 10 }}>
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

export default DriverAnalytics
