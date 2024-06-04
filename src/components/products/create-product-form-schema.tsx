
import * as Yup from 'yup'

const simpleProductSchema = Yup.object().shape({
    name: Yup.string().required('Name is required').min(3, 'Name must be at least 3 characters'),
    category: Yup.object().shape({
        label: Yup.string(),
        value: Yup.string(),
    }).required("Category is required"),
    subCategory: Yup.object().shape({
        label: Yup.string(),
        value: Yup.string(),
    }).required("Sub category is required"),
    price: Yup.number().required('Price is required').positive('Must be a positive number').moreThan(0, 'Must be greater than 0'),
    salePrice: Yup.number().required("Sale price is required").positive('Must be a positive number').lessThan(Yup.ref('price'), 'Must be less than price').moreThan(-1, 'Must be less than price or Zero(0)'),
    quantity: Yup.number().required("Quantity is required").positive("Must be a positive number"),
    description: Yup.string().required('Description is required').min(15, 'Description must be at least 15 characters'),
    images: Yup.array().min(1, ' Must have at least 1 image').of(Yup.string()),
})

const simpleProductEditSchema = Yup.object().shape({
    name: Yup.string().required('Name is required').min(3, 'Name must be at least 3 characters'),
    category: Yup.object().shape({
        label: Yup.string(),
        value: Yup.string(),
    }).required("Category is required"),
    subCategory: Yup.object().shape({
        label: Yup.string(),
        value: Yup.string(),
    }).required("Sub category is required"),
    price: Yup.number().required('Price is required').positive('Must be a positive number').moreThan(0, 'Must be greater than 0'),
    salePrice: Yup.number().required("Sale price is required").positive('Must be a positive number').lessThan(Yup.ref('price'), 'Must be less than price').moreThan(-1, 'Must be less than price or Zero(0)'),
    quantity: Yup.number().required("Quantity is required").positive("Must be a positive number"),
    description: Yup.string().required('Description is required').min(15, 'Description must be at least 15 characters'),
    images: Yup.array().min(1, ' Must have at least 1 image').of(Yup.string()),
    isEnabled: Yup.boolean()
})

export { simpleProductEditSchema }
export default simpleProductSchema;

