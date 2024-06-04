// ** MUI Imports
import Box, { BoxProps } from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'


const VerifyingEmailSpinner = ({ sx }: { sx?: BoxProps['sx'] }) => {
  const { t } = useTranslation(['common'])

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        ...sx
      }}
    >
      <Typography variant='h5' sx={{ mb: 1.5 }}>
        {t(`common:verify-email-page-heading`)}
      </Typography>
      <CircularProgress disableShrink sx={{ mt: 6 }} />
    </Box>
  )
}

export default VerifyingEmailSpinner
