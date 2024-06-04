// ** Next Import
import Link from 'next/link'

// ** MUI Components
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'
import { styled, useTheme } from '@mui/material/styles'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Layout I

// ** Demo Imports
import FooterIllustrationsV2 from 'src/views/pages/auth/FooterIllustrationsV2'
import CustomTextField1 from '@components/common/text-field/custom-text-field-1'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useTranslation } from 'react-i18next'
import { Alert } from '@mui/material'
import CustomButton from '@components/common/Button/custom-button'
import { useForgotPasswordEmailMutation } from '@data/auth/forgot-password-email-mutation'
import { useRouter } from 'next/router'
import { ROUTES } from '@utils/routes'
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

const LinkStyled = styled(Link)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    justifyContent: 'center',
    color: theme.palette.secondary.main,
    fontSize: theme.typography.body1.fontSize
}))

type FormValues = {
    email: string
}

const initialValues: FormValues = {
    email: '',
}

const SendEmail = () => {
    const theme = useTheme()
    const router = useRouter();
    const hidden = useMediaQuery(theme.breakpoints.down('md'))
    const { mutate, error, isLoading: isSendingEmail, isError } = useForgotPasswordEmailMutation()
    const { t } = useTranslation(['form'])

    const { handleSubmit, errors, getFieldProps } = useFormik({
        initialValues,
        validationSchema: Yup.object().shape({
            email: Yup.string().required('Email is required').email('Invalid email address')
        }),
        onSubmit: (values, { resetForm }) => handelSendEmail(values, resetForm)
    })

    const handelSendEmail = (values: FormValues, resetForm: any) => {
        console.log(values)
        mutate({ email: values.email }, {
            onSuccess: () => {
                resetForm({ values: '' })
                router.push(ROUTES.LOGIN)
            }
        })
    }

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
                    {/* <ForgotPasswordIllustration
                        alt='forgot-password-illustration'
                        src={`/images/hatly-images/hatly-store.png`} />
                    <FooterIllustrationsV2 /> */}
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
                            <Typography sx={{ mb: 1.5, fontWeight: 500, fontSize: '1.625rem', lineHeight: 1.385 }}>
                                {t(`form:form-send-email-main-heading-text`)}
                            </Typography>
                            <Typography sx={{ color: 'text.secondary' }}>
                                {t(`form:form-send-email-sub-heading-text`)}
                            </Typography>
                        </Box>
                        <form noValidate autoComplete='off' onSubmit={handleSubmit}>
                            <CustomTextField1
                                errorMsg={t(errors?.email as string)}
                                fullWidth
                                sx={{ mb: 4 }}
                                label={t(`form:form-send-email-email-label`)}
                                placeholder={t(`form:form-send-email-email-label`) as string}
                                {...getFieldProps('email')}
                            />


                            {isError &&
                                <Alert severity="error">
                                    {error?.response?.data?.message}
                                </Alert>
                            }

                            <CustomButton
                                variant='contained'
                                sx={{ mb: 4, mt: 4 }}
                                loading={isSendingEmail}
                                disabled={isSendingEmail}
                                type='submit'
                            >
                                {t(`form:form-send-email-button-text`)}
                            </CustomButton>

                            <Typography sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', '& svg': { mr: 1 } }}>
                                <LinkStyled href='/login'>
                                    <Icon fontSize='1.25rem' icon='tabler:chevron-left' />
                                    <span>Back to login</span>
                                </LinkStyled>
                            </Typography>
                        </form>
                    </Box>
                </Box>
            </RightWrapper>
        </Box>
    </>)
}
export default SendEmail;