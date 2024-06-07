import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'
import { styled, useTheme } from '@mui/material/styles'
import FooterIllustrationsV2 from 'src/views/pages/auth/FooterIllustrationsV2'
import { useTranslation } from 'react-i18next'
import ResetPasswordForm from './reset-password-form'
import Image from 'next/image'


// Styled Components
const ForgotPasswordIllustration = styled('img')(({ theme }) => ({
    zIndex: 2,
    maxHeight: 650,
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


const ResetPassword = () => {
    const theme = useTheme()
    const hidden = useMediaQuery(theme.breakpoints.down('md'))
    const { t } = useTranslation(['common'])

    return (<>
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
                    <ForgotPasswordIllustration
                        alt='forgot-password-illustration'
                        src={`/`} />
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
                        <Image src={'/images/icons/logo.svg'} alt={'Logo'} width={200} height={100} />

                        <Box sx={{ my: 6 }}>
                            <Typography sx={{ fontWeight: 500, fontSize: '1.625rem', lineHeight: 1.385 }}>
                                {t(`common:reset-password-heading`)}
                            </Typography>
                            <Typography sx={{ color: 'text.secondary' }}>
                                {t(`common:reset-password-sub-heading`)}
                            </Typography>
                        </Box>
                        <ResetPasswordForm />
                    </Box>
                </Box>
            </RightWrapper>
        </Box>
    </>)
}
export default ResetPassword;