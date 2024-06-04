// ** MUI Imports
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Custom Component Import
import Icon from 'src/@core/components/icon'
import CustomAvatar from 'src/@core/components/mui/avatar'
import { Box } from '@mui/system'
import { Grid } from '@mui/material'
import { formatPrice } from '@utils/products'
import { useAuthCredentials } from '@store/apps/auth'
import { useTranslation } from 'react-i18next'


type PropTypes = {
}

const WithdrawsCards = ({ }: PropTypes) => {
  const { authValues } = useAuthCredentials();
  const { t } = useTranslation(["common"]);
  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: "start", gap: 4 }}>
      <Grid container spacing={6}>
        <>
          <Grid item xs={12} sm={6} md={4}>
            <Card >
              <CardContent sx={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', flexWrap: "nowrap", gap: 4 }}>
                <CustomAvatar
                  skin='light'
                  variant='rounded'
                  color={"success"}
                  sx={{ mb: 3.5, width: 44, height: 44 }}
                >
                  <Icon icon={'icon-park-twotone:mall-bag'} fontSize={'1.75rem'} />
                </CustomAvatar>
                <Box>
                  <Typography variant='h4'>
                    {formatPrice(authValues?.user?.wallet)}
                  </Typography>
                  <Typography variant='h6' sx={{ mb: 1, color: 'text.disabled' }}>
                    {t("common:wallet-amount")}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card >
              <CardContent sx={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', flexWrap: "nowrap", gap: 4 }}>
                <CustomAvatar
                  skin='light'
                  variant='rounded'
                  color={"info"}
                  sx={{ mb: 3.5, width: 44, height: 44 }}
                >
                  <Icon icon={'icon-park-twotone:mall-bag'} fontSize={'1.75rem'} />
                </CustomAvatar>
                <Box>
                  <Typography variant='h4'>
                    {formatPrice(authValues?.user?.totalWalletWithdrawal)}
                  </Typography>
                  <Typography variant='h6' sx={{ mb: 1, color: 'text.disabled' }}>
                    {t("common:total-withdraw-amount")}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </>
      </Grid>
    </Box>
  )
}

export default WithdrawsCards;
