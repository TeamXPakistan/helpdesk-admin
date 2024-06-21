import * as Yup from 'yup'

const createFaqSchema = Yup.object().shape({
    question: Yup.string()
        .required('Question is required'),
    answer: Yup.string()
        .required('Answer is required'),
   
});

export default createFaqSchema
