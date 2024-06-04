import * as Yup from "yup"

export const UpdatePasswordSchema = Yup.object().shape({
    oldPassword: Yup.string().required('Current pasword is required').min(3, 'Name must be at least 3 characters'),
    password: Yup.string().required('New Password is required').min(8, 'Password must be at least 8 characters')
        .max(12, 'Password must be at most 12 characters')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
            'Password must include at least one uppercase letter, one lowercase letter, one number, and one special character'
        ),
    confirmPassword: Yup.string()
        .required('Confirm password is required')
        .oneOf([Yup.ref('password')], 'New password must match')
})