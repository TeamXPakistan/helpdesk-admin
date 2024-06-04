import { ReactNode, useEffect } from 'react'
import { storeOwnerOnly } from '@utils/auth-utils'
import BlankLayoutWithAppBar from '@layouts/blank-layout-with-app-bar'
import Box, { BoxProps } from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'
import { styled, useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'
import CreateShopForm from '@components/shop/create-shop-form'
import { Grid } from '@mui/material'
import { useAuthCredentials } from '@store/apps/auth'
import { useRouter } from 'next/router'
import { ROUTES } from '@utils/routes'


// ** Styled Components
const RegisterIllustration = styled('img')(({ }) => ({
    zIndex: 2,
    width: "45%",
    position: "fixed",
    top: "20vh"
}))

const RightWrapper = styled(Box)<BoxProps>(({ }) => ({
}))

const CreateShopPage = () => {
    const theme = useTheme()
    const hidden = useMediaQuery(theme.breakpoints.down('md'))
    const { t } = useTranslation(['form'])
    const { authValues } = useAuthCredentials()
    const router = useRouter()

    useEffect(() => {
        if (authValues.user?.shop) {
            router.push(ROUTES.DASHBOARD)
        }
    }, [])

    return (
        <Grid container spacing={6} className='match-height' sx={{}}>
            {!hidden ? (
                <Grid xs={6} item
                    sx={{
                        // flex: 1,
                        display: 'flex',
                        position: 'relative',
                        borderRadius: '20px',
                        justifyContent: 'center',
                    }}
                >
                    <RegisterIllustration
                        alt='register-illustration'
                        src={`/images/hatly-images/hatly-store.png`}
                    />
                </Grid>
            ) : null}

            <Grid item xs={12} sm={8} md={6}>
                <RightWrapper  >
                    <Box
                        sx={{
                            p: [6, 12],
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Box sx={{ width: '100%', maxWidth: "100%" }}>
                            <Box sx={{ my: 0 }}>
                                <Typography variant='h4' sx={{ mb: 3, fontWeight: 'bold' }}>
                                    {t(`form:create-shop-title`)}
                                </Typography>
                            </Box>
                            <CreateShopForm />
                        </Box>
                    </Box>
                </RightWrapper >
            </Grid>
        </Grid >
    )
}

CreateShopPage.authProps = {
    allowedRoles: storeOwnerOnly
}
CreateShopPage.getLayout = (page: ReactNode) => <BlankLayoutWithAppBar>{page}</BlankLayoutWithAppBar>

export default CreateShopPage
