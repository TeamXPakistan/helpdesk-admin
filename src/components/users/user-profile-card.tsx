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
import { User } from '@ts-types/generated'
import { getRoleName } from '@utils/helper-functions'
import { formatPrice } from '@utils/products'

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
  userDetails: User
}

const UserProfileCard = ({ userDetails }: PropType) => {
  //@ts-ignore
  const { profileImage, name, email, contact, wallet, role, verified, location, isDeleted, isGuest } = userDetails;

  if (data) {
    return (
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CardContent sx={{ pt: 13.5, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
              {profileImage ? (
                <CustomAvatar
                  src={profileImage}
                  variant='rounded'
                  alt={name}
                  sx={{ width: 100, height: 100, mb: 4 }}
                />
              ) : (
                <CustomAvatar
                  skin='light'
                  variant='rounded'
                  color={data.avatarColor as ThemeColor}
                  sx={{ width: 100, height: 100, mb: 4, fontSize: '3rem' }}
                >
                  {getInitials(name ?? "U")}
                </CustomAvatar>
              )}
              <Typography variant='h4' sx={{ mb: 3 }}>
                {name ?? ""}
              </Typography>
              <CustomChip
                rounded
                skin='light'
                size='small'
                label={getRoleName(role)}
                color={roleColors[data.role]}
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
                    <Typography variant='body2'>{verified ? "Yes" : "No"}</Typography>
                  </div>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <CustomAvatar skin='light' variant='rounded' sx={{ mr: 2.5, width: 38, height: 38 }}>
                    <Icon fontSize='1.75rem' icon='tabler:briefcase' />
                  </CustomAvatar>
                  <div>
                    <Typography sx={{ fontWeight: 500, color: 'text.secondary' }}>Wallet</Typography>
                    <Typography variant='body2'>{formatPrice(Number(wallet))}</Typography>
                  </div>
                </Box>
              </Box>
            </CardContent>

            <Divider sx={{ my: '0 !important', mx: 6 }} />


            {isDeleted &&
              <CardContent sx={{ pt: theme => `${theme.spacing(2)} !important` }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Box sx={{ mr: 8, display: 'flex', alignItems: 'center' }}>
                    <CustomAvatar skin='light' variant='rounded' sx={{ mr: 2.5, width: 38, height: 38 }}>
                      <Icon fontSize='2.0rem' icon='mdi:delete-circle-outline' color='red' />
                    </CustomAvatar>
                    <div>
                      <Typography sx={{ fontWeight: 500, color: 'text.secondary' }}>User Deleted</Typography>
                    </div>
                  </Box>
                </Box>
              </CardContent>
            }

            {/* USER DETAILS  */}
            <CardContent sx={{ pb: 4 }}>
              <Typography variant='body2' sx={{ color: 'text.disabled', textTransform: 'uppercase' }}>
                User Details
              </Typography>
              <Box sx={{ pt: 4 }}>
                <Box sx={{ display: 'flex', mb: 3 }}>
                  <Typography sx={{ mr: 2, fontWeight: "bold", color: 'text.secondary' }}>Name:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{name ?? "-"}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 3 }}>
                  <Typography sx={{ mr: 2, fontWeight: "bold", color: 'text.secondary' }}>Email:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{email ?? "-"}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 3 }}>
                  <Typography sx={{ mr: 2, fontWeight: "bold", color: 'text.secondary' }}>Contact:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{contact ?? "-"}</Typography>
                </Box>

                <Box sx={{ display: 'flex', mb: 3 }}>
                  <Typography sx={{ mr: 2, fontWeight: "bold", color: 'text.secondary' }}>Role:</Typography>
                  <Typography sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>{getRoleName(role)}</Typography>
                </Box>

                <Box sx={{ display: 'flex', mb: 3 }}>
                  <Typography sx={{ mr: 2, fontWeight: "bold", color: 'text.secondary' }}>Guest user:</Typography>
                  <Typography sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>{isGuest ? "YES" : "NO"}</Typography>
                </Box>

                <Box sx={{ mb: 3 }}>
                  <Typography sx={{ mr: 2, fontWeight: "bold", color: 'text.secondary' }}>Address:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{location?.address ?? "-"}</Typography>
                </Box>
              </Box>
            </CardContent>

            <Divider sx={{ my: '0 !important', mx: 6 }} />

          </Card>
        </Grid>
      </Grid>
    )
  } else {
    return null
  }
}

export default UserProfileCard
