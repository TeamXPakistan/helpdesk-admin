import * as Yup from 'yup'

const registerSchema = Yup.object().shape({
  name: Yup.string().required('Username is required').min(3, 'Username must be at least 3 characters'),

  email: Yup.string().required('Email is required').email('Invalid email address'),

  contact: Yup.string()
    .required('Phone number is required')
    .min(12, 'Phone number must be at least 12 characters')
    .max(15, 'Phone number can be at most 15 characters')
    .matches(/^\+\d+$/, 'Invalid phone number'),

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

export default registerSchema
