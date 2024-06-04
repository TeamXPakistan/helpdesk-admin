import CustomButton from "@components/common/Button/custom-button";
import CustomSelect from "@components/common/select/custom-select";
import CustomTextField1 from "@components/common/text-field/custom-text-field-1";
import { useShopCategoriesQuery } from "@data/shop-categories/shop-categories-query";
import { useCreateSubCategoryMutation } from "@data/sub-categories/create-sub-category-mutation";
import { useAuthCredentials } from "@store/apps/auth";
import { ShopCategory } from "@ts-types/generated";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import * as Yup from 'yup'


type FormValues = {
    title: string;
    category: { label: string; value: string } | null
}

const initialValues: FormValues = {
    title: "",
    category: null,
}

const CreateSubCategoryForm = () => {

    const { t } = useTranslation(['form'])
    const { authValues } = useAuthCredentials()
    const { mutate, isLoading } = useCreateSubCategoryMutation()
    const { data: categories, isLoading: fetchingCategories } = useShopCategoriesQuery({
        limit: 9999,
        page: 1,
        shopId: authValues.user?.shop?._id
    });

    const { handleSubmit, errors, getFieldProps, setFieldValue, values } = useFormik({
        initialValues,
        validationSchema: Yup.object().shape({
            title: Yup.string().required('Name is required').min(3, 'Username must be at least 3 characters'),
            category: Yup.object().shape({
                label: Yup.string(),
                value: Yup.string(),
            }).required("Parent category is required")
        }),
        onSubmit: (values, { resetForm }) => handelCreateCategory(values, resetForm)
    })

    const handelCreateCategory = (values: FormValues, resetForm: any) => {

        console.log(values)
        mutate({
            title: values.title,
            categoryId: values.category?.value,
            shopId: authValues.user?.shop?._id
        },
            {
                onSuccess: () => {
                    resetForm({ values: '' })

                }
            }
        )
    }

    return (<>
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
                list={categories?.categories.data.map((category: ShopCategory) => ({ label: category.name, value: category._id }))}
                value={values?.category}
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
                isLoading={fetchingCategories}
            />
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
        </form>
    </>)
}


export default CreateSubCategoryForm;