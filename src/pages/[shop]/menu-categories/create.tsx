import StoreOwnerLayout from "@layouts/store-owner-layout";
import { resturantOnly, storeOwnerOnly } from "@utils/auth-utils";
import { ReactNode } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { useFormik } from "formik";
import * as Yup from 'yup'
import { useTranslation } from "react-i18next";
import CustomTextField1 from "@components/common/text-field/custom-text-field-1";
import CustomButton from "@components/common/Button/custom-button";
import CardHeader from '@mui/material/CardHeader'
import Grid from '@mui/material/Grid'
import { useCreateMenuCategoryMutation } from "@data/menu-categories/create-menu-category-mutation";


type FormValues = {
    title: string;
}

const initialValues: FormValues = {
    title: "",
}

const CreateMenuCategory = () => {
    const { t } = useTranslation(['form'])
    const { mutate, isLoading } = useCreateMenuCategoryMutation()
    const { handleSubmit, errors, getFieldProps } = useFormik({
        initialValues,
        validationSchema: Yup.object().shape({
            title: Yup.string().required('Category is required').min(3, 'Name must be at least 3 characters'),
        }),
        onSubmit: (values, { resetForm }) => handelCreateCategory(values, resetForm)
    })

    const handelCreateCategory = (values: FormValues, resetForm: any) => {
        console.log(values)
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
                            title={t('common:nav-store-owner-text-create-menu-category')}
                            subheader={t("common:create-menu-sub-heading")}
                            sx={{ p: 0 }}
                            titleTypographyProps={{ fontSize: "1.1rem !important" }}
                        />
                    </Grid>

                    <Grid item xs={12} md={7} lg={8} >
                        <form noValidate autoComplete='off' onSubmit={handleSubmit}>
                            <CustomTextField1
                                errorMsg={t(errors?.title as string)}
                                fullWidth
                                label={t(`common:category`)}
                                placeholder={t(`common:category-name`) as string}
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

CreateMenuCategory.authProps = {
    allowedRoles: storeOwnerOnly,
    allowedShops: resturantOnly
}
CreateMenuCategory.getLayout = (page: ReactNode) => <StoreOwnerLayout>{page}</StoreOwnerLayout>
export default CreateMenuCategory;