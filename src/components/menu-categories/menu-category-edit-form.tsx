import CustomButton from "@components/common/Button/custom-button"
import CustomTextField1 from "@components/common/text-field/custom-text-field-1"
import { useUpdateMenuCategoryMutation } from "@data/menu-categories/update-menu-category-mutation"
import { MenuCategory } from "@ts-types/generated"
import { useFormik } from "formik"
import { useTranslation } from "react-i18next"
import * as Yup from 'yup'


type PropTypes = {
    formData: MenuCategory
}

type FormValues = {
    title: string;
}

const MenuCategoryEditForm = ({ formData }: PropTypes) => {
    const { t } = useTranslation(['form'])
    const { mutate, isLoading } = useUpdateMenuCategoryMutation()
    const { handleSubmit, errors, getFieldProps } = useFormik({
        initialValues: {
            title: formData.title,
        },
        validationSchema: Yup.object().shape({
            title: Yup.string().required('Category is required').min(3, 'Name must be at least 3 characters'),
        }),
        onSubmit: (values, { resetForm }) => handelCreateCategory(values, resetForm)
    })

    const handelCreateCategory = (values: FormValues, resetForm: any) => {
        mutate({
            title: values?.title,
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
        <form noValidate autoComplete='off' onSubmit={handleSubmit}>
            <CustomTextField1
                errorMsg={t(errors?.title as string)}
                fullWidth
                label={t(`Category`)}
                placeholder={t(`category-name`) as string}
                {...getFieldProps('title')}
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
    )
}

export default MenuCategoryEditForm