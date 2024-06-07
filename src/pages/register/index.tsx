// ** React Imports
import { ReactNode, useEffect } from 'react'

// ** MUI Components
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'
import { styled, useTheme } from '@mui/material/styles'
import { useTranslation } from 'react-i18next'

// ** Layout Import

// ** Hooks

// ** Demo Imports
import FooterIllustrationsV2 from 'src/views/pages/auth/FooterIllustrationsV2'
import RegisterForm from '@components/auth/register-form/register-form'
import { ROUTES } from '@utils/routes'
import { useRouter } from 'next/router'
// import BlankLayout from 'src/@core/layouts/BlankLayout'
import { getLocalForageAuthToken, isAuthenticated } from '@utils/auth-utils'
import BlankLayout from '@layouts/BlankLayout'

// ** Styled Components
const RegisterIllustration = styled('img')(({ theme }) => ({
  zIndex: 2,
  maxHeight: 600,
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

const Register = () => {
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
          <RegisterIllustration
            alt='register-illustration'
            src={``}
          />
          <FooterIllustrationsV2 />
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


            <Box sx={{ my: 0 }}>
              <Typography variant='h4' sx={{ mb: 3, fontWeight: 'bold' }}>
                {t(`form:form-register-title-label`)}
              </Typography>
            </Box>
            <RegisterForm />
          </Box>
        </Box>
      </RightWrapper>
    </Box>
  )
}

Register.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default Register
