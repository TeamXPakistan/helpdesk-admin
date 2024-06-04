import CustomButton from "@components/common/Button/custom-button";
import CustomSelect from "@components/common/select/custom-select";
import CustomTextField1 from "@components/common/text-field/custom-text-field-1";
import { FoodVariation, Maybe, Product, UpdateFood } from "@ts-types/generated";
import { FieldArray, Formik } from "formik";
import { useTranslation } from "react-i18next";
import { Box, CardHeader, Alert } from "@mui/material";
import DropzoneWrapper from "src/@core/styles/libs/react-dropzone";
import MultipleImageUploader from "@components/common/file-uploader/multiple-image-uploader";
import { FoodProductTypes, FoodProductTypesList } from "@utils/constants";
import createFoodSchema from "./create-food-form-schema";
import { Divider, Checkbox, FormControlLabel, } from '@mui/material'
import MenuItem from '@mui/material/MenuItem'
import Icon from '@components/common/icon/icon';
import toast from "react-hot-toast";
import Grid from '@mui/material/Grid'
import { useUpdateFoodMutation } from "@data/products/update-food-mutation";

type PropTypes = {
    formData: Product,
    menuCategories: { label: string, value: string }[] | undefined
}

type FormValues = {
    name: string;
    menuCategory: { label: string; value: string } | undefined | null;
    productType: { label: string; value: string }
    price: Maybe<number>;
    salePrice: Maybe<number>;
    quantity: Maybe<number>;
    description: Maybe<string>;
    images: string[];
    minPrice: Maybe<number>;
    maxPrice: Maybe<number>;
    requiredFields: Array<FoodVariation>;
    optionalFields: Array<FoodVariation>;
    isEnabled: boolean;
}

const initialRequiredFieldVariationValue = {
    title: "",
    isRequired: true,
    isMultiple: false,
    limit: 0,
    options: [
        {
            name: "",
            price: 0,
            salePrice: 0
        }
    ]
}

const initialOptionalFieldVariationValue = {
    title: "",
    isRequired: false,
    isMultiple: true,
    limit: 0,
    options: [
        {
            name: "",
            price: 0,
            salePrice: 0
        }
    ]
}


