import * as Yup from 'yup'

const createParentCategorySchema = Yup.object().shape({
    id: Yup.string()
        .required('ID is required'),

    parentId: Yup.string(),

    callTime: Yup.string().required("Call Time is required"),
    approvalRequired: Yup.string().required("approval Required Time is required"),

    ratePerHour: Yup.string().required('Rate per hour is required'),
    image: Yup.string().required('Image is required'),
    Translations: Yup.object().shape({
        en: Yup.object().shape({
            id: Yup.number().required("ID is required"),
            name: Yup.string().required("English name is required"),
            language: Yup.string().oneOf(["en"]).required("Language is required"),
        }).required('English translation is required'),
        ar: Yup.object().shape({
            id: Yup.number().required("ID is required"),
            name: Yup.string().required("Arabic name is required"),
            language: Yup.string().oneOf(["ar"]).required("Language is required"),
        }).required('Arabic translation is required'),
    }).required("Translations are required"),
});

export default createParentCategorySchema
