import { useFormik } from "formik"
import { Box } from "@mui/system"
import Grid from '@mui/material/Grid'
import TabPanel from '@mui/lab/TabPanel'
import { useAuthCredentials } from '@store/apps/auth'
import CardActions from '@mui/material/CardActions'
import { UpdateProifileSchema } from "./edit-profile-schema"
import { useTranslation } from "react-i18next"
import CustomTextField1 from '@components/common/text-field/custom-text-field-1'
import CustomButton from '@components/common/Button/custom-button'
import { EditProfileMutation } from "@data/auth/edit-profile-mutation"
import DropzoneWrapper from "src/@core/styles/libs/react-dropzone"
import { CardHeader } from "@mui/material"
import SingleImageUploader from "@components/common/file-uploader/single-image-uploader"

type FormValues = {
    name: string | undefined;
    profileImage: string | undefined;
}

const EditProfile = () => {

    const { t } = useTranslation(['form', "common"])

    const { authValues, setCredentials } = useAuthCredentials()

    const { mutate, isLoading } = EditProfileMutation()

    const initialValues: FormValues = {
        name: authValues.user?.name,
        profileImage: authValues.user?.profileImage,
    }

    const { handleSubmit, errors, getFieldProps, setFieldValue } = useFormik({
        initialValues,
        validationSchema: UpdateProifileSchema,
        onSubmit: (values) => handelEditProfile(values)
    })

    const handelEditProfile = (values: FormValues) => {
        mutate(values,
            {
                onSuccess: ({ data }) => {
                    setCredentials({ user: { ...authValues.user, name: data.name, contact: data.contact, email: data.email, profileImage: data.profileImage }, role: data.role, token: authValues.token })
                },
            }
        )
    }

    return (
        <form noValidate autoComplete='off' onSubmit={handleSubmit}>
            <TabPanel sx={{ p: 0 }} value='edit-profile'>

                <CardHeader
                    title={`${t('common:profile-image')}`}
                    subheader={`${t("common:profile-image-sub-heading")}`}
                    sx={{ p: 0 }}
                    titleTypographyProps={{ fontSize: "0.9rem !important" }}
                />

                <DropzoneWrapper>
                    <SingleImageUploader
                        errorMsg={t(errors.profileImage as string)}
                        getFile={(val) => setFieldValue("profileImage", val)}
                        removeFile={() => setFieldValue("profileImage", "")}
                        data={initialValues?.profileImage}
                    />
                </DropzoneWrapper>

                <Grid container spacing={5}>
                    <Grid item xs={12} sm={12} mt={6}>
                        <CustomTextField1
                            fullWidth
                            errorMsg={errors?.name}
                            label={`${t("common:Name")}`}
                            {...getFieldProps('name')}
                        />
                    </Grid>
                </Grid>

                <CardActions sx={{ mt: 7, mr: -7, display: "flex", justifyContent: "flex-end" }}>
                    <Box sx={{ width: "10rem" }} >
                        <CustomButton
                            variant='contained'
                            disabled={isLoading}
                            loading={isLoading}
                            type="submit"
                        >
                            {t("common:save-changes")}
                        </CustomButton>
                    </Box>
                </CardActions>
            </TabPanel>
        </form>
    )
}

export default EditProfile