import { Box, Divider, Typography } from '@mui/material'
import CustomTextField1 from '@components/common/text-field/custom-text-field-1'
import { useFormik } from 'formik'
import { useTranslation } from 'react-i18next'
import CustomButton from '@components/common/Button/custom-button'
import PhoneNumberField from '@components/common/text-field/phone-number-field'
import CardHeader from '@mui/material/CardHeader'
import SingleImageUploader from '@components/common/file-uploader/single-image-uploader'
import DropzoneWrapper from 'src/@core/styles/libs/react-dropzone'
import PDFuploader from '@components/common/file-uploader/pdf-uploader'
import DatePicker from 'react-datepicker'
import CustomInputs from '@components/common/datepicker-custom-input'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import { shopTypesList, ShopTypes } from "@utils/constants"
import GooglePlacesAutocomplete from '@components/common/text-field/google-places-autocomplete'
import { useResturantCategoriesQuery } from '@data/resturant-categories/resturant-categories-query'
import CustomSelect from '@components/common/select/custom-select'
import createShopSchema from './create-shop-schema'
import { ShopAddress, ShopBankDetails, ShopSettings, ShopTradeLicense } from '@ts-types/generated'
import { useCreateShopMutation } from '@data/shop/create-shop-mutation'
import { useRouter } from 'next/router'
import { useAuthCredentials } from '@store/apps/auth'
import { ROUTES } from '@utils/routes'


type FormValues = {
    name: string;
    description: string;
    image: string;
    tradeLicence: ShopTradeLicense;
    setting: ShopSettings;
    address: ShopAddress;
    bankAccountDetails: ShopBankDetails
} & ({
    type: { value: ShopTypes.grocery | ShopTypes.homeBusiness | ShopTypes.pharmacy; label: string } | null
} | {
    type: { value: ShopTypes.resturant, label: string } | null
    resturantCategory: { label: string, value: string }[] | []
})


const initialValues: FormValues = {
    name: "",
    description: "",
    image: "",
    tradeLicence: {
        tradeLicenseIssueAt: null,
        tradeLicenseExpireAt: null,
        tradeLicenseUrl: ""
    },
    setting: {
        contact: "",
        opensAt: null,
        closesAt: null,
        location: null,
    },
    address: {
        country: "",
        city: "",
        streetAddress: "",
        state: "",
        zip: ""
    },
    bankAccountDetails: {
        accountHolderName: "",
        accountHolderEmail: "",
        bankName: "",
        accountNumber: ""
    },
    type: null,
    resturantCategory: []
}

