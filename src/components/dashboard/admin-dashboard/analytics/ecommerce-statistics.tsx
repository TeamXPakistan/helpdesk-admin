// ** MUI Imports
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Icon from 'src/@core/components/icon'
import CustomAvatar from 'src/@core/components/mui/avatar'
import { Box } from '@mui/system'
import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'
import Image from 'next/image'

type DataType = {
  value: string
  subtitle: string
  avatarColor: "error" | "primary" | "secondary" | "warning" | "info" | "success" | undefined
  avatarIcon: string
}

const analyticsArray = (analytics: any): DataType[] => {
  return [
    {
      value: "343435 AED",
      subtitle: "Total Revenue",
      avatarColor: "error",
      avatarIcon: "/images/icons/admin-dashboard-icons/revenue-icon.svg"
    },
    {
      value: '22333',
      subtitle: "Total Users",
      avatarColor: "error",
      avatarIcon: "/images/icons/admin-dashboard-icons/users-icon.svg"
    },
    {
      value: "55",
      subtitle: "Total Helpers",
      avatarColor: "error",
      avatarIcon: "/images/icons/admin-dashboard-icons/helper-icon.svg"
    },
    {
      value: "86",
      subtitle: "Number of Calls",
      avatarColor: "error",
      avatarIcon: '/images/icons/admin-dashboard-icons/call-icon.svg'
    }
  ]
}

const EcommerceStatistics = ({ analytics }: any) => {

  const { t } = useTranslation(["common"]);

  return (
    <Box
      sx={{
        display: 'flex', flexDirection: 'row',
        justifyContent: "start", gap: 4
      }}
    >
      <Grid container spacing={6}>
        {analyticsArray(analytics).map((item, index) => (
          <>
            <Grid item xs={12} sm={6} md={3}
              className="dashboard-overview-card">
              <Card>
                <CardContent sx={{
                  display: 'flex', flexDirection: 'row',
                  alignItems: 'flex-start',
                  flexWrap: "nowrap", gap: 4
                }}>
                  <CustomAvatar
                    skin='light'
                    variant='rounded'
                    sx={{ mb: 3.5, width: 50, height: 50 }}
                    className='overview-logos-hd'
                  >
                    <Image src={item?.avatarIcon} alt={'Logo'} width={30} height={30} />
                  </CustomAvatar>
                  <Box>
                    <Typography variant='h5' sx={{ mt: 0 }}>
                      {item?.value}
                    </Typography>
                    <Typography variant='body1' sx={{ mt: 1, color: 'text.disabled' }}>
                      {t(item?.subtitle)}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
              {index !== analytics.length + 1 && <hr className='vertical-line' />}
            </Grid>
          </>
        ))}
      </Grid>
    </Box>
  )
}

export default EcommerceStatistics;
