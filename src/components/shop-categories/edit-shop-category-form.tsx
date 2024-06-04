import CustomButton from "@components/common/Button/custom-button";
import SingleImageUploader from "@components/common/file-uploader/single-image-uploader";
import CustomTextField1 from "@components/common/text-field/custom-text-field-1";
import { useUpdateShopCategoryMutation } from "@data/shop-categories/update-shop-category-mutation";
import { CardHeader } from "@mui/material";
import { ShopCategory } from "@ts-types/generated";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import DropzoneWrapper from "src/@core/styles/libs/react-dropzone";
import * as Yup from 'yup'


type PropTypes = {
    formData: ShopCategory
}

type FormValues = {
    name: string;
    image: string;
}

const EditShopCategoryForm = ({ formData }: PropTypes) => {
    const { t } = useTranslation(['form'])
    const { mutate, isLoading } = useUpdateShopCategoryMutation()

    const initialValues: FormValues = {
        name: formData?.name,
        image: formData?.image,
    }

    const { handleSubmit, errors, getFieldProps, setFieldValue, values } = useFormik({
        initialValues,
        validationSchema: Yup.object().shape({
            name: Yup.string().required('Name is required').min(3, 'Username must be at least 3 characters'),
            image: Yup.string().required('Image is required').min(3, 'Image must be at least 3 characters')
        }),
        onSubmit: (values, { resetForm }) => handelUpdateCategory(values, resetForm)
    })

    const handelUpdateCategory = (values: FormValues, resetForm: any) => {
        mutate({
            ...values,
            _id: formData._id
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
            <CardHeader
                title='Image'
                subheader="Upload category image from here"
                sx={{ p: 0 }}
                titleTypographyProps={{ fontSize: "1rem !important" }}
            />
            <DropzoneWrapper>
                <SingleImageUploader
                    data={values?.image}
                    errorMsg={t(errors.image as string)}
                    getFile={(val) => setFieldValue("image", val)}
                    removeFile={() => setFieldValue("image", "")}
                />
            </DropzoneWrapper>
            <CustomTextField1
                errorMsg={t(errors?.name as string)}
                fullWidth
                sx={{ mt: 5 }}
                label={t(`Name`)}
                placeholder={t(`Full Name`) as string}
                {...getFieldProps('name')}
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
    </>)
}
export default EditShopCategoryForm;