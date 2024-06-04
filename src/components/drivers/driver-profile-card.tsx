// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'


// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Types
import { ThemeColor } from 'src/@core/layouts/types'
import { UsersType } from 'src/types/apps/userTypes'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'
import { DriverAnalytics } from '@ts-types/generated'
import { DriverCurrentRequest } from '@utils/constants'
import { formatPrice } from '@utils/products'
import CustomButton from '@components/common/Button/custom-button'
import { useModal } from '@store/apps/modal'

interface ColorsType {
  [key: string]: ThemeColor
}

const data: UsersType = {
  id: 1,
  role: 'admin',
  status: 'active',
  username: 'gslixby0',
  avatarColor: 'primary',
  country: 'El Salvador',
  company: 'Yotz PVT LTD',
  billing: 'Manual - Cash',
  contact: '(479) 232-9151',
  currentPlan: 'enterprise',
  fullName: 'Daisy Patterson',
  email: 'gslixby0@abc.net.au',
  avatar: '/images/avatars/14.png'
}

const roleColors: ColorsType = {
  admin: 'error',
  editor: 'info',
  author: 'warning',
  maintainer: 'success',
  subscriber: 'primary'
}


type PropType = {
  driverDetails: DriverAnalytics,
}

const DriverProfileCard = ({ driverDetails }: PropType) => {
  const { userId, currentRequest } = driverDetails;
  const { openModal } = useModal();

  if (data) {
    return (
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CardContent sx={{ pt: 13.5, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
              {userId?.profileImage ? (
                <CustomAvatar
                  src={userId?.profileImage}
                  variant='rounded'
                  alt={userId?.name ?? "-"}
                  sx={{ width: 100, height: 100, mb: 4 }}
                />
              ) : (
                <CustomAvatar
                  skin='light'
                  variant='rounded'
                  color={data.avatarColor as ThemeColor}
                  sx={{ width: 100, height: 100, mb: 4, fontSize: '3rem' }}
                >
                  {getInitials(userId?.name ?? "D")}
                </CustomAvatar>
              )}
              <Typography variant='h4' sx={{ mb: 3 }}>
                {userId?.name ?? ""}
              </Typography>
              <CustomChip
                rounded
                skin='light'
                size='small'
                label={"Driver"}
                color={roleColors[userId?.role]}
                sx={{ textTransform: 'capitalize' }}
              />
            </CardContent>

            <CardContent sx={{ pt: theme => `${theme.spacing(2)} !important` }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Box sx={{ mr: 8, display: 'flex', alignItems: 'center' }}>
                  <CustomAvatar skin='light' variant='rounded' sx={{ mr: 2.5, width: 38, height: 38 }}>
                    <Icon fontSize='1.75rem' icon='tabler:checkbox' />
                  </CustomAvatar>
                  <div>
                    <Typography sx={{ fontWeight: 500, color: 'text.secondary' }}>Verified</Typography>
                    <Typography variant='body2'>{userId.verified ? "Yes" : "No"}</Typography>
                  </div>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <CustomAvatar skin='light' variant='rounded' sx={{ mr: 2.5, width: 38, height: 38 }}>
                    <Icon fontSize='1.75rem' icon='tabler:briefcase' />
                  </CustomAvatar>
                  <div>
                    <Typography sx={{ fontWeight: 500, color: 'text.secondary' }}>Wallet</Typography>
                    <Typography variant='body2'>{formatPrice(userId.wallet ?? 0)}</Typography>
                  </div>
                </Box>
              </Box>
            </CardContent>

            <Divider sx={{ my: '0 !important', mx: 6 }} />

            {/* Driver DETAILS  */}
            <CardContent sx={{ pb: 4 }}>
              <Typography variant='body2' sx={{ color: 'text.disabled', textTransform: 'uppercase' }}>
                Driver Details
              </Typography>
              <Box sx={{ pt: 4 }}>
                <Box sx={{ display: 'flex', mb: 3 }}>
                  <Typography sx={{ mr: 2, fontWeight: "bold", color: 'text.secondary' }}>Name:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{userId?.name ?? "-"}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 3 }}>
                  <Typography sx={{ mr: 2, fontWeight: "bold", color: 'text.secondary' }}>Email:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{userId?.email ?? "-"}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 3 }}>
                  <Typography sx={{ mr: 2, fontWeight: "bold", color: 'text.secondary' }}>Contact:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{userId?.contact ?? "-"}</Typography>
                </Box>
              </Box>

              <Divider sx={{ my: '20px !important' }} />

              <Typography variant='body2' sx={{ color: 'text.disabled', textTransform: 'uppercase' }}>
                Current Request
              </Typography>
              <Box sx={{ display: 'flex', mb: 3 }}>
                <Typography sx={{ mr: 2, fontWeight: "bold", color: 'text.secondary' }}>Current Accepted Request:</Typography>
                <Typography sx={{ color: 'text.secondary' }}>{currentRequest ?? "-"}</Typography>
              </Box>
              {currentRequest === DriverCurrentRequest.PARCEL &&
                <CustomButton
                  type='button'
                  variant='outlined'
                  onClick={() => openModal({ view: "DRIVER_CURRENT_PARCEL_DETAILS_VIEW", data: { driverId: userId._id } })}
                >
                  View Current Parcel
                </CustomButton>
              }
              {currentRequest === DriverCurrentRequest.ORDER &&
                <CustomButton
                  type='button'
                  variant='outlined'
                  onClick={() => openModal({ view: "DRIVER_CURRENT_ORDER_DETAILS_VIEW", data: { driverId: userId._id } })}
                >
                  View Current Order
                </CustomButton>
              }

            </CardContent>

          </Card>
        </Grid>
      </Grid>
    )
  } else {
    return null
  }
}

export default DriverProfileCard
