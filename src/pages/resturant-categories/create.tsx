import { superAdmin_and_AdminStaff } from "@utils/auth-utils";
import { ReactNode } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { useFormik } from "formik";
import * as Yup from 'yup'
import SingleImageUploader from "@components/common/file-uploader/single-image-uploader";
import { useTranslation } from "react-i18next";
import CustomTextField1 from "@components/common/text-field/custom-text-field-1";
import CustomButton from "@components/common/Button/custom-button";
import DropzoneWrapper from "src/@core/styles/libs/react-dropzone";
import CardHeader from '@mui/material/CardHeader'
import Grid from '@mui/material/Grid'
import AdminLayout from "@layouts/admin-layout";
import { useCreateResturantCategoryMutation } from "@data/resturant-categories/create-resturant-category-mutation";
import { AdminStaffPermissions } from "@utils/constants";


type FormValues = {
    title: string;
    image: string;
}

const initialValues: FormValues = {
    title: "",
    image: "",
}

const CreateResturantCategory = () => {
    const { t } = useTranslation(['form'])
    const { mutate, isLoading } = useCreateResturantCategoryMutation()
    const { handleSubmit, errors, getFieldProps, setFieldValue } = useFormik({
        initialValues,
        validationSchema: Yup.object().shape({
            title: Yup.string().required('Name is required').min(3, 'Name must be at least 3 characters'),
            image: Yup.string().required('Image is required').min(3, 'Image must be at least 3 characters')
        }),
        onSubmit: (values, { resetForm }) => handelCreateCategory(values, resetForm)
    })

    const handelCreateCategory = (values: FormValues, resetForm: any) => {
        mutate(values,
            {
                onSuccess: () => {
                    resetForm({ values: '' })
                }
            }
        )
    }

    return <>
        <Card sx={{ borderRadius: 2, height: "90vh" }}>
            <CardContent >
                <Grid container spacing={6}>

                    <Grid item xs={12} md={5} lg={4}>
                        <CardHeader
                            title='Create Resturant Category'
                            subheader="Create resturant categories for resturants from here"
                            sx={{ p: 0 }}
                            titleTypographyProps={{ fontSize: "1.1rem !important" }}
                        />
                    </Grid>

                    <Grid item xs={12} md={7} lg={8} >
                        <form noValidate autoComplete='off' onSubmit={handleSubmit}>
                            <CardHeader
                                title='Image'
                                subheader="Upload category image from here"
                                sx={{ p: 0 }}
                                titleTypographyProps={{ fontSize: "1rem !important" }}
                            />
                            <DropzoneWrapper>
                                <SingleImageUploader
                                    errorMsg={t(errors.image as string)}
                                    getFile={(val) => setFieldValue("image", val)}
                                    removeFile={() => setFieldValue("image", "")}
                                />
                            </DropzoneWrapper>
                            <CustomTextField1
                                errorMsg={t(errors?.title as string)}
                                fullWidth
                                sx={{ mt: 5 }}
                                label={t(`Name`)}
                                placeholder={t(`Full Name`) as string}
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
                                {t(`Create`)}
                            </CustomButton>
                        </form>
                    </Grid>

                </Grid>
            </CardContent>
        </Card >
    </>
}

CreateResturantCategory.authProps = {
    allowedRoles: superAdmin_and_AdminStaff,
    adminStaffPermissions: [AdminStaffPermissions.RESTURANT_CATEGORIES]
}
CreateResturantCategory.getLayout = (page: ReactNode) => <AdminLayout>{page}</AdminLayout>
export default CreateResturantCategory;