import CustomButton from "@components/common/Button/custom-button";
import CustomSelect from "@components/common/select/custom-select";
import CustomTextField1 from "@components/common/text-field/custom-text-field-1";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import * as Yup from 'yup'
import DialogActions from '@mui/material/DialogActions'
import { usePermissionsQuery } from "@data/permissions/permissions-query";
import Spinner from "@components/common/spinner/spinner";
import CustomError from "@components/common/error/custom-error";
import { Box } from "@mui/system";
import { Role } from "@ts-types/generated";
import { useUpdateRoleMutation } from "@data/roles/edit-role-mutation";

type propTypes = {
    closeModal: () => void
    formData: Role
}

type FormValues = {
    name: string;
    permissions: { label: string; value: string }[] | null
}

const EditRoleForm = ({ closeModal, formData }: propTypes) => {
    const { t } = useTranslation(['form'])
    const { mutate: updatedRole, isLoading } = useUpdateRoleMutation()

    const { data: permissions, isLoading: fetchingPermissions, error: permissionsError } = usePermissionsQuery({
        limit: 9999,
        page: 1,
    });

    const initialValues: FormValues = {
        name: formData?.name,
        permissions: formData?.roles?.map((val) => ({ label: val?.permission?.name, value: val?.permission?.id }))
    }

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
        updatedRole({
            id: formData.id,
            name: values.name,
            isEnabled: true,
            permissions: values.permissions?.map(permission => permission?.value)
        },
            {
                onSuccess: () => {
                    resetForm({ values: '' })
                    closeModal();
                }
            }
        )
    }

    if (fetchingPermissions) return <Spinner />
    if (permissionsError) return <CustomError errorMsg={permissionsError.message} />

    return (
        <>
            <form noValidate autoComplete='off' onSubmit={handleSubmit}>
                <Box sx={{ minHeight: "300px", width: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <Box>
                        <CustomTextField1
                            errorMsg={t(errors?.name as string)}
                            fullWidth
                            sx={{ mb: 5 }}
                            label={t(`Name`)}
                            {...getFieldProps('name')}
                        />

                        <CustomSelect
                            name="permissions"
                            list={permissions?.permissions?.data.map((permission) => ({ label: permission?.name, value: permission?.id }))}
                            value={values?.permissions}
                            //@ts-ignore
                            onChange={(val, { action }) => {
                                if (action === "clear") {
                                    setFieldValue("permissions", [])
                                }
                                setFieldValue("permissions", val)
                            }}
                            isMulti={true}
                            label={"Permissions"}
                            errorMsg={t(errors.permissions as string)}
                            placeHolder='Select Permissions'
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
                            {t(`Update`)}
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
        </>
    )
}


export default EditRoleForm;