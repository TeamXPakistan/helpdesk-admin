import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Icon from 'src/@core/components/icon'
import CustomAvatar from 'src/@core/components/mui/avatar'
import { getInitials } from 'src/@core/utils/get-initials'
import { Helpers } from '@ts-types/generated'
import { fullName } from '@utils/helper-functions'

type PropType = {
  helperDetails: Helpers
}

const HelperProfileCard = ({ helperDetails }: PropType) => {
  //@ts-ignore
  const { profilePic, firstName, lastName, isActive, email, contact, location, genderPreference, username } = helperDetails?.data;

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardContent sx={{ pt: 13.5, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            {profilePic ? (
              <CustomAvatar
                src={profilePic}
                variant='rounded'
                alt={firstName}
                sx={{ width: 100, height: 100, mb: 4 }}
              />
            ) : (
              <CustomAvatar
                skin='light'
                variant='rounded'
                sx={{ width: 100, height: 100, mb: 4, fontSize: '3rem' }}
              >
                {getInitials(firstName ?? "H")}
              </CustomAvatar>
            )}
            <Typography variant='h4' sx={{ mb: 3 }}>
              {fullName(firstName, lastName) ?? ""}
            </Typography>
          </CardContent>

          <CardContent sx={{ pt: theme => `${theme.spacing(2)} !important` }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Box sx={{ mr: 8, display: 'flex', alignItems: 'center' }}>
                <CustomAvatar skin='light' variant='rounded' sx={{ mr: 2.5, width: 38, height: 38 }}>
                  <Icon fontSize='1.75rem' icon='tabler:checkbox' />
                </CustomAvatar>
                <div>
                  <Typography sx={{ fontWeight: 500, color: 'text.secondary' }}>Helper Status</Typography>
                  <Typography variant='body2'>{isActive ? "Active" : "InActive"}</Typography>
                </div>
              </Box>
            </Box>
          </CardContent>

          <Divider sx={{ my: '0 !important', mx: 6 }} />

          {/* USER DETAILS  */}
          <CardContent sx={{ pb: 4 }}>
            <Typography variant='body2' sx={{ color: 'text.disabled', textTransform: 'uppercase' }}>
              Helper Details
            </Typography>
            <Box sx={{ pt: 4 }}>
              <Box sx={{ display: 'flex', mb: 3 }}>
                <Typography sx={{ mr: 2, fontWeight: "bold", color: 'text.secondary' }}>Name:</Typography>
                <Typography sx={{ color: 'text.secondary' }}>{fullName(firstName, lastName) ?? "-"}</Typography>
              </Box>
              <Box sx={{ mb: 3 }}>
                <Typography sx={{ mr: 2, fontWeight: "bold", color: 'text.secondary' }}>User Name:</Typography>
                <Typography sx={{ color: 'text.secondary' }}>{username ?? "-"}</Typography>
              </Box>
              <Box sx={{ display: 'flex', mb: 3 }}>
                <Typography sx={{ mr: 2, fontWeight: "bold", color: 'text.secondary' }}>Email:</Typography>
                <Typography sx={{ color: 'text.secondary' }}>{email ?? "-"}</Typography>
              </Box>
              <Box sx={{ display: 'flex', mb: 3 }}>
                <Typography sx={{ mr: 2, fontWeight: "bold", color: 'text.secondary' }}>Contact:</Typography>
                <Typography sx={{ color: 'text.secondary' }}>{contact ?? "-"}</Typography>
              </Box>
              <Box sx={{ mb: 3 }}>
                <Typography sx={{ mr: 2, fontWeight: "bold", color: 'text.secondary' }}>Address:</Typography>
                <Typography sx={{ color: 'text.secondary' }}>{location ?? "-"}</Typography>
              </Box>
              <Box sx={{ mb: 3 }}>
                <Typography sx={{ mr: 2, fontWeight: "bold", color: 'text.secondary' }}>Gender:</Typography>
                <Typography sx={{ color: 'text.secondary' }}>{genderPreference ?? "-"}</Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default HelperProfileCard
