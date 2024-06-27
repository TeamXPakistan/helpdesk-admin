import * as Yup from 'yup'

const updateTutorialSchema = Yup.object().shape({
    title: Yup.string()
        .required('Question is required'),
    description: Yup.string()
        .required('Answer is required'),
});

export default updateTutorialSchema
