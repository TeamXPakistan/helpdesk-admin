
import { FoodProductTypes } from '@utils/constants';
import * as Yup from 'yup'

const createFoodSchema = Yup.object().shape({
    name: Yup.string().required('Name is required').min(3, 'Name must be at least 3 characters'),

    menuCategory: Yup.object().shape({
        label: Yup.string(),
        value: Yup.string(),
    }).required("Category is required"),
    productType: Yup.object().shape({
        label: Yup.string(),
        value: Yup.string(),
    }).required("Product type is required"),

    price: Yup.object().when("productType", ([productType]) => {
        if (productType?.value === FoodProductTypes.simple) {
            return (
                Yup.number().required('Price is required').positive('Must be a positive number').moreThan(0, 'Must be greater than 0')
            );
        }
        return (
            Yup.number().nullable()
        );
    }),

    salePrice: Yup.object().when("productType", ([productType]) => {
        if (productType?.value === FoodProductTypes.simple) {
            return (
                Yup.number().nullable().required("Sale price is required").positive('Must be a positive number').lessThan(Yup.ref('price'), 'Must be less than price').moreThan(-1, 'Must be less than price or Zero(0)')
            );
        }
        return (
            Yup.number().nullable()
        );
    }),

    requiredFields: Yup.object().when("productType", ([productType]) => {
        if (productType?.value === FoodProductTypes.variation) {
            return (
                Yup.array().min(0, 'Must have at least 1 required field').of(
                    Yup.object().shape({
                        title: Yup.string().required("Title is required."),
                        isRequired: Yup.boolean(),
                        isMultiple: Yup.boolean(),
                        limit: Yup.object().when("isMultiple", ([isMultiple]) => {
                            if (isMultiple === true) {
                                return (
                                    Yup.number().required("Limit is required").positive('Must be a positive number').moreThan(0, 'Must be greater than 0')
                                )
                            }
                            return (
                                Yup.number().nullable()
                            )
                        }),
                        options: Yup.array().min(1, 'Must have at least 1 required field').of(
                            Yup.object().shape({
                                name: Yup.string().required("Name is required"),
                                price: Yup.number().required("Price is required").moreThan(-1, 'Must be greater than -1'),
                                salePrice: Yup.object().when("price", ([price]) => {
                                    if (price === 0) {
                                        return (
                                            Yup.number().required("Sale price is required").moreThan(-1, 'Must be less than price or Zero(0)').lessThan(1, 'Must be less than price or Zero(0)')
                                        )
                                    }
                                    return (
                                        Yup.number().required("Sale price is required").moreThan(-1, 'Must be less than price or Zero(0)').lessThan(Yup.ref('price'), 'Must be less than price')
                                    )
                                }),
                            })
                        )
                    })
                )
            )
        }
        return (
            Yup.array()
        )
    }),

    optionalFields: Yup.object().when("productType", ([productType]) => {
        if (productType?.value === FoodProductTypes.variation) {
            return (
                Yup.array().min(0, 'Must have at least 1 optional field').of(
                    Yup.object().shape({
                        title: Yup.string().required("Title is required."),
                        isRequired: Yup.boolean(),
                        isMultiple: Yup.boolean(),
                        limit: Yup.object().when("isMultiple", ([isMultiple]) => {
                            if (isMultiple === true) {
                                return (
                                    Yup.number().required("Limit is required").positive('Must be a positive number').moreThan(0, 'Must be greater than 0')
                                )
                            }
                            return (
                                Yup.number().nullable()
                            )
                        }),
                        options: Yup.array().min(1, 'Must have at least 1 required field').of(
                            Yup.object().shape({
                                name: Yup.string().required("Name is required"),
                                price: Yup.number().required("Price is required").moreThan(-1, 'Must be greater than -1'),
                                salePrice: Yup.object().when("price", ([price]) => {
                                    if (price === 0) {
                                        return (
                                            Yup.number().required("Price is required").moreThan(-1, 'Must be less than price or Zero(0)').lessThan(1, 'Must be less than price or Zero(0)')
                                        )
                                    }
                                    return (
                                        Yup.number().required("Price is required").moreThan(-1, 'Must be less than price or Zero(0)').lessThan(Yup.ref('price'), 'Must be less than price')
                                    )
                                }),
                            })
                        )
                    })
                )
            )
        }
        return (
            Yup.array()
        )
    }),

    minPrice: Yup.object().when(["productType"], ([productType]) => {

        if (productType?.value === FoodProductTypes.variation) {
            return (
                Yup.number().required("Price is required").moreThan(-1, 'Must be greater than -1')
            )
        }

        return (
            Yup.number().nullable()
        );
    }),

    maxPrice: Yup.object().when(["productType", "minPrice"], ([productType, minPrice]) => {

        if (productType?.value === FoodProductTypes.variation) {

            if (minPrice === 0) {
                return (
                    Yup.number().required("Sale price is required").moreThan(-1, 'Must be less than price or Zero(0)').lessThan(1, 'Must be less than price or Zero(0)')
                )
            }
            return (
                Yup.number().required("Sale price is required").moreThan(-1, 'Must be less than price or Zero(0)').lessThan(Yup.ref('minPrice'), 'Must be less than price')
            )
        }

        return (
            Yup.number().nullable()
        )

    }),


    // ORIGINAL MIN/MAX PRICE LOGIC >>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    // ORIGINAL MIN/MAX PRICE LOGIC >>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    // ORIGINAL MIN/MAX PRICE LOGIC >>>>>>>>>>>>>>>>>>>>>>>>>>>>> 

    // minPrice: Yup.object().when(["productType", "maxPrice"], ([productType, maxPrice]) => {

    //     if (productType?.value === FoodProductTypes.variation && maxPrice !== undefined && maxPrice != null) {
    //         return (
    //             Yup.number().required('Minimum price is required').positive('Must be a positive number').moreThan(0, 'Must be greater than 0').lessThan(Yup.ref('maxPrice'), 'Must be less than maximum price')
    //         )
    //     }

    //     if (productType?.value === FoodProductTypes.variation) {
    //         return (
    //             Yup.number().required('Minimum price is required').positive('Must be a positive number').moreThan(0, 'Must be greater than 0')
    //         )
    //     }

    //     return (
    //         Yup.number().nullable()
    //     );
    // }),

    // maxPrice: Yup.object().when("productType", ([productType]) => {
    //     if (productType?.value === FoodProductTypes.variation) {
    //         return (
    //             Yup.number().nullable().positive('Must be a positive number').moreThan(0, 'Must be greater than 0')
    //         )
    //     }
    //     return (
    //         Yup.number().nullable()
    //     )
    // }),

    quantity: Yup.number().required("Quantity is required").positive("Must be a positive number"),
    description: Yup.string().required('Description is required').min(15, 'Description must be at least 15 characters'),
    images: Yup.array().min(1, ' Must have at least 1 image').of(Yup.string()),
})

export default createFoodSchema;
