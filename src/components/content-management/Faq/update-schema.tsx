import * as Yup from 'yup'

const updatefaqSchema = Yup.object().shape({
    title: Yup.string()
        .required('Question is required'),
    description: Yup.string()
        .required('Answer is required'),
});

export default updatefaqSchema
