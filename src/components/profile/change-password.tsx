import TabPanel from '@mui/lab/TabPanel'
import Grid from '@mui/material/Grid'
import { UpdatePasswordSchema } from "./update-password-schema"
import { CardActions } from '@mui/material'
import CustomTextField1 from '@components/common/text-field/custom-text-field-1'
import { useFormik } from 'formik'
import { UpdatePasswordMutation } from "@data/auth/update-password-mutation"
import { ResetPasswordInput } from '@ts-types/generated'
import CustomButton from '@components/common/Button/custom-button'
import { useTranslation } from 'react-i18next'

const ChangeProfile = () => {

    const initialValues: ResetPasswordInput = {
        oldPassword: "",
        password: "",
        confirmPassword: "",
    }

    const { mutate, isLoading } = UpdatePasswordMutation()
    const { t } = useTranslation(["form", "common"])
    const { handleSubmit, errors, getFieldProps } = useFormik({
        initialValues,
        validationSchema: UpdatePasswordSchema,
        onSubmit: (values, { resetForm }) => handleChangePassword(values, resetForm)
    })

    const handleChangePassword = (values: ResetPasswordInput) => {
        mutate(values);
    }

    return (
        <>
            <form noValidate autoComplete='off' onSubmit={handleSubmit}>
                <TabPanel sx={{ p: 0 }} value='change-password'>
                    <Grid container spacing={5}>
                        <Grid item xs={12} sm={12}>
                            <CustomTextField1 errorMsg={errors?.oldPassword} {...getFieldProps('oldPassword')} fullWidth label={`${t("form:change-old-password")}`}
                                placeholder='Leonard' />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <CustomTextField1 errorMsg={errors?.password} {...getFieldProps('password')} fullWidth label={`${t("form:reset-password-new-password-label")}`} placeholder='Leonard' />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <CustomTextField1 errorMsg={errors?.confirmPassword} {...getFieldProps('confirmPassword')} fullWidth label={`${t("form:reset-password-confirm-password-label")}`} placeholder='Leonard' />
                        </Grid>
                    </Grid>

                    <CardActions sx={{ mt: 7, mr: -7, display: "flex", justifyContent: "flex-end" }}>
                        <CustomButton
                            variant='contained'
                            disabled={isLoading}
                            loading={isLoading}
                            sx={{ width: "12rem" }}
                            type="submit"
                        >
                            {t("common:save-changes")}
                        </CustomButton>
                    </CardActions>
                </TabPanel>
            </form>
        </>
    )
}

export default ChangeProfile