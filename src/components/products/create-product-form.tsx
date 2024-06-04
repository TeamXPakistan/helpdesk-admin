import CustomButton from "@components/common/Button/custom-button";
import CustomSelect from "@components/common/select/custom-select";
import CustomTextField1 from "@components/common/text-field/custom-text-field-1";
import { useShopCategoriesQuery } from "@data/shop-categories/shop-categories-query";
import { useSubCategoriesByShopQuery } from "@data/sub-categories/sub-categories-by-shopID-query";
import { useAuthCredentials } from "@store/apps/auth";
import { ShopCategory, SubCategory } from "@ts-types/generated";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import simpleProductSchema from "./create-product-form-schema";
import { useEffect, useState } from "react";
import { Box, CardHeader, Grid } from "@mui/material";
import DropzoneWrapper from "src/@core/styles/libs/react-dropzone";
import MultipleImageUploader from "@components/common/file-uploader/multiple-image-uploader";
import { useCreateProductMutation } from "@data/products/create-product-mutation";

type FormValues = {
    name: string;
    category: { label: string; value: string } | undefined | null;
    subCategory: { label: string; value: string } | undefined | null;
    price: number | null;
    salePrice: number | null;
    quantity: number | null;
    description: string;
    images: string[];
}

const initialValues: FormValues = {
    name: "",
    category: null,
    subCategory: null,
    price: 0,
    salePrice: 0,
    quantity: 0,
    description: "",
    images: []
}

const CreateProductForm = () => {
    const [filteredSubCategories, setFilteredSubCategories] = useState<SubCategory[] | [] | undefined>([]);
    const { t } = useTranslation(['form'])
    const { authValues } = useAuthCredentials()
    const { mutate, isLoading } = useCreateProductMutation()
    // fetching Shop Categories 
    const { data: categories, isLoading: fetchingCategories } = useShopCategoriesQuery({
        limit: 99999,
        page: 1,
        shopId: authValues.user?.shop?._id
    });
    // fetching Shop Sub Categories 
    const { data: subCategories } = useSubCategoriesByShopQuery({
        limit: 99999,
        page: 1,
        shopId: authValues.user?.shop?._id
    });

    const { handleSubmit, errors, getFieldProps, setFieldValue, values } = useFormik({
        initialValues,
        validationSchema: simpleProductSchema,
        onSubmit: (values, { resetForm }) => createProduct(values, resetForm)
    })

    const createProduct = (values: FormValues, resetForm: any) => {
        const productValues = {
            ...values,
            category: values.category?.value,
            subCategory: values.subCategory?.value
        }

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
        const res = subCategories?.subCategories.data.filter((subCategory: SubCategory) => {
            if (subCategory.categoryId._id === values.category?.value) {
                return { label: subCategory.title, value: subCategory._id }
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
                        list={categories?.categories.data.map((category: ShopCategory) => ({ label: category.name, value: category._id }))}
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
                        isLoading={fetchingCategories}
                    />

                    {/* Sub Category */}
                    <CustomSelect
                        name="subCategory"
                        list={filteredSubCategories?.map((category: SubCategory) => ({ label: category.title, value: category._id }))}
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
                        isLoading={fetchingCategories}
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
                        />
                    </DropzoneWrapper>

                    <CustomButton
                        variant='contained'
                        sx={{ mb: 4, mt: 8 }}
                        disabled={isLoading}
                        loading={isLoading}
                        type='submit'
                        fullWidth={true}
                    >
                        {t(`Create`)}
                    </CustomButton>
                </Grid>
            </Grid>

        </form >
    </>)
}


export default CreateProductForm;