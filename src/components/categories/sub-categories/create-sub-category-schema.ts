import * as Yup from 'yup'

const createSubCategorySchema = Yup.object().shape({
    parentId: Yup.object().shape({
        label: Yup.string().required("Parent Id is required"),
        value: Yup.number().required("Parent Id is required")
    }).required("Parent Id is required is required"),

    callTime: Yup.number().typeError('Call Time must be a number').required("Call Time is required"),
    approvalRequired: Yup.boolean().required("Approval Time is required"),
    ratePerHour: Yup.number().typeError('Rate per hour must be a number').required('Rate per hour is required'),
    image: Yup.string().required('Image is required'),
    translations: Yup.object().shape({
        en: Yup.object().shape({
            name: Yup.string().required("Name in English is required"),
        }).required('English translation is required'),
        ar: Yup.object().shape({
            name: Yup.string().matches(/^[؀-ۿـ ]+$/, 'Name must be in Arabic').required("Name in Arabic is required"),
        }).required('Arabic translation is required'),
    }).required("Translations are required"),
});

export default createSubCategorySchema
