import CustomTextField1 from '@components/common/text-field/custom-text-field-1'
import { useState } from 'react'
import loginSchema from './login-form-schema'
import { useFormik } from 'formik'
import Icon from '@components/common/icon/icon'
import { IconButton, InputAdornment } from '@mui/material'
import { useTranslation } from 'react-i18next'
import CustomButton from '@components/common/Button/custom-button'
import { useLoginUserMutation } from '@data/auth/login-user-mutation'
import { setLocalForageToken } from '@utils/auth-utils'
import { ROUTES } from '@utils/routes'
import { useRouter } from 'next/router'
import { useAuthCredentials } from '@store/apps/auth'
import { Box } from '@mui/material'
import { Typography, styled } from '@mui/material'
import Link from 'next/link'
import Alert from '@mui/material/Alert'
import { requestForToken } from '@utils/firebase/firebase'
import toast from 'react-hot-toast'

type FormValues = {
  email: string
  password: string
}

const initialValues: FormValues = {
  email: '',
  password: ''
}

const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: `${theme.palette.secondary.main} !important`,
  fontWeight: 'bolder'
}))
const LoginForm = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const { setCredentials } = useAuthCredentials()
  const { t } = useTranslation(['form'])
  const router = useRouter()

  const { mutate: login, isLoading: loggingUser, error, isError } = useLoginUserMutation()
  const { handleSubmit, errors, getFieldProps } = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: (values, { resetForm }) => handelLogin(values, resetForm)
  })

  const handelLogin = async (values: FormValues, resetForm: any) => {

    login(
      {
        ...values,
        fcmToken: await requestForToken()
      },
      {
        onSuccess: ({ data }) => {

          if (data?.isDeleted) {
            toast.error("User Deleted");
            return;
          }

          setLocalForageToken(data.data.token)
          setCredentials({ role: data.data.roles, token: data.data.token, user: data })
          resetForm({ values: '' })
          router.push(ROUTES.DASHBOARD)
        }
      }
    )
  }

  return (
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
        sx={{ mb: 1 }}
        fullWidth
        label={t(`form:form-register-password-label`)}
        placeholder='Password'
        id='auth-login-v2-password'
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
        {...getFieldProps('password')}
      />
      <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'right' }}>
        <Typography component={LinkStyled} href={ROUTES.FORGOT_PASSWORD}>
          {t(`form:form-login-forget-password-text`)}
        </Typography>
      </Box>

      {isError &&
        <Alert severity="error">
          {/* @ts-ignore */}
          {error?.response?.data?.message}
        </Alert>
      }

      <CustomButton
        variant='contained'
        sx={{ mb: 4, mt: 4 }}
        loading={loggingUser}
        disabled={loggingUser}
        type='submit'
      >
        {t(`form:form-register-login-button-label`)}
      </CustomButton>

      {/* <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Typography sx={{ color: 'text.secondary', mr: 2 }}>Dont have an account?</Typography>
        <Typography component={LinkStyled} href={ROUTES.REGISTER}>
          Sign up
        </Typography>
      </Box> */}
    </form>
  )
}
export default LoginForm
