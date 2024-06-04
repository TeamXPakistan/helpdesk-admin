import CustomButton from "@components/common/Button/custom-button";
import CustomSelect from "@components/common/select/custom-select";
import CustomTextField1 from "@components/common/text-field/custom-text-field-1";
import { Maybe, Product } from "@ts-types/generated";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { simpleProductEditSchema } from "./create-product-form-schema";
import { useEffect, useState } from "react";
import { Box, CardHeader, Checkbox, FormControlLabel, Grid } from "@mui/material";
import DropzoneWrapper from "src/@core/styles/libs/react-dropzone";
import MultipleImageUploader from "@components/common/file-uploader/multiple-image-uploader";
import { useUpdateProductMutation } from "@data/products/update-product-mutation";


type PropTypes = {
    formData: Product,
    shopCategories: { label: string, value: string }[] | undefined
    subCategories: { label: string, value: string, categoryId: string }[] | undefined
}

type FormValues = {
    name: string;
    category: Maybe<{ label: string; value: string }>;
    subCategory: { label: string; value: string } | undefined | null;
    price: Maybe<number>;
    salePrice: Maybe<number>;
    quantity: Maybe<number>;
    description: Maybe<string>;
    images: string[];
    isEnabled: boolean;
}


const EditProductForm = ({ formData, shopCategories, subCategories }: PropTypes) => {
    const [filteredSubCategories, setFilteredSubCategories] = useState<{ label: string, value: string }[] | [] | undefined>([]);
    const { t } = useTranslation(['form'])
    const { mutate, isLoading } = useUpdateProductMutation()

    const initialValues: FormValues = {
        ...formData,
        category: shopCategories?.find((category) => category.value === formData.category),
        subCategory: subCategories?.find((subCategory) => subCategory.value === formData.subCategory),
    }

    const { handleSubmit, errors, getFieldProps, setFieldValue, values } = useFormik({
        initialValues,
        validationSchema: simpleProductEditSchema,
        onSubmit: (values, { resetForm }) => updateProduct(values, resetForm)
    })

    const updateProduct = (values: FormValues, resetForm: any) => {
        const productValues = {
            ...values,
            category: values.category?.value,
            subCategory: values.subCategory?.value,
            _id: formData?._id
        }
        console.log(productValues)

        mutate(productValues,
            {
                onSuccess: () => {
                    resetForm({ values: '' })

                }
            }
        )
    }

    // changing sub category dropdown values
    useEffect(() => {
        const res = subCategories?.filter((subCategory: { label: string; value: string, categoryId: string }) => {
            if (subCategory.categoryId === values.category?.value) {
                return subCategory;
            }
        })
        setFilteredSubCategories(res)
    }, [values.category?.value])


    return (<>
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
                        name="category"
                        list={shopCategories}
                        value={values?.category}
                        //@ts-ignore
                        onChange={(val, { action }) => {
                            if (action === "clear") {
                                setFieldValue("category", null)
                                setFieldValue("subCategory", null)
                            }
                            setFieldValue("category", val)
                        }}
                        isMulti={false}
                        label={"Category"}
                        errorMsg={t(errors?.category as string)}
                        placeHolder='Select category'
                    />

                    {/* Sub Category */}
                    <CustomSelect
                        name="subCategory"
                        list={filteredSubCategories}
                        value={values?.subCategory}
                        //@ts-ignore
                        onChange={(val, { action }) => {
                            if (action === "clear") {
                                setFieldValue("subCategory", null)
                            }
                            setFieldValue("subCategory", val)
                        }}
                        isMulti={false}
                        label={"Sub Category"}
                        errorMsg={t(errors?.subCategory as string)}
                        placeHolder='Select sub category'
                    />

                    {/* Price  */}
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


                    {/* Quantity */}
                    <CustomTextField1
                        errorMsg={t(errors?.quantity as string)}
                        fullWidth
                        type="number"
                        sx={{ mb: 5 }}
                        label={t(`Quantity`)}
                        placeholder={t(`eg: 200, 450, 700 `) as string}
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
                            errorMsg={t(errors?.images as string)}
                            getFile={(val) => setFieldValue("images", val)}
                            removeAllFile={() => setFieldValue("images", [])}
                            data={formData?.images}
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
                        {t(`Edit Product`)}
                    </CustomButton>
                </Grid>
            </Grid>

        </form >
    </>)
}


export default EditProductForm;