import { ShopTypes } from '@utils/constants';
import * as Yup from 'yup'

const editShopSchema = Yup.object().shape({
    name: Yup.string().required('Name is required').min(3, 'Username must be at least 3 characters'),
    image: Yup.string().required('Image is required').min(3, 'Image must be at least 3 characters'),
    description: Yup.string().required('Description is required').min(10, 'Description must be at least 10 characters'),
    preparationTime: Yup.number().moreThan(-1, "must be greater than or 0 (zero)"),
    type: Yup.object().shape({
        value: Yup.string(),
        label: Yup.string(),
    }).required("Shop type is required"),

    resturantCategory: Yup.object().when('type', ([type]) => {
        if (type?.value === ShopTypes.resturant) {
            return (
                Yup.array().min(1, ' Must have at least 1 item').of(
                    Yup.object().shape({
                        value: Yup.string(),
                        label: Yup.string(),
                    }).required("required")
                ))
        }
        return (
            Yup.array().of(
                Yup.object().shape({
                    value: Yup.string(),
                    label: Yup.string(),
                })
            ))
    }),

    tradeLicence: Yup.object().shape({
        tradeLicenseIssueAt: Yup.string().required("Issue date is required"),
        tradeLicenseExpireAt: Yup.string().required("Expiary date is required"),
        tradeLicenseUrl: Yup.string().required("Trade license is required")
    }),
    address: Yup.object().shape({
        country: Yup.string().required("Country is required"),
        city: Yup.string().required("City is required").min(3, 'City must be at least 3 characters'),
        streetAddress: Yup.string().required("Street address is required").min(10, 'Street address must be at least 10 characters'),
        state: Yup.string().required("State is required").min(3, 'State must be at least 3 characters'),
        zip: Yup.number().required("Zip code is required"),
    }),
    setting: Yup.object().shape({
        contact: Yup.string().required("Contact is required"),
        opensAt: Yup.string().required("Opening time is required"),
        closesAt: Yup.string().required("closing time is required"),
        location: Yup.object().shape({
            lat: Yup.string(),
            lng: Yup.string(),
            city: Yup.string(),
            state: Yup.string(),
            country: Yup.string(),
            formattedAddress: Yup.string(),
            coordinates: Yup.array().of(Yup.string()),
        }).required("Location is required"),
    }),
    bankAccountDetails: Yup.object().shape({
        accountHolderName: Yup.string(),
        accountHolderEmail: Yup.string(),
        bankName: Yup.string(),
        accountNumber: Yup.string(),
    })
});

export default editShopSchema
