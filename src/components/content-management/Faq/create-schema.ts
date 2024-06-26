import * as Yup from 'yup'

const createFaqSchema = Yup.object().shape({
    title: Yup.string()
        .required('Question is required'),
    description: Yup.string()
        .required('Answer is required'),
   
});

export default createFaqSchema
