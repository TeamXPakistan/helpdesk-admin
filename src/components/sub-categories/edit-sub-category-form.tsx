import CustomButton from "@components/common/Button/custom-button";
import CustomSelect from "@components/common/select/custom-select";
import CustomTextField1 from "@components/common/text-field/custom-text-field-1";
import { useEditSubCategoryMutation } from "@data/sub-categories/edit-sub-category-mutation";
import { SubCategory } from "@ts-types/generated";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import * as Yup from 'yup'

type PropTypes = {
    formData: SubCategory,
    shopCategories: { label: string, value: string }[] | undefined
}

type FormValues = {
    title: string;
    category: { label: string; value: string } | undefined
}

const EditSubCategoryForm = ({ formData, shopCategories }: PropTypes) => {
    const { t } = useTranslation(['form'])
    const { mutate, isLoading } = useEditSubCategoryMutation()

    const initialValues: FormValues = {
        title: formData.title,
        category: shopCategories?.find((category) => category.value === formData.categoryId._id),
    }

    const { handleSubmit, errors, getFieldProps, setFieldValue, values } = useFormik({
        initialValues,
        validationSchema: Yup.object().shape({
            title: Yup.string().required('Name is required').min(3, 'Username must be at least 3 characters'),
            category: Yup.object().shape({
                label: Yup.string(),
                value: Yup.string(),
            }).required("Parent category is required")
        }),
        onSubmit: (values, { resetForm }) => handelEditCategory(values, resetForm)
    })

    const handelEditCategory = (values: FormValues, resetForm: any) => {
        console.log(values)
        mutate({
            title: values.title,
            categoryId: values.category?.value,
            _id: formData._id
        },
            {
                onSuccess: () => {
                    resetForm({ values: '' })

                }
            }
        )
    }

    return (
        <>
            <form noValidate autoComplete='off' onSubmit={handleSubmit}>
                <CustomTextField1
                    errorMsg={t(errors?.title as string)}
                    fullWidth
                    sx={{ mb: 5 }}
                    label={t(`Name`)}
                    placeholder={t(`Full Name`) as string}
                    {...getFieldProps('title')}
                />
                <CustomSelect
                    name="category"
                    list={shopCategories}
                    value={values?.category}
                    //@ts-ignore
                    onChange={(val, { action }) => {
                        if (action === "clear") {
                            setFieldValue("category", null)
                        }
                        setFieldValue("category", val)
                    }}
                    isMulti={false}
                    label={"Parent category"}
                    errorMsg={t(errors?.category as string)}
                    placeHolder='Select parent category'
                />

                <CustomButton
                    variant='contained'
                    sx={{ mb: 4, mt: 8 }}
                    disabled={isLoading}
                    loading={isLoading}
                    type='submit'
                    fullWidth={true}
                >
                    {t(`Update`)}
                </CustomButton>
            </form>
        </>
    )
}


export default EditSubCategoryForm;