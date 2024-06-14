// ** MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
// ** Icon Imports
import Icon from 'src/@core/components/icon'
// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'
import { Box } from '@mui/system'
import { useModal } from '@store/apps/modal'
import CustomButton from '@components/common/Button/custom-button'

const Subscriptions = (data: any) => {
  const { openModal } = useModal();
  return (
    <Box
      sx={{ gap: 4, flexWrap: 'wrap', alignItems: 'center', mb: 8 }}
    >
      <Typography variant='h4' sx={{ color: "text.primary", mt:2 }}>Subscriptions</Typography>
      <Card
        sx={{ width: 300, height: 400, mt:8 }}
      >
        <CardContent
          sx={{
            display: 'flex',
            textAlign: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            p: theme => `${theme.spacing(9.75, 5, 9.25)} !important`
          }}
        >

          <CustomAvatar skin='light' sx={{ width: 50, height: 50, mb: 2.25 }}>
            <Icon icon='tabler:help' fontSize='2rem' />
          </CustomAvatar>
          <Typography variant='h4' sx={{ mb: 2.75 }}>
            Support
          </Typography>
          <Typography sx={{ mb: 6, color: 'text.secondary' }}>
            According to us blisters are a very common thing and we come across them very often in our daily lives. It is
            a very common occurrence like cold or fever depending upon your lifestyle.
          </Typography>
          <Box>
            <CustomButton type='button' sx={{ mr: 6, mt: 6, width: 100 }} variant="contained" onClick={() => openModal({ view: "SUBSCRIPTIONS_STATUS_MODAL", data })}>Edit</CustomButton>

            <CustomButton type='button' sx={{ mt: 6, width: 100 }} variant="contained" onClick={() => openModal({ view: "SUBSCRIPTIONS_DELETE_MODAL", data })} >Delete</CustomButton>
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}

export default Subscriptions
