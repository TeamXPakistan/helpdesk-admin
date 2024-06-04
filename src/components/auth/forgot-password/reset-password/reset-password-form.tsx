import CustomTextField1 from '@components/common/text-field/custom-text-field-1'
import { Alert } from '@mui/material'
import CustomButton from '@components/common/Button/custom-button'
import { useFormik } from 'formik'
import Link from 'next/link'
import Icon from 'src/@core/components/icon'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { IconButton, InputAdornment, Typography, styled } from '@mui/material'
import resetPasswordFormSchema from './reset-password-form-schema'
import { useResetPasswordMutation } from '@data/auth/reset-password-mutation'
import { useRouter } from 'next/router'
import { ROUTES } from '@utils/routes'
import toast from 'react-hot-toast'



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
    password: string
    confirmPassword: string
}

const initialValues: FormValues = {
    email: "",
    password: '',
    confirmPassword: ''
}


const ResetPasswordForm = () => {
    const { t } = useTranslation(['form'])
    const router = useRouter()
    const { token } = router.query;
    const { mutate, error, isLoading: isResettingPassword, isError } = useResetPasswordMutation()
    const [showPassword, setShowPassword] = useState<boolean>(false)

    const { handleSubmit, errors, getFieldProps } = useFormik({
        initialValues,
        validationSchema: resetPasswordFormSchema,
        onSubmit: (values, { resetForm }) => handelResetPassword(values, resetForm)
    })
    const handelResetPassword = (values: FormValues, resetForm: any) => {
        mutate({
            email: values.email,
            newPassword: values.password,
            token: token as string
        }, {
            onSuccess: () => {
                toast.success("Password reset successfully kindly login to continue", { duration: 6000 })
                resetForm({ values: '' })
                router.push(ROUTES.LOGIN)
            }
        })
    }

    return (<>
        <form noValidate autoComplete='off' onSubmit={handleSubmit}>

            <CustomTextField1
                errorMsg={t(errors?.email as string)}
                fullWidth
                sx={{ mb: 4 }}
                label={t(`form:form-register-email-label`)}
                placeholder={t(`form:form-register-email-label`) as string}
                {...getFieldProps('email')}
            />

            <CustomTextField1
                errorMsg={t(errors?.password as string)}
                sx={{ mb: 4 }}
                fullWidth
                label={t(`form:reset-password-new-password-label`)}
                id='auth-login-v2-password'
                type={showPassword ? 'text' : 'password'}
                placeholder={t(`form:reset-password-new-password-label`) as string}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position='end'>
                            <IconButton
                                edge='end'
                                onMouseDown={e => e.preventDefault()}
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                <Icon fontSize='1.25rem' icon={showPassword ? 'tabler:eye' : 'tabler:eye-off'} />
                            </IconButton>
                        </InputAdornment>
                    )
                }}
                {...getFieldProps('password')}
            />

            <CustomTextField1
                errorMsg={t(errors?.confirmPassword as string)}
                sx={{ mb: 4 }}
                fullWidth
                label={t(`form:reset-password-confirm-password-label`)}
                id='auth-login-v2-password'
                placeholder={t(`form:reset-password-confirm-password-label`) as string}
                type={showPassword ? 'text' : 'password'}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position='end'>
                            <IconButton
                                edge='end'
                                onMouseDown={e => e.preventDefault()}
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                <Icon fontSize='1.25rem' icon={showPassword ? 'tabler:eye' : 'tabler:eye-off'} />
                            </IconButton>
                        </InputAdornment>
                    )
                }}
                {...getFieldProps('confirmPassword')}
            />


            {isError &&
                <Alert severity="error">
                    {error?.response?.data?.message}
                </Alert>
            }

            <CustomButton
                variant='contained'
                sx={{ mb: 4, mt: 4 }}
                loading={isResettingPassword}
                disabled={isResettingPassword}
                type='submit'
            >
                {t(`form:reset-password-button-text`)}
            </CustomButton>

            <Typography sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', '& svg': { mr: 1 } }}>
                <LinkStyled href='/login'>
                    <Icon fontSize='1.25rem' icon='tabler:chevron-left' />
                    <span>Back to login</span>
                </LinkStyled>
            </Typography>
        </form>
    </>)
}
export default ResetPasswordForm