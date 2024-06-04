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
import { Shop, ShopAddress, ShopBankDetails, ShopSettings, ShopTradeLicense } from '@ts-types/generated'
import editShopSchema from './edit-shop-schema'
import { useUpdateShopMutation } from '@data/shop/update-shop-mutation'


type PropTypes = {
    shopData: Shop
}

type FormValues = {
    name: string;
    description: string;
    image: string;
    preparationTime: number;
    tradeLicence: ShopTradeLicense;
    setting: ShopSettings;
    address: ShopAddress;
    bankAccountDetails: ShopBankDetails
    type: { value: ShopTypes, label: ShopTypes } | null
    resturantCategory: { label: string, value: string }[] | []
}

const EditShopForm = ({ shopData }: PropTypes) => {
    // ** States
    const { t } = useTranslation(['form'])
    const { mutate: updateShop, isLoading: creatingShop } = useUpdateShopMutation()
    const { data: resturantCategories } = useResturantCategoriesQuery({ limit: 9999, page: 1 });

    const initialValues: FormValues = {
        name: shopData.name,
        description: shopData.description,
        image: shopData.image,
        preparationTime: shopData?.preparationTime,
        address: shopData?.address,
        bankAccountDetails: shopData?.bankAccountDetails,
        setting: shopData?.setting,
        tradeLicence: shopData.tradeLicence,
        type: { value: shopData.type as ShopTypes, label: shopData.type as ShopTypes },
        resturantCategory: shopData.resturantCategory.map((category) => ({ label: category.title, value: category._id }))
    }

    const { handleSubmit, errors, getFieldProps, setFieldValue, values } = useFormik({
        initialValues,
        validationSchema: editShopSchema,
        onSubmit: (values) => handelUpdateShop(values)
    })

    const handelUpdateShop = (values: FormValues) => {
        updateShop(
            {
                ...values,
                _id: shopData?._id,
                resturantCategory: values?.resturantCategory?.map((category) => category.value)
            }
        )
    }

    return (
        <form noValidate autoComplete='off' onSubmit={handleSubmit}>
            <DropzoneWrapper>
                <CardHeader
                    title={t('common:Images')}
                    subheader={t("common:upload-shop-image")}
                    sx={{ p: 0 }}
                    titleTypographyProps={{ fontSize: "1rem !important" }}
                />
                <SingleImageUploader
                    errorMsg={t(errors.image as string)}
                    getFile={(val) => setFieldValue("image", val)}
                    removeFile={() => setFieldValue("image", "")}
                    data={values?.image}
                />
                <Divider sx={{ my: 10 }} />
                <CardHeader
                    title={t("common:trade-license")}
                    subheader={t("common:trade-license-sub-heading")}
                    sx={{ p: 0 }}
                    titleTypographyProps={{ fontSize: "1rem !important" }}
                />
                <PDFuploader
                    errorMsg={t(errors.tradeLicence?.tradeLicenseUrl as string)}
                    getFile={(val) => setFieldValue("tradeLicence.tradeLicenseUrl", val)}
                    removeFile={() => setFieldValue("tradeLicence.tradeLicenseUrl", "")}
                    data={values?.tradeLicence?.tradeLicenseUrl}
                />

                <DatePickerWrapper>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap' }} className='demo-space-x'>
                        <div>
                            <DatePicker
                                selected={new Date(values?.tradeLicence?.tradeLicenseIssueAt ?? new Date)}
                                showYearDropdown
                                showMonthDropdown
                                name='tradeLicence.tradeLicenseIssueAt'
                                id='basic-input'
                                onChange={(date: Date) => setFieldValue("tradeLicence.tradeLicenseIssueAt", date)}
                                placeholderText={`${t("common:placeholder-filter-date")}`}
                                customInput={<CustomInputs label={`${t("common:issues-at")}`} />}
                            />
                            {errors.tradeLicence?.tradeLicenseIssueAt && (
                                <Typography variant='body2' sx={{ mt: 1, mb: 0, color: 'red' }}>
                                    {errors.tradeLicence?.tradeLicenseIssueAt as string}
                                </Typography>
                            )}
                        </div>
                        <div>
                            <DatePicker
                                selected={new Date(values?.tradeLicence?.tradeLicenseExpireAt ?? new Date)}
                                disabled={values?.tradeLicence?.tradeLicenseIssueAt ? false : true}
                                showYearDropdown
                                showMonthDropdown
                                id='disabled-input'
                                minDate={values?.tradeLicence?.tradeLicenseIssueAt}
                                name='tradeLicence.tradeLicenseExpireAt'
                                onChange={(date: Date) => setFieldValue("tradeLicence.tradeLicenseExpireAt", date)}
                                placeholderText={`${t("common:placeholder-filter-date")}`}
                                customInput={<CustomInputs label={`${t("common:expires-at")}`} />}
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
                    title={t('common:basic-info')}
                    subheader={t("common:basic-info-sub-heading")}
                    sx={{ p: 0, mb: 4 }}
                    titleTypographyProps={{ fontSize: "1rem !important" }}
                />
                <CustomTextField1
                    errorMsg={t(errors?.name as string)}
                    fullWidth
                    sx={{ mb: 4 }}
                    label={t(`common:full-name`)}
                    placeholder={t(`common:full-name`) as string}
                    {...getFieldProps('name')}
                />

                <CustomTextField1
                    errorMsg={t(errors?.description as string)}
                    fullWidth
                    multiline
                    rows={4}
                    sx={{ mb: 4 }}
                    label={t(`common:Description`)}
                    placeholder={t(`common:Description`) as string}
                    {...getFieldProps('description')}
                />

                <CustomSelect
                    name="type"
                    disable={true}
                    list={shopTypesList.map((type) => ({ label: type, value: type }))}
                    value={values?.type}
                    onChange={(val, { action }) => {
                        if (action === "clear") {
                            setFieldValue("type", null)
                        }
                        setFieldValue("type", val)
                    }}
                    isMulti={false}
                    label={`${t(`common:shop-type`)}`}
                    errorMsg={t(errors.type as string)}
                    placeHolder={`${t("common:placeholder-shop-type")}`}
                />

                {values.type?.value === ShopTypes.resturant &&
                    <CustomSelect
                        name="resturantCategory"
                        list={resturantCategories?.categories.data.map((category) => ({ label: category.title, value: category._id }))}
                        value={values?.resturantCategory}
                        onChange={(val, { action }) => {
                            if (action === "clear") {
                                setFieldValue("resturantCategory", [])
                            }
                            setFieldValue("resturantCategory", val)
                        }}
                        isMulti={true}
                        label={`${t(`common:restaurant-category`)}`}
                        errorMsg={t(errors.resturantCategory as string)}
                        placeHolder={`${t("common:placeholder-restaurant-category")}`}
                    />
                }

                <CustomTextField1
                    errorMsg={t(errors?.preparationTime as string)}
                    fullWidth
                    sx={{ mb: 4 }}
                    type='number'
                    label={t(`common:preparation-time`)}
                    placeholder={t(`common:placeholder-preparation-time`) as string}
                    {...getFieldProps('preparationTime')}
                />

                <Divider sx={{ my: 10 }} />

                <CardHeader
                    title={t(`common:payment-info`)}
                    subheader={t(`common:placeholder-payment-info`) as string}
                    sx={{ p: 0, mb: 4 }}
                    titleTypographyProps={{ fontSize: "1rem !important" }}
                />
                <CustomTextField1
                    errorMsg={t(errors?.bankAccountDetails?.accountHolderName as string)}
                    fullWidth
                    sx={{ mb: 4 }}
                    label={t(`common:account-holder-name`)}
                    placeholder={t(`common:account-holder-name`) as string}
                    {...getFieldProps('bankAccountDetails.accountHolderName')}
                />
                <CustomTextField1
                    errorMsg={t(errors?.bankAccountDetails?.accountHolderEmail as string)}
                    fullWidth
                    sx={{ mb: 4 }}
                    label={t(`common:account-holder-email`)}
                    placeholder={t(`common:account-holder-email`) as string}
                    {...getFieldProps('bankAccountDetails.accountHolderEmail')}
                />
                <CustomTextField1
                    errorMsg={t(errors?.bankAccountDetails?.bankName as string)}
                    fullWidth
                    sx={{ mb: 4 }}
                    label={t(`common:bank-name`)}
                    placeholder={t(`common:bank-name`) as string}
                    {...getFieldProps('bankAccountDetails.bankName')}
                />
                <CustomTextField1
                    errorMsg={t(errors?.bankAccountDetails?.accountNumber as string)}
                    fullWidth
                    label={t(`common:account-number`)}
                    placeholder={t(`common:account-number`) as string}
                    {...getFieldProps('bankAccountDetails.accountNumber')}
                />

                <Divider sx={{ my: 10 }} />

                <CardHeader
                    title={t(`common:shop-address`)}
                    subheader={t(`common:placeholder-shop-address`) as string}
                    sx={{ p: 0, mb: 4 }}
                    titleTypographyProps={{ fontSize: "1rem !important" }}
                />

                <CustomTextField1
                    sx={{ mb: 4 }}
                    errorMsg={t(errors?.address?.country as string)}
                    fullWidth
                    label={t(`common:Country`)}
                    placeholder={t(`common:Country`) as string}
                    {...getFieldProps('address.country')}
                />
                <CustomTextField1
                    sx={{ mb: 4 }}
                    errorMsg={t(errors?.address?.city as string)}
                    fullWidth
                    label={t(`common:City`)}
                    placeholder={t(`common:City`) as string}
                    {...getFieldProps('address.city')}
                />
                <CustomTextField1
                    sx={{ mb: 4 }}
                    errorMsg={t(errors?.address?.state as string)}
                    fullWidth
                    label={t(`common:State`)}
                    placeholder={t(`common:State`) as string}
                    {...getFieldProps('address.state')}
                />
                <CustomTextField1
                    sx={{ mb: 4 }}
                    errorMsg={t(errors?.address?.zip as string)}
                    fullWidth
                    label={t(`common:ZIP`)}
                    type='number'
                    placeholder={t(`common:ZIP`) as string}
                    {...getFieldProps('address.zip')}
                />
                <CustomTextField1
                    errorMsg={t(errors?.address?.streetAddress as string)}
                    fullWidth
                    multiline
                    rows={4}
                    label={t(`common:street-address`)}
                    placeholder={t(`common:street-address`) as string}
                    {...getFieldProps('address.streetAddress')}
                />

                <Divider sx={{ my: 10 }} />

                <CardHeader
                    title={t(`common:info-settings`)}
                    subheader={t(`common:info-settings-sub-heading`) as string}
                    sx={{ p: 0, mb: 4 }}
                    titleTypographyProps={{ fontSize: "1rem !important" }}
                />

                <GooglePlacesAutocomplete
                    onChange={(val: any) => setFieldValue("setting.location", val)}
                    errorMsg={t(errors?.setting?.location as string)}
                    label={t(`Set location from map`)}
                    placeholder={t(`common:placeholder-set-location`)}
                    inputFieldStyle={{ mb: 4 }}
                    data={values?.setting?.location}
                />

                <PhoneNumberField
                    label={t(`common:contact-number`)}
                    errorMsg={t(errors?.setting?.contact as string)}
                    value={values?.setting?.contact}
                    placeholder={t(`common:contact-number`)}
                    onChange={value => setFieldValue('setting.contact', value)}
                />

                <DatePickerWrapper>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap' }} className='demo-space-x'>
                        <div>
                            <DatePicker
                                showTimeSelect
                                selected={new Date(values?.setting?.opensAt ?? new Date)}
                                timeIntervals={15}
                                showTimeSelectOnly
                                dateFormat='h:mm aa'
                                id='time-only-picker'
                                placeholderText={`${t("common:placeholder-opening-time")}`}
                                onChange={(date: Date) => setFieldValue("setting.opensAt", date)}
                                customInput={<CustomInputs label={`${t(`common:opening-time`)}`} />}
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
                                selected={new Date(values?.setting?.closesAt ?? new Date)}
                                timeIntervals={15}
                                showTimeSelectOnly
                                dateFormat='h:mm aa'
                                id='time-only-picker'
                                placeholderText={`${t("common:placeholder-closing-time")}`}
                                onChange={(date: Date) => setFieldValue("setting.closesAt", date)}
                                customInput={<CustomInputs label={`${t(`common:closing-time`)}`} />}
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
                    {t(`common:Update`)}
                </CustomButton>
            </DropzoneWrapper>
        </form >
    )
}

export default EditShopForm
