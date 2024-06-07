import { Box, Checkbox, IconButton, InputAdornment, Typography, styled, useTheme } from '@mui/material'
import { useState } from 'react'
import MuiFormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel'
import CustomTextField1 from '@components/common/text-field/custom-text-field-1'
import { useFormik } from 'formik'

// import Icon from 'src/@core/components/icon'
import Link from 'next/link'
import Icon from '@components/common/icon/icon'
import { useTranslation } from 'react-i18next'
import registerSchema from './register-form-schema'
import CustomButton from '@components/common/Button/custom-button'
import { useRegisterUserMutation } from '@data/auth/register-user-mutation'
import PhoneNumberField from '@components/common/text-field/phone-number-field'
import Alert from '@mui/material/Alert'

const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: `${theme.palette.secondary.main} !important`
}))

const FormControlLabel = styled(MuiFormControlLabel)<FormControlLabelProps>(({ theme }) => ({
  marginTop: theme.spacing(1.5),
  marginBottom: theme.spacing(1.75),
  '& .MuiFormControlLabel-label': {
    color: theme.palette.text.secondary
  }
}))

type FormValues = {
  name: string
  email: string
  contact: string
  password: string
  confirmPassword: string
}

const initialValues: FormValues = {
  name: '',
  email: '',
  contact: '',
  password: '',
  confirmPassword: ''
}

const RegisterForm = () => {
  // ** States
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [isAgreed, setIsAgreed] = useState<boolean>(true)
  const theme = useTheme()
  const { t } = useTranslation(['form'])
  const { mutate: register, isLoading: registeringUser, isError, error } = useRegisterUserMutation()

  const { handleSubmit, errors, getFieldProps, setFieldValue, values } = useFormik({
    initialValues,
    validationSchema: registerSchema,
    onSubmit: (values, { resetForm }) => handelRegister(values, resetForm)
  })

  const handelRegister = (values: FormValues, resetForm: any) => {
    register(
      { ...values },
      {
        onSuccess: () => {
          resetForm({ values: '' })
        }
      }
    )
  }
  return (
    <form noValidate autoComplete='off' onSubmit={handleSubmit}>
      <CustomTextField1
        errorMsg={t(errors?.name as string)}
        autoFocus
        fullWidth
        sx={{ mb: 4 }}
        label={t(`form:form-register-username-label`)}
        placeholder={t(`form:form-register-username-label`) as string}
        {...getFieldProps('name')}
      />
      <CustomTextField1
        errorMsg={t(errors?.email as string)}
        fullWidth
        sx={{ mb: 4 }}
        label={t(`form:form-register-email-label`)}
        placeholder={t(`form:form-register-email-label`) as string}
        {...getFieldProps('email')}
      />

      <PhoneNumberField
        label={t(`form:form-register-phone-label`)}
        errorMsg={t(errors?.contact as string)}
        value={values?.contact}
        placeholder={t(`form:form-register-phone-label`)}
        onChange={value => setFieldValue('contact', value)}
      />

      <CustomTextField1
        errorMsg={t(errors?.password as string)}
        sx={{ mb: 4 }}
        fullWidth
        label={t(`form:form-register-password-label`)}
        id='auth-login-v2-password'
        type={showPassword ? 'text' : 'password'}
        placeholder='Password'
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
        fullWidth
        label={t(`form:form-register-confirm-password-label`)}
        id='auth-login-v2-password'
        placeholder='Confirm password'
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
      <FormControlLabel
        control={<Checkbox onChange={() => setIsAgreed(prevVal => !prevVal)} />}
        sx={{ mb: 4, mt: 1.5, '& .MuiFormControlLabel-label': { fontSize: theme.typography.body2.fontSize } }}
        label={
          <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Typography sx={{ color: 'text.secondary' }}>I agree to</Typography>
            <a target="_blank" href='https://helpdesk.com'
              style={{
                paddingLeft: "3px",
                textDecoration: "none",
                color: theme.palette.secondary.main
              }}>
              privacy policy & terms and conditions
            </a>
          </Box>
        }
      />

      {isError &&
        <Alert severity="error">
          {error?.response?.data?.message}
        </Alert>
      }

      <CustomButton
        variant='contained'
        sx={{ mb: 4, mt: 4 }}
        disabled={isAgreed || registeringUser}
        loading={registeringUser}
        type='submit'
      >
        {t(`form:form-register-signUp-button-label`)}
      </CustomButton>
      <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Typography sx={{ color: 'text.secondary', mr: 2 }}>Already have an account?</Typography>
        <Typography component={LinkStyled} href='/login'>
          Sign in
        </Typography>
      </Box>
    </form>
  )
}

export default RegisterForm
