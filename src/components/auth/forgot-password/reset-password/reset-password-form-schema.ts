import * as Yup from 'yup'

const resetPasswordFormSchema = Yup.object().shape({

  email: Yup.string().required('Email is required').email('Invalid email address'),

  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .max(12, 'Password must be at most 12 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
      'Password must include at least one uppercase letter, one lowercase letter, one number, and one special character'
    ),

  confirmPassword: Yup.string()
    .required('Confirm password is required')
    .oneOf([Yup.ref('password')], 'Passwords must match')
})

export default resetPasswordFormSchema
