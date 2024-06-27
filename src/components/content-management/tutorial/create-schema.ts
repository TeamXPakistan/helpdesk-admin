import * as Yup from 'yup'

const createtutorialSchema = Yup.object().shape({
    title: Yup.string()
        .required('Question is required'),
    description: Yup.string()
        .required('Answer is required'),

});

export default createtutorialSchema
