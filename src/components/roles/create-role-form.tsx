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

const CreateRoleForm = ({ closeModal }: propTypes) => {

    const { t } = useTranslation(['form']);
    const { mutate: createRole, isLoading } = useCreateRoleMutation();

    const { data: permissions, isLoading: fetchingPermissions, error: permissionsError } = usePermissionsQuery({
        limit: 9999,
        page: 1,
    });

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
        createRole({
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

    if (fetchingPermissions) return <Spinner />
    if (permissionsError) return <CustomError errorMsg={permissionsError.message} />

    return (<>
        <form noValidate autoComplete='off' onSubmit={handleSubmit}>
            <Box sx={{ minHeight: "50vh", width: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
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
                        list={permissions?.permissions?.data.map((permission) => ({ label: permission.name, value: permission.id }))}
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


export default CreateRoleForm;