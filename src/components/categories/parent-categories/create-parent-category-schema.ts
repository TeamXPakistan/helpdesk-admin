import * as Yup from 'yup'

const createParentCategorySchema = Yup.object().shape({
    // id: Yup.string().required('ID is required'),
    // parentId: Yup.string(),
    callTime: Yup.number().required("Call Time is required"),
    approvalRequired: Yup.boolean().required("approval Required Time is required"),
    ratePerHour: Yup.number().required('Rate per hour is required'),
    image: Yup.string().required('Image is required'),
    translations: Yup.object().shape({
        en: Yup.object().shape({
            name: Yup.string().required("English name is required"),
        }).required('English translation is required'),
        ar: Yup.object().shape({
            name: Yup.string().required("Arabic name is required"),
        }).required('Arabic translation is required'),
    }).required("Translations are required"),
});

export default createParentCategorySchema
