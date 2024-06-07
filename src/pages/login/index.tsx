// ** React Imports
import { ReactNode, useEffect } from 'react'

// ** MUI Components
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'
import { styled, useTheme } from '@mui/material/styles'

// ** Layout Import

// ** Demo Imports
import LoginForm from '@components/auth/login-form/login-form'
import { useTranslation } from 'react-i18next'
import { getLocalForageAuthToken, isAuthenticated } from '@utils/auth-utils'
import { useRouter } from 'next/router'
import { ROUTES } from '@utils/routes'
import BlankLayout from '@layouts/BlankLayout'
import Image from 'next/image'

// ** Styled Components
const LoginIllustration = styled('img')(({ theme }) => ({
  zIndex: 2,
  maxHeight: 680,
  marginTop: theme.spacing(12),
  marginBottom: theme.spacing(12),
  [theme.breakpoints.down(1540)]: {
    maxHeight: 550,
    maxWidth: 750
  },
  [theme.breakpoints.down(1180)]: {
    maxWidth: 650
  },
  [theme.breakpoints.down(1050)]: {
    maxWidth: 600
  },
  [theme.breakpoints.down('lg')]: {
    maxHeight: 500
  }
}))

const RightWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.up('md')]: {
    maxWidth: 450
  },
  [theme.breakpoints.up('lg')]: {
    maxWidth: 600
  },
  [theme.breakpoints.up('xl')]: {
    maxWidth: 750
  }
}))

const LoginPage = () => {
  // ** Hooks
  const theme = useTheme()
  const hidden = useMediaQuery(theme.breakpoints.down('md'))
  const { t } = useTranslation(['form'])
  const router = useRouter()


  useEffect(() => {
    getLocalForageAuthToken().then(token => {
      if (isAuthenticated(token)) {
        router.push(ROUTES.DASHBOARD)
      }
    })
  }, [])

  return (
    <Box className='content-right' sx={{ backgroundColor: 'background.paper' }}>
      {!hidden ? (
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            position: 'relative',
            alignItems: 'center',
            borderRadius: '20px',
            justifyContent: 'center',
            // backgroundColor: 'customColors.bodyBg',
            margin: theme => theme.spacing(8, 0, 8, 8)
          }}
        >
        </Box>
      ) : null}
      <RightWrapper>
        <Box
          sx={{
            p: [6, 12],
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Box sx={{ width: '100%', maxWidth: 400 }}>
            <Image src={'/images/icons/logo.svg'} alt={'Logo'} width={200} height={100} />
            <Box sx={{ my: 6 }}>
              <Typography variant='h4' sx={{ mb: 1.5, fontWeight: 'bold' }}>
                {t(`form:form-login-title-label`)}
              </Typography>
            </Box>
            <LoginForm />
          </Box>
        </Box>
      </RightWrapper>
    </Box>
  )
}

LoginPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default LoginPage