const EditFoodForm = ({ formData, menuCategories }: PropTypes) => {
    const { t } = useTranslation(['form'])
    const { mutate, isLoading } = useUpdateFoodMutation()

    const initialValues: FormValues = {
        ...formData,
        menuCategory: menuCategories?.find((menuCategory) => menuCategory.value === formData.menuCategory),
        productType: { label: formData.productType, value: formData.productType },
        requiredFields: formData.veriations.filter((variation: FoodVariation) => variation.isRequired === true),
        optionalFields: formData.veriations.filter((variation: FoodVariation) => variation.isRequired === false)
    }

    const updateProduct = (values: FormValues, resetForm: any) => {
        const foodProductValues: UpdateFood = {
            ...values,
            menuCategory: values.menuCategory?.value,
            productType: values.productType.value,
        }

        if (values.productType.value === FoodProductTypes.variation) {
            if (values.optionalFields.length < 1 && values.requiredFields.length < 1) {
                toast.error(t("One required or option field is required"), { duration: 3000 });
                return;
            }
            foodProductValues.veriations = [
                ...values.requiredFields,
                ...values.optionalFields,
            ]

            delete foodProductValues.price;
            delete foodProductValues.salePrice;
        }
        if (values.productType.value === FoodProductTypes.simple) {
            foodProductValues.veriations = []
            foodProductValues.minPrice = null
            foodProductValues.maxPrice = null
        }

        mutate(foodProductValues,
            {
                onSuccess: () => {
                    resetForm({ values: '' })

                }
            }
        )
    }

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={(values, { resetForm }) => updateProduct(values, resetForm)}
            validationSchema={createFoodSchema}
        >
            {({ errors, getFieldProps, setFieldValue, values, handleSubmit }) => {
                return (
                    <form noValidate autoComplete='off' onSubmit={handleSubmit}>
                        <Grid container>
                            <Grid item xs={12} md={5} lg={4}>

                            </Grid>
                            <Grid item xs={12} md={7} lg={8} >

                                {/* product title */}
                                <CustomTextField1
                                    errorMsg={t(errors?.name as string)}
                                    fullWidth
                                    sx={{ mb: 5 }}
                                    label={t(`Product Name`)}
                                    placeholder={t(`Product Name`) as string}
                                    {...getFieldProps('name')}
                                />

                                {/* Category */}
                                <CustomSelect
                                    name="menuCategory"
                                    list={menuCategories}
                                    value={values?.menuCategory}
                                    //@ts-ignore
                                    onChange={(val, { action }) => {
                                        if (action === "clear") {
                                            setFieldValue("menuCategory", null)
                                        }
                                        setFieldValue("menuCategory", val)
                                    }}
                                    isMulti={false}
                                    label={"Category"}
                                    errorMsg={t(errors?.menuCategory as string)}
                                    placeHolder='Select category'
                                />

                                {/* product Type */}
                                <CustomSelect
                                    name="productType"
                                    list={FoodProductTypesList?.map((type: string) => ({ label: type, value: type }))}
                                    value={values?.productType}
                                    //@ts-ignore
                                    onChange={(val, { action }) => {
                                        if (action === "clear") {
                                            setFieldValue("productType", null)
                                        }
                                        setFieldValue("productType", val)
                                    }}
                                    isMulti={false}
                                    label={"Product type"}
                                    errorMsg={t(errors?.productType as string)}
                                    placeHolder='Select Product type'
                                />

                                {/* Price  */}
                                {values?.productType?.value === FoodProductTypes.simple as string &&
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', mt: -4, mb: 4 }} className='demo-space-x'>
                                        <div>
                                            <CustomTextField1
                                                errorMsg={t(errors?.price as string)}
                                                fullWidth
                                                label={t(`Price`)}
                                                type="number"
                                                placeholder={t(`Add price`) as string}
                                                {...getFieldProps('price')}
                                            />
                                        </div>
                                        <div>
                                            <CustomTextField1
                                                errorMsg={t(errors?.salePrice as string)}
                                                fullWidth
                                                type="number"
                                                label={t(`Sale price`)}
                                                placeholder={t(`eg: 200, 450, 700 `) as string}
                                                {...getFieldProps('salePrice')}
                                            />
                                        </div>
                                    </Box>
                                }
                            </Grid>
                        </Grid>

                        {/* <<<<<<<<<<<<<<<<<<<<< VARIABLE PRODUCT >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}
                        {values?.productType?.value === FoodProductTypes.variation &&
                            <Box>
                                {/* <<<<<<<<<<<<<<<<<<<<< REQUIRED FIELDS >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}
                                <FieldArray
                                    name="requiredFields"
                                    render={(requiredFieldArrayHelper) => (
                                        <>
                                            <Divider sx={{ my: 8 }} />
                                            <Box sx={{ borderRadius: 1, display: "flex", justifyContent: "space-between", mb: 5 }}>
                                                <CardHeader
                                                    title='Required fields'
                                                    subheader="Add one or more fields to this variation"
                                                    sx={{ p: 0, mb: 3 }}
                                                    titleTypographyProps={{ fontSize: "1.1rem !important" }}
                                                />
                                                <CustomButton
                                                    type="button"
                                                    fullWidth={false}
                                                    variant="text"
                                                    onClick={() => requiredFieldArrayHelper.push(initialRequiredFieldVariationValue)}
                                                    startIcon={<Icon color='red' fontSize='1.625rem' icon={'mdi:add-bold'} />}
                                                >
                                                    Add field
                                                </CustomButton>
                                            </Box>
                                            {
                                                values?.requiredFields?.map((variation, index) => {
                                                    return (
                                                        <>
                                                            <Grid container>
                                                                <Grid item xs={12} md={5} lg={4}>
                                                                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "start" }}>
                                                                        <CardHeader
                                                                            title={`Variation ${index + 1} (Required)`}
                                                                            sx={{ p: 0, mb: 3 }}
                                                                            titleTypographyProps={{ fontSize: "1.0rem !important" }}
                                                                        />
                                                                        <CustomButton
                                                                            type="button"
                                                                            fullWidth={false}
                                                                            variant="text"
                                                                            size="small"
                                                                            endIcon={<Icon color='red' fontSize='1.625rem' icon={'mdi:remove-bold'} />}

                                                                            onClick={() => requiredFieldArrayHelper.remove(index)}
                                                                        >
                                                                            Remove
                                                                        </CustomButton>
                                                                    </Box>
                                                                </Grid>
                                                                <Grid item xs={12} md={7} lg={8} >
                                                                    <CustomTextField1
                                                                        errorMsg={t(errors.requiredFields ? errors?.requiredFields[index]?.title : "")}
                                                                        fullWidth
                                                                        sx={{ mb: 5 }}
                                                                        label={t(`Heading`)}
                                                                        placeholder={t(`Add heading`) as string}
                                                                        {...getFieldProps(`requiredFields[${index}].title`)}
                                                                    />
                                                                    <CustomTextField1
                                                                        select
                                                                        fullWidth
                                                                        label={t(`Select`)}
                                                                        sx={{ mb: 4, '& .MuiFilledInput-input.MuiSelect-select': { minWidth: '8rem !important' } }}
                                                                        SelectProps={{
                                                                            displayEmpty: true,
                                                                            value: values.requiredFields[index].isMultiple,
                                                                            // onChange: e => console.log((e.target.value) as string)
                                                                            onChange: e => setFieldValue(`requiredFields[${index}].isMultiple`, e.target.value)
                                                                        }}
                                                                    >
                                                                        <MenuItem disabled value=''>Select</MenuItem>
                                                                        {/* @ts-ignore */}
                                                                        <MenuItem value={false}>One</MenuItem>
                                                                        {/* @ts-ignore */}
                                                                        <MenuItem value={true}>many</MenuItem>
                                                                    </CustomTextField1>

                                                                    {values?.requiredFields[index]?.isMultiple &&
                                                                        <CustomTextField1
                                                                            errorMsg={t(errors.requiredFields ? errors?.requiredFields[index]?.limit : "")}
                                                                            fullWidth
                                                                            type="number"
                                                                            label={t(`Limit`)}
                                                                            sx={{ mb: 4 }}
                                                                            placeholder={t(`Add selection limit`) as string}
                                                                            {...getFieldProps(`requiredFields[${index}].limit`)}
                                                                        />
                                                                    }

                                                                    {/* XXXXXXXXXXXXXXXXXXXXXXXXXXXXX OPTIONS SECTION XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX */}
                                                                    <FieldArray
                                                                        name={`requiredFields[${index}].options`}
                                                                        render={(optionalFieldArrayHelper) => (
                                                                            <>
                                                                                <Box>
                                                                                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                                                                        <CardHeader
                                                                                            title='Options'
                                                                                            subheader="Add one or more options to this variation"
                                                                                            sx={{ p: 0, mb: 3 }}
                                                                                            titleTypographyProps={{ fontSize: "0.9rem !important" }}
                                                                                        />
                                                                                        <CustomButton
                                                                                            type="button"
                                                                                            fullWidth={false}
                                                                                            variant="text"
                                                                                            size="small"
                                                                                            startIcon={<Icon color='red' fontSize='1.625rem' icon={'mdi:add-bold'} />}
                                                                                            onClick={() => optionalFieldArrayHelper.push({ name: "", price: 0, salePrice: 0 })}
                                                                                        >
                                                                                            Add option
                                                                                        </CustomButton>
                                                                                    </Box>
                                                                                    {values?.requiredFields[index]?.options?.map((option, optionIndex) => {
                                                                                        return (
                                                                                            <>
                                                                                                <Box sx={{ mb: 5 }}>
                                                                                                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                                                                                        <CardHeader
                                                                                                            title={`Option ${optionIndex + 1}`}
                                                                                                            sx={{ p: 0, mb: 3 }}
                                                                                                            titleTypographyProps={{ fontSize: "0.9rem !important" }}
                                                                                                        />
                                                                                                        {values?.requiredFields[index]?.options.length > 1 &&
                                                                                                            <CustomButton
                                                                                                                type="button"
                                                                                                                fullWidth={false}
                                                                                                                variant="text"
                                                                                                                size="small"
                                                                                                                startIcon={<Icon color='red' fontSize='1.625rem' icon={'mdi:remove-bold'} />}
                                                                                                                onClick={() => optionalFieldArrayHelper.remove(optionIndex)}
                                                                                                            >
                                                                                                                Remove
                                                                                                            </CustomButton>
                                                                                                        }
                                                                                                    </Box>
                                                                                                    <CustomTextField1
                                                                                                        //@ts-ignore
                                                                                                        errorMsg={t(errors.requiredFields && errors.requiredFields[index]?.options ? errors?.requiredFields[index]?.options[optionIndex]?.name : "")}
                                                                                                        fullWidth
                                                                                                        type="text"
                                                                                                        label={t(`Name`)}
                                                                                                        sx={{ mb: 4 }}
                                                                                                        placeholder={t(`Add a name to this option`) as string}
                                                                                                        {...getFieldProps(`requiredFields[${index}].options[${optionIndex}].name`)}
                                                                                                    />
                                                                                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', mt: -4, mb: 4 }} className='demo-space-x'>
                                                                                                        <div>
                                                                                                            <CustomTextField1
                                                                                                                //@ts-ignore
                                                                                                                errorMsg={t(errors.requiredFields && errors.requiredFields[index]?.options ? errors?.requiredFields[index]?.options[optionIndex]?.price : "")}
                                                                                                                fullWidth
                                                                                                                label={t(`Price`)}
                                                                                                                type="number"
                                                                                                                placeholder={t(`Add price`) as string}
                                                                                                                {...getFieldProps(`requiredFields[${index}].options[${optionIndex}].price`)}
                                                                                                            />
                                                                                                        </div>
                                                                                                        <div>
                                                                                                            <CustomTextField1
                                                                                                                //@ts-ignore
                                                                                                                errorMsg={t(errors.requiredFields && errors.requiredFields[index]?.options ? errors?.requiredFields[index]?.options[optionIndex]?.salePrice : "")}
                                                                                                                fullWidth
                                                                                                                type="number"
                                                                                                                label={t(`Sale price`)}
                                                                                                                placeholder={t(`eg: 200, 450, 700 `) as string}
                                                                                                                {...getFieldProps(`requiredFields[${index}].options[${optionIndex}].salePrice`)}
                                                                                                            />
                                                                                                        </div>
                                                                                                    </Box>
                                                                                                </Box>
                                                                                            </>
                                                                                        )
                                                                                    })}
                                                                                </Box>
                                                                            </>
                                                                        )}
                                                                    />
                                                                </Grid>
                                                                <Divider sx={{ my: 8 }} />
                                                            </Grid>
                                                        </>
                                                    )
                                                })
                                            }

                                            {values?.requiredFields?.length < 1 &&
                                                <Alert sx={{ my: 5 }} severity="warning">
                                                    No required field is added
                                                </Alert>
                                            }
                                        </>
                                    )}
                                />

                                {/* <<<<<<<<<<<<<<<<<<<<< OPTIONAL FIELDS >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}
                                <FieldArray
                                    name="optionalFields"
                                    render={(optionalFieldArrayHelper) => (
                                        <>
                                            <Box sx={{ borderRadius: 1, display: "flex", justifyContent: "space-between", mb: 5 }}>
                                                <CardHeader
                                                    title='Optional fields'
                                                    subheader="Add one or more fields to this variation"
                                                    sx={{ p: 0, mb: 3 }}
                                                    titleTypographyProps={{ fontSize: "1.1rem !important" }}
                                                />
                                                <CustomButton
                                                    type="button"
                                                    fullWidth={false}
                                                    variant="text"
                                                    onClick={() => optionalFieldArrayHelper.push(initialOptionalFieldVariationValue)}
                                                    startIcon={<Icon color='red' fontSize='1.625rem' icon={'mdi:add-bold'} />}
                                                >
                                                    Add field
                                                </CustomButton>
                                            </Box>

                                            {values?.optionalFields?.map((variation, index) => {
                                                return (
                                                    <>
                                                        <Grid container>
                                                            <Grid item xs={12} md={5} lg={4}>
                                                                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "start", mb: 5 }}>
                                                                    <CardHeader
                                                                        title={`Variation ${index + 1} (Optional)`}
                                                                        sx={{ p: 0, mb: 3 }}
                                                                        titleTypographyProps={{ fontSize: "1.0rem !important" }}
                                                                    />
                                                                    <CustomButton
                                                                        type="button"
                                                                        fullWidth={false}
                                                                        variant="text"
                                                                        size="small"
                                                                        onClick={() => optionalFieldArrayHelper.remove(index)}
                                                                        endIcon={<Icon color='red' fontSize='1.625rem' icon={'mdi:remove-bold'} />}
                                                                    >
                                                                        Remove
                                                                    </CustomButton>
                                                                </Box>
                                                            </Grid>
                                                            <Grid item xs={12} md={7} lg={8} >
                                                                <CustomTextField1
                                                                    errorMsg={t(errors.optionalFields ? errors?.optionalFields[index]?.title : "")}
                                                                    fullWidth
                                                                    sx={{ mb: 5 }}
                                                                    label={t(`Heading`)}
                                                                    placeholder={t(`Add heading`) as string}
                                                                    {...getFieldProps(`optionalFields[${index}].title`)}
                                                                />
                                                                <CustomTextField1
                                                                    select
                                                                    fullWidth
                                                                    label={t(`Select`)}
                                                                    sx={{ mb: 4, '& .MuiFilledInput-input.MuiSelect-select': { minWidth: '8rem !important' } }}
                                                                    SelectProps={{
                                                                        displayEmpty: true,
                                                                        value: values.optionalFields[index].isMultiple,
                                                                        // onChange: e => console.log((e.target.value) as string)
                                                                        onChange: e => setFieldValue(`optionalFields[${index}].isMultiple`, e.target.value)
                                                                    }}
                                                                >
                                                                    <MenuItem disabled value=''>Select</MenuItem>
                                                                    {/* @ts-ignore */}
                                                                    <MenuItem value={false}>One</MenuItem>
                                                                    {/* @ts-ignore */}
                                                                    <MenuItem value={true}>many</MenuItem>
                                                                </CustomTextField1>

                                                                {values?.optionalFields[index]?.isMultiple &&
                                                                    <CustomTextField1
                                                                        errorMsg={t(errors.optionalFields ? errors?.optionalFields[index]?.limit : "")}
                                                                        fullWidth
                                                                        type="number"
                                                                        label={t(`Limit`)}
                                                                        sx={{ mb: 4 }}
                                                                        placeholder={t(`Add selection limit`) as string}
                                                                        {...getFieldProps(`optionalFields[${index}].limit`)}
                                                                    />
                                                                }

                                                                {/* XXXXXXXXXXXXXXXXXXXXXXXXXXXXX OPTIONS SECTION XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX */}
                                                                <FieldArray
                                                                    name={`optionalFields[${index}].options`}
                                                                    render={(optionFieldArrayHelper) => (
                                                                        <>
                                                                            <Box>
                                                                                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                                                                    <CardHeader
                                                                                        title='Options'
                                                                                        subheader="Add one or more options to this variation"
                                                                                        sx={{ p: 0, mb: 3 }}
                                                                                        titleTypographyProps={{ fontSize: "0.9rem !important" }}
                                                                                    />
                                                                                    <CustomButton
                                                                                        type="button"
                                                                                        fullWidth={false}
                                                                                        variant="text"
                                                                                        size="small"
                                                                                        startIcon={<Icon color='red' fontSize='1.625rem' icon={'mdi:add-bold'} />}
                                                                                        onClick={() => optionFieldArrayHelper.push({ name: "", price: 0, salePrice: 0 })}
                                                                                    >
                                                                                        Add option
                                                                                    </CustomButton>

                                                                                </Box>
                                                                                {values?.optionalFields[index]?.options?.map((option, optionIndex) => {
                                                                                    return (
                                                                                        <>
                                                                                            <Box>
                                                                                                <Box sx={{ borderRadius: 1, display: "flex", justifyContent: "space-between" }}>

                                                                                                    <CardHeader
                                                                                                        title={`Option ${optionIndex + 1}`}
                                                                                                        sx={{ p: 0, mb: 3 }}
                                                                                                        titleTypographyProps={{ fontSize: "0.9rem !important" }}
                                                                                                    />
                                                                                                    {values?.optionalFields[index]?.options.length > 1 &&
                                                                                                        <CustomButton
                                                                                                            type="button"
                                                                                                            fullWidth={false}
                                                                                                            variant="text"
                                                                                                            size="small"
                                                                                                            startIcon={<Icon color='red' fontSize='1.625rem' icon={'mdi:remove-bold'} />}
                                                                                                            onClick={() => optionFieldArrayHelper.remove(optionIndex)}
                                                                                                        >
                                                                                                            Remove
                                                                                                        </CustomButton>
                                                                                                    }
                                                                                                </Box>
                                                                                                <CustomTextField1
                                                                                                    //@ts-ignore
                                                                                                    errorMsg={t(errors.optionalFields && errors.optionalFields[index]?.options ? errors?.optionalFields[index]?.options[optionIndex]?.name : "")}
                                                                                                    fullWidth
                                                                                                    type="text"
                                                                                                    label={t(`Name`)}
                                                                                                    sx={{ mb: 4 }}
                                                                                                    placeholder={t(`Add a name to this option`) as string}
                                                                                                    {...getFieldProps(`optionalFields[${index}].options[${optionIndex}].name`)}
                                                                                                />
                                                                                                <Box sx={{ display: 'flex', flexWrap: 'wrap', mt: -4, mb: 4 }} className='demo-space-x'>
                                                                                                    <div>
                                                                                                        <CustomTextField1
                                                                                                            //@ts-ignore
                                                                                                            errorMsg={t(errors.optionalFields && errors.optionalFields[index]?.options ? errors?.optionalFields[index]?.options[optionIndex]?.price : "")}
                                                                                                            fullWidth
                                                                                                            label={t(`Price`)}
                                                                                                            type="number"
                                                                                                            placeholder={t(`Add price`) as string}
                                                                                                            {...getFieldProps(`optionalFields[${index}].options[${optionIndex}].price`)}
                                                                                                        />
                                                                                                    </div>
                                                                                                    <div>
                                                                                                        <CustomTextField1
                                                                                                            //@ts-ignore
                                                                                                            errorMsg={t(errors.optionalFields && errors.optionalFields[index]?.options ? errors?.optionalFields[index]?.options[optionIndex]?.salePrice : "")}
                                                                                                            fullWidth
                                                                                                            type="number"
                                                                                                            label={t(`Sale price`)}
                                                                                                            placeholder={t(`eg: 200, 450, 700 `) as string}
                                                                                                            {...getFieldProps(`optionalFields[${index}].options[${optionIndex}].salePrice`)}
                                                                                                        />
                                                                                                    </div>
                                                                                                </Box>
                                                                                            </Box>
                                                                                        </>
                                                                                    )
                                                                                })
                                                                                }
                                                                            </Box>
                                                                        </>
                                                                    )}
                                                                />
                                                            </Grid>
                                                        </Grid>

                                                    </>

                                                )
                                            })}

                                            {values?.optionalFields?.length < 1 &&
                                                <Alert sx={{ my: 5 }} severity="warning">
                                                    No optional field is added
                                                </Alert>
                                            }
                                            <Divider sx={{ my: 8 }} />
                                        </>
                                    )}
                                />

                                <Grid container>
                                    <Grid item xs={12} md={5} lg={4}>
                                    </Grid>

                                    <Grid item xs={12} md={7} lg={8} >
                                        < Box sx={{ display: 'flex', flexWrap: 'wrap', mt: -4, mb: 4 }} className='demo-space-x'>
                                            <div>
                                                <CustomTextField1
                                                    // errorMsg={t(errors?.minPrice as string)}
                                                    errorMsg={errors?.minPrice}
                                                    fullWidth
                                                    label={t(`Price`)}
                                                    type="number"
                                                    placeholder={t(`Add price`) as string}
                                                    {...getFieldProps(`minPrice`)}
                                                />
                                            </div>
                                            <div>
                                                <CustomTextField1
                                                    errorMsg={t(errors?.maxPrice as string)}
                                                    fullWidth
                                                    type="number"
                                                    label={t(`Sale price`)}
                                                    placeholder={t(`Add sale price`) as string}
                                                    {...getFieldProps(`maxPrice`)}
                                                />
                                            </div>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Box>
                        }

                        <Grid container>
                            <Grid item xs={12} md={5} lg={4}>
                            </Grid>

                            <Grid item xs={12} md={7} lg={8} >
                                {/* Quantity field  */}
                                <CustomTextField1
                                    errorMsg={t(errors?.quantity as string)}
                                    fullWidth
                                    type="number"
                                    label={t(`Quantity`)}
                                    sx={{ mb: 4 }}
                                    placeholder={t(`Add quantity`) as string}
                                    {...getFieldProps('quantity')}
                                />

                                <CustomTextField1
                                    errorMsg={t(errors?.description as string)}
                                    fullWidth
                                    multiline
                                    rows={3}
                                    label={t(`Description`)}
                                    sx={{ mb: 4 }}
                                    placeholder={t(`Add price`) as string}
                                    {...getFieldProps('description')}
                                />

                                <CardHeader
                                    title='Product image'
                                    subheader="Upload your product images from here"
                                    sx={{ p: 0 }}
                                    titleTypographyProps={{ fontSize: "0.9rem !important" }}
                                />
                                <DropzoneWrapper>
                                    <MultipleImageUploader
                                        data={values.images}
                                        errorMsg={t(errors?.images as string)}
                                        getFile={(val) => setFieldValue("images", val)}
                                        removeAllFile={() => setFieldValue("images", [])}
                                    />
                                </DropzoneWrapper>

                                <FormControlLabel label='Disable Product' sx={{ fontSize: 50 }}
                                    control={
                                        <Checkbox
                                            checked={!values?.isEnabled}
                                            onChange={(e) => setFieldValue("isEnabled", !e.target.checked)}
                                        />
                                    }
                                />

                                <CustomButton
                                    variant='contained'
                                    sx={{ mb: 4, mt: 8 }}
                                    disabled={isLoading}
                                    loading={isLoading}
                                    type='submit'
                                    fullWidth={true}
                                >
                                    {t(`Update Product`)}
                                </CustomButton>
                            </Grid>
                        </Grid>


                    </form>
                )
            }}
        </Formik>
    )
}


export default EditFoodForm;





