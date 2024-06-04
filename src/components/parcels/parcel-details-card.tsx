// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'

// ** Types
import { UsersType } from 'src/types/apps/userTypes'

// ** Utils Import
import { Parcel } from '@ts-types/generated'
import { formatPrice } from '@utils/products'

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

type PropType = {
  parcel: Parcel
}

const ParcelDetailsCard = ({ parcel }: PropType) => {
  const { driver, trackingNumber, fare, status, receiverLocation, senderLocation } = parcel;

  if (data) {
    return (
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>

            {/* PARCEL DETAILS  */}
            <CardContent sx={{ pb: 4 }}>

              <Box sx={{ pt: 4 }}>
                <Box sx={{ display: 'flex', mb: 3 }}>
                  <Typography sx={{ mr: 2, fontWeight: "bold", color: 'text.secondary' }}>Tracking Number:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{trackingNumber ?? "-"}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 3 }}>
                  <Typography sx={{ mr: 2, fontWeight: "bold", color: 'text.secondary' }}>Status:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{status ?? "-"}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 3, alignItems: 'center' }}>
                  <Typography sx={{ mr: 2, fontWeight: "bold", color: 'text.secondary' }}>Status:</Typography>
                  <CustomChip
                    rounded
                    skin='light'
                    size='small'
                    label={status}
                    color={'success'}
                    sx={{
                      textTransform: 'capitalize'
                    }}
                  />
                </Box>
                <Box sx={{ display: 'flex', mb: 3 }}>
                  <Typography sx={{ mr: 2, fontWeight: "bold", color: 'text.secondary' }}>Fare:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{formatPrice(Number(fare) ?? 0)}</Typography>
                </Box>
              </Box>
            </CardContent>

            <Divider sx={{ my: '0 !important', mx: 6 }} />

            {/* ITEM DETAILS  */}
            <CardContent sx={{ pb: 4 }}>
              <Typography variant='body2' sx={{ color: 'text.disabled', textTransform: 'uppercase' }}>
                Item Details
              </Typography>
              <Box sx={{ pt: 4 }}>
                <Box sx={{ display: 'flex', mb: 3 }}>
                  <Typography sx={{ mr: 2, fontWeight: "bold", color: 'text.secondary' }}>Item:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{parcel?.details?.item ?? "-"}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 3 }}>
                  <Typography sx={{ mr: 2, fontWeight: "bold", color: 'text.secondary' }}>Qty:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{parcel?.details?.qty ?? "-"}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 3 }}>
                  <Typography sx={{ mr: 2, fontWeight: "bold", color: 'text.secondary' }}>Weight:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{`${parcel?.details?.weight ?? 0}/${parcel?.details?.weightUnit}`}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 3 }}>
                  <Typography sx={{ mr: 2, fontWeight: "bold", color: 'text.secondary' }}>Height:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{`${parcel?.details?.height ?? 0}/${parcel?.details?.heightUnit}`}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 3 }}>
                  <Typography sx={{ mr: 2, fontWeight: "bold", color: 'text.secondary' }}>Width:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{`${parcel?.details?.width ?? 0}/${parcel?.details?.widthUnit}`}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 3 }}>
                  <Typography sx={{ mr: 2, fontWeight: "bold", color: 'text.secondary' }}>Length:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{`${parcel?.details?.length ?? 0}/${parcel?.details?.lengthUnit}`}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 3 }}>
                  <Typography sx={{ mr: 2, fontWeight: "bold", color: 'text.secondary' }}>Description:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{parcel?.details?.description}</Typography>
                </Box>
              </Box>

              <Divider sx={{ my: '20px !important' }} />


              <Typography variant='body2' sx={{ color: 'text.disabled', textTransform: 'uppercase' }}>
                SENDER LOCATION
              </Typography>
              <Box sx={{ pt: 4 }}>

                <Box sx={{ mb: 3 }}>
                  <Typography sx={{ mr: 2, fontWeight: "bold", color: 'text.secondary' }}>location:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{senderLocation?.location?.address ?? "-"}</Typography>
                </Box>
                <Box sx={{ mb: 3 }}>
                  <Typography sx={{ mr: 2, fontWeight: "bold", color: 'text.secondary' }}>Additional Direction:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{senderLocation?.location?.additionalDirection ?? "-"}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 3 }}>
                  <Typography sx={{ mr: 2, fontWeight: "bold", color: 'text.secondary' }}>Building:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{senderLocation?.location?.building ?? "-"}</Typography>
                </Box>
              </Box>

              <Divider sx={{ my: '20px !important' }} />


              <Typography variant='body2' sx={{ color: 'text.disabled', textTransform: 'uppercase' }}>
                RECEIVER LOCATION
              </Typography>
              <Box sx={{ pt: 4 }}>
                <Box sx={{ mb: 3 }}>
                  <Typography sx={{ mr: 2, fontWeight: "bold", color: 'text.secondary' }}>location:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{receiverLocation?.location?.address ?? "-"}</Typography>
                </Box>
                <Box sx={{ mb: 3 }}>
                  <Typography sx={{ mr: 2, fontWeight: "bold", color: 'text.secondary' }}>Additional Direction:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{receiverLocation?.location?.additionalDirection ?? "-"}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 3 }}>
                  <Typography sx={{ mr: 2, fontWeight: "bold", color: 'text.secondary' }}>Building:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{receiverLocation?.location?.building ?? "-"}</Typography>
                </Box>
              </Box>


              <Divider sx={{ my: '20px !important' }} />


              <Typography variant='body2' sx={{ color: 'text.disabled', textTransform: 'uppercase' }}>
                RIDER INFORMATIOn
              </Typography>
              <Box sx={{ pt: 4 }}>
                <Box sx={{ display: 'flex', mb: 3 }}>
                  <Typography sx={{ mr: 2, fontWeight: "bold", color: 'text.secondary' }}>Name:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{driver?.name ?? "-"}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 3 }}>
                  <Typography sx={{ mr: 2, fontWeight: "bold", color: 'text.secondary' }}>Contact:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{driver?.contact ?? "-"}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 3 }}>
                  <Typography sx={{ mr: 2, fontWeight: "bold", color: 'text.secondary' }}>Email:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{driver?.email ?? "-"}</Typography>
                </Box>
              </Box>

            </CardContent>

          </Card>
        </Grid>
      </Grid>
    )
  } else {
    return null
  }
}

export default ParcelDetailsCard
