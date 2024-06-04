import * as Yup from 'yup'

const loginSchema = Yup.object().shape({
  email: Yup.string().required('Email is required').email('Invalid email address'),

  password: Yup.string().required('Password is required')
  // .min(8, 'Password must be at least 8 characters')
  // .max(20, 'Password must be at most 20 characters')
  // .matches(
  //   /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
  //   'Password must include at least one uppercase letter, one lowercase letter, one number, and one special character'
  // )
})

export default loginSchema
