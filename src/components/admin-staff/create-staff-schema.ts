import * as Yup from 'yup'

const createStaffSchema = Yup.object().shape({
    name: Yup.string()
        .required('Name is required')
        .min(3, 'Username must be at least 3 characters'),
    email: Yup.string()
        .required('Email is required')
        .email('Invalid email address'),
    contact: Yup.string()
        .required('Phone number is required')
        .min(12, 'Phone number must be at least 12 characters')
        .max(15, 'Phone number can be at most 15 characters')
        .matches(/^\+\d+$/, 'Invalid phone number'),
    dynamicRole: Yup.object().shape({
        label: Yup.string().required("Role is required"),
        value: Yup.string().required("Role is required")
    }).required("Role is required")

});

export default createStaffSchema