const CreateShopForm = () => {
    // ** States
    const { t } = useTranslation(['form'])
    const { mutate: createShop, isLoading: creatingShop } = useCreateShopMutation()
    const { data: resturantCategories } = useResturantCategoriesQuery({ limit: 9999, page: 1 });
    const router = useRouter()
    const { setCredentials, authValues } = useAuthCredentials()

    const { handleSubmit, errors, getFieldProps, setFieldValue, values } = useFormik({
        initialValues,
        validationSchema: createShopSchema,
        onSubmit: (values, { resetForm }) => handelCreateShop(values, resetForm)
    })

    const handelCreateShop = (values: FormValues, resetForm: any) => {
        createShop(
            {
                ...values,
                type: values.type?.value,
                resturantCategory: values?.resturantCategory?.map((category: any) => category.value)
            },
            {
                onSuccess: ({ data }) => {
                    setCredentials({ token: authValues.token, role: authValues.role, user: { ...authValues.user, shop: data } })
                    router?.push(ROUTES.DASHBOARD)
                    resetForm({ values: '' })
                }
            }
        )
    }

    return (
        <form noValidate autoComplete='off' onSubmit={handleSubmit}>
            <DropzoneWrapper>
                <CardHeader
                    title='Image'
                    subheader="Upload your shop image from here"
                    sx={{ p: 0 }}
                    titleTypographyProps={{ fontSize: "1rem !important" }}
                />
                <SingleImageUploader
                    errorMsg={t(errors.image as string)}
                    getFile={(val) => setFieldValue("image", val)}
                    removeFile={() => setFieldValue("image", "")}
                />

                <Divider sx={{ my: 10 }} />

                <CardHeader
                    title='Trade License'
                    subheader="Upload your trade license from here Trade license should be in PDF format"
                    sx={{ p: 0 }}
                    titleTypographyProps={{ fontSize: "1rem !important" }}
                />
                <PDFuploader
                    errorMsg={t(errors.tradeLicence?.tradeLicenseUrl as string)}
                    getFile={(val) => setFieldValue("tradeLicence.tradeLicenseUrl", val)}
                    removeFile={() => setFieldValue("tradeLicence.tradeLicenseUrl", "")}
                />

                <DatePickerWrapper>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap' }} className='demo-space-x'>
                        <div>
                            <DatePicker
                                selected={values.tradeLicence.tradeLicenseIssueAt}
                                showYearDropdown
                                showMonthDropdown
                                name='tradeLicence.tradeLicenseIssueAt'
                                id='basic-input'
                                onChange={(date: Date) => setFieldValue("tradeLicence.tradeLicenseIssueAt", date)}
                                placeholderText='Click to select a date'
                                customInput={<CustomInputs label='Issue at' />}
                            />
                            {errors.tradeLicence?.tradeLicenseIssueAt && (
                                <Typography variant='body2' sx={{ mt: 1, mb: 0, color: 'red' }}>
                                    {errors.tradeLicence?.tradeLicenseIssueAt as string}
                                </Typography>
                            )}
                        </div>
                        <div>
                            <DatePicker
                                selected={values.tradeLicence.tradeLicenseExpireAt}
                                disabled={values.tradeLicence.tradeLicenseIssueAt ? false : true}
                                showYearDropdown
                                showMonthDropdown
                                id='disabled-input'
                                minDate={values.tradeLicence.tradeLicenseIssueAt}
                                name='tradeLicence.tradeLicenseExpireAt'
                                onChange={(date: Date) => setFieldValue("tradeLicence.tradeLicenseExpireAt", date)}
                                placeholderText='Click to select a date'
                                customInput={<CustomInputs label='Expires at' />}
                            />
                            {errors.tradeLicence?.tradeLicenseExpireAt && (
                                <Typography variant='body2' sx={{ mt: 1, mb: 0, color: 'red' }}>
                                    {errors.tradeLicence?.tradeLicenseExpireAt as string}
                                </Typography>
                            )}
                        </div>
                    </Box>
                </DatePickerWrapper>

                <Divider sx={{ my: 10 }} />

                <CardHeader
                    title='Basic Info'
                    subheader="Add some basic info about your shop from here"
                    sx={{ p: 0, mb: 4 }}
                    titleTypographyProps={{ fontSize: "1rem !important" }}
                />
                <CustomTextField1
                    errorMsg={t(errors?.name as string)}
                    fullWidth
                    sx={{ mb: 4 }}
                    label={t(`Full Name`)}
                    placeholder={t(`Full Name`) as string}
                    {...getFieldProps('name')}
                />

                <CustomTextField1
                    errorMsg={t(errors?.description as string)}
                    fullWidth
                    multiline
                    rows={4}
                    sx={{ mb: 4 }}
                    label={t(`Description`)}
                    placeholder={t(`Description`) as string}
                    {...getFieldProps('description')}
                />

                <CustomSelect
                    name="type"
                    list={shopTypesList.map((type) => ({ label: type, value: type }))}
                    value={values?.type}
                    //@ts-ignore
                    onChange={(val, { action }) => {
                        if (action === "clear") {
                            setFieldValue("type", null)
                        }
                        setFieldValue("type", val)
                    }}
                    isMulti={false}
                    label={"Shop Type"}
                    errorMsg={t(errors.type as string)}
                    placeHolder='Select Shop Type'
                />

                {values.type?.value === ShopTypes.resturant &&
                    <CustomSelect
                        name="resturantCategory"
                        list={resturantCategories?.categories.data.map((category) => ({ label: category.title, value: category._id }))}
                        value={values?.resturantCategory}
                        //@ts-ignore
                        onChange={(val, { action }) => {
                            if (action === "clear") {
                                setFieldValue("resturantCategory", [])
                            }
                            setFieldValue("resturantCategory", val)
                        }}
                        isMulti={true}
                        label={"Resturant Category"}
                        //@ts-ignore
                        errorMsg={t(errors.resturantCategory as string)}
                        placeHolder='Select Resturant Category'
                    />
                }

                <Divider sx={{ my: 10 }} />

                <CardHeader
                    title='Payment Info'
                    subheader="Add your payment information from here"
                    sx={{ p: 0, mb: 4 }}
                    titleTypographyProps={{ fontSize: "1rem !important" }}
                />
                <CustomTextField1
                    errorMsg={t(errors?.bankAccountDetails?.accountHolderName as string)}
                    fullWidth
                    sx={{ mb: 4 }}
                    label={t(`Account Holder Name`)}
                    placeholder={t(`Account Holder Name`) as string}
                    {...getFieldProps('bankAccountDetails.accountHolderName')}
                />
                <CustomTextField1
                    errorMsg={t(errors?.bankAccountDetails?.accountHolderEmail as string)}
                    fullWidth
                    sx={{ mb: 4 }}
                    label={t(`Account Holder Email `)}
                    placeholder={t(`Account Holder Email `) as string}
                    {...getFieldProps('bankAccountDetails.accountHolderEmail')}
                />
                <CustomTextField1
                    errorMsg={t(errors?.bankAccountDetails?.bankName as string)}
                    fullWidth
                    sx={{ mb: 4 }}
                    label={t(`Bank Name `)}
                    placeholder={t(`Bank Name `) as string}
                    {...getFieldProps('bankAccountDetails.bankName')}
                />
                <CustomTextField1
                    errorMsg={t(errors?.bankAccountDetails?.accountNumber as string)}
                    fullWidth
                    label={t(`Account Number`)}
                    placeholder={t(`Account Number `) as string}
                    {...getFieldProps('bankAccountDetails.accountNumber')}
                />

                <Divider sx={{ my: 10 }} />

                <CardHeader
                    title='Shop Address'
                    subheader="Add your physical shop address from here"
                    sx={{ p: 0, mb: 4 }}
                    titleTypographyProps={{ fontSize: "1rem !important" }}
                />

                <CustomTextField1
                    sx={{ mb: 4 }}
                    errorMsg={t(errors?.address?.country as string)}
                    fullWidth
                    label={t(`Country`)}
                    placeholder={t(`Country`) as string}
                    {...getFieldProps('address.country')}
                />
                <CustomTextField1
                    sx={{ mb: 4 }}
                    errorMsg={t(errors?.address?.city as string)}
                    fullWidth
                    label={t(`City`)}
                    placeholder={t(`City`) as string}
                    {...getFieldProps('address.city')}
                />
                <CustomTextField1
                    sx={{ mb: 4 }}
                    errorMsg={t(errors?.address?.state as string)}
                    fullWidth
                    label={t(`State`)}
                    placeholder={t(`State`) as string}
                    {...getFieldProps('address.state')}
                />
                <CustomTextField1
                    sx={{ mb: 4 }}
                    errorMsg={t(errors?.address?.zip as string)}
                    fullWidth
                    label={t(`ZIP`)}
                    type='number'
                    placeholder={t(`ZIP`) as string}
                    {...getFieldProps('address.zip')}
                />
                <CustomTextField1
                    errorMsg={t(errors?.address?.streetAddress as string)}
                    fullWidth
                    multiline
                    rows={4}
                    label={t(`Street Address`)}
                    placeholder={t(`Street Address`) as string}
                    {...getFieldProps('address.streetAddress')}
                />

                <Divider sx={{ my: 10 }} />

                <CardHeader
                    title='Info Settings'
                    subheader="Add your shop settings information from here"
                    sx={{ p: 0, mb: 4 }}
                    titleTypographyProps={{ fontSize: "1rem !important" }}
                />

                <GooglePlacesAutocomplete
                    onChange={(val: any) => setFieldValue("setting.location", val)}
                    errorMsg={t(errors?.setting?.location as string)}
                    label={t(`Set location from map`)}
                    placeholder={t(`Search location from here`) ?? ""}
                    inputFieldStyle={{ mb: 4 }}
                    data={values?.setting?.location?.formattedAddress}
                />

                <PhoneNumberField
                    label={t(`Contact Number`)}
                    errorMsg={t(errors?.setting?.contact as string)}
                    value={values?.setting.contact}
                    placeholder={t(`form:form-register-phone-label`)}
                    onChange={value => setFieldValue('setting.contact', value)}
                />

                <DatePickerWrapper>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap' }} className='demo-space-x'>
                        <div>
                            <DatePicker
                                showTimeSelect
                                selected={values?.setting?.opensAt}
                                timeIntervals={15}
                                showTimeSelectOnly
                                dateFormat='h:mm aa'
                                id='time-only-picker'
                                placeholderText='Select opening time'
                                onChange={(date: Date) => setFieldValue("setting.opensAt", date)}
                                customInput={<CustomInputs label='Opening Time' />}
                            />
                            {errors.setting?.opensAt && (
                                <Typography variant='body2' sx={{ mt: 1, mb: 0, color: 'red' }}>
                                    {errors.setting?.opensAt}
                                </Typography>
                            )}
                        </div>
                        <div>
                            <DatePicker
                                showTimeSelect
                                selected={values?.setting?.closesAt}
                                timeIntervals={15}
                                showTimeSelectOnly
                                dateFormat='h:mm aa'
                                id='time-only-picker'
                                placeholderText='Select closing time'
                                onChange={(date: Date) => setFieldValue("setting.closesAt", date)}
                                customInput={<CustomInputs label='Closing Time' />}
                            />
                            {errors.setting?.closesAt && (
                                <Typography variant='body2' sx={{ mt: 1, mb: 0, color: 'red' }}>
                                    {errors.setting?.closesAt}
                                </Typography>
                            )}
                        </div>
                    </Box>
                </DatePickerWrapper>

                <CustomButton
                    variant='contained'
                    sx={{ mb: 4, mt: 8 }}
                    disabled={creatingShop}
                    loading={creatingShop}
                    type='submit'
                >
                    {t(`form:form-register-signUp-button-label`)}
                </CustomButton>
            </DropzoneWrapper>
        </form >
    )
}

export default CreateShopForm
