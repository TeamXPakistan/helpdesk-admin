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

// ** Util Import

interface DataType {
  stats: string
  title: string
  progress: number
  avatarIcon: string
  avatarColor?: ThemeColor
  progressColor?: ThemeColor
}

const data: DataType[] = [
  {
    progress: 0,
    stats: '545',
    title: 'Total Orders',
    avatarIcon: 'tabler:box'
  },
  {
    progress: 0,
    title: 'Total Products',
    stats: '256',
    avatarColor: 'info',
    progressColor: 'info',
    avatarIcon: 'tabler:chart-pie-2'
  },
  {
    progress: 0,
    stats: formatPrice(0),
    title: 'Total Sales',
    avatarColor: 'error',
    progressColor: 'error',
    avatarIcon: 'tabler:currency-dollar'
  }
]


const ShopAnalyticsEarningReports = () => {
  // ** Hook
  const theme = useTheme()

  return (
    <Card>
      <CardHeader
        sx={{ pb: 0 }}
        title='Shop Details'
        subheader='Overview'
      />
      <CardContent>
        <Box sx={{ mt: 6, borderRadius: 1, p: theme.spacing(4, 5) }}>
          <Grid container spacing={6}>
            {data.map((item: DataType, index: number) => (
              <Grid item xs={12} sm={4} key={index}>
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

export default ShopAnalyticsEarningReports
