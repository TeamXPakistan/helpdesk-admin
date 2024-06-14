import * as Yup from 'yup'

const createStaffSchema = Yup.object().shape({
    email: Yup.string()
        .required('Email is required')
        .email('Invalid email address'),
    contact: Yup.string()
        .required('Phone number is required')
        .min(12, 'Phone number must be at least 12 characters')
        .max(15, 'Phone number can be at most 15 characters')
        .matches(/^\+\d+$/, 'Invalid phone number'),
    role: Yup.object().shape({
        label: Yup.string().required("Role is required"),
        value: Yup.string().required("Role is required")
    }).required("Role is required"),
    password: Yup.string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters')
        .max(12, 'Password must be at most 12 characters')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
            'Password must include at least one uppercase letter, one lowercase letter, one number, and one special character'
        ),
    username: Yup.string()
        .required('Username is required'),
    firstName: Yup.string()
        .required('First Name is required'),
    lastName: Yup.string()
        .required('Last Name is required'),
});

export default createStaffSchema
