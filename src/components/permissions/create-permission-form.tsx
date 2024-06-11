import CustomButton from "@components/common/Button/custom-button";
import CustomTextField1 from "@components/common/text-field/custom-text-field-1";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import * as Yup from 'yup'
import DialogActions from '@mui/material/DialogActions'
import { Box } from "@mui/system";
import { useCreateRoleMutation } from "@data/roles/create-role-mutation";

type propTypes = {
    closeModal: () => void
}

type FormValues = {
    name: string;
    permissions: { label: string; value: string }[] | null
}

const initialValues: FormValues = {
    name: "",
    permissions: null,
}

const CreatePermissionForm = ({ closeModal }: propTypes) => {

    const { t } = useTranslation(['form'])
    const { mutate, isLoading } = useCreateRoleMutation()


    const { handleSubmit, errors, getFieldProps, setFieldValue, values } = useFormik({
        initialValues,
        validationSchema: Yup.object().shape({
            name: Yup.string().required('Name is required').min(3, 'Name must be at least 3 characters'),
            permissions: Yup.array().min(1, ' Must have at least 1 item').of(
                Yup.object().shape({
                    value: Yup.string(),
                    label: Yup.string(),
                }).required("required")
            )
        }),
        onSubmit: (values, { resetForm }) => handelCreateRole(values, resetForm)
    })

    const handelCreateRole = (values: FormValues, resetForm: any) => {
        mutate({
            name: values.name,
            permissions: values.permissions?.map(permission => permission.value)
        },
            {
                onSuccess: () => {
                    resetForm({ values: '' })
                    closeModal();
                }
            }
        )
    }

    return (<>
        <form noValidate autoComplete='off' onSubmit={handleSubmit}>
            <Box sx={{ minHeight: "60vh", width: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <Box>
                    <CustomTextField1
                        errorMsg={t(errors?.name as string)}
                        fullWidth
                        sx={{ mb: 5 }}
                        label={t(`Name`)}
                        placeholder={t(`Full Name`) as string}
                        {...getFieldProps('name')}
                    />

                </Box>
                <DialogActions >
                    <CustomButton
                        fullWidth={true}
                        variant='contained'
                        disabled={isLoading}
                        loading={isLoading}
                        type='submit'
                    >
                        {t(`Create`)}
                    </CustomButton>

                    <CustomButton
                        fullWidth={true}
                        type="button"
                        variant='outlined'
                        onClick={closeModal}
                    >
                        Cancel
                    </CustomButton>
                </DialogActions>
            </Box>
        </form>
    </>)
}


export default CreatePermissionForm;