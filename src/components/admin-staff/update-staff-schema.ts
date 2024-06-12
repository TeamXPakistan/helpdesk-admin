import * as Yup from 'yup'

const updateStaffSchema = Yup.object().shape({
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
    username: Yup.string()
        .required('Username is required'),
    firstName: Yup.string()
        .required('First Name is required'),
    lastName: Yup.string()
        .required('Last Name is required'),
});

export default updateStaffSchema
