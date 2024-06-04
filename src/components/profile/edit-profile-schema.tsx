import * as Yup from "yup"

export const UpdateProifileSchema = Yup.object().shape({
    name: Yup.string().required('Name is required').min(3, 'Name must be at least 3 characters'),
    profileImage: Yup.string(),
})