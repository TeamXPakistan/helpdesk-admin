import * as Yup from 'yup'

const createtutorialSchema = Yup.object().shape({
    question: Yup.string()
        .required('Question is required'),
    answer: Yup.string()
        .required('Answer is required'),
   
});

export default createtutorialSchema
