import CustomButton from "@components/common/Button/custom-button";
import CustomTextField1 from "@components/common/text-field/custom-text-field-1";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import * as Yup from 'yup'
import DialogActions from '@mui/material/DialogActions'
import { Box } from "@mui/system";
import CustomSelect from "@components/common/select/custom-select";
import { RouteActions, permissionModuleList } from "@utils/constants";
import { mapRouteActionToLabel } from "@utils/helper-functions";
import { Permission } from "@ts-types/generated";
import { useUpdatePermissionMutation } from "@data/permissions/update-permission-mutation";

type propTypes = {
    closeModal: () => void,
    formData: Permission
}

type FormValues = {
    id: string | undefined,
    name: string;
    moduleName: { label: string; value: string } | null;
    actions: { label: string; value: string }[] | null
}

const EditPermissionForm = ({ closeModal, formData }: propTypes) => {

    const { t } = useTranslation(['form'])
    const { mutate: updatedPermission, isLoading } = useUpdatePermissionMutation();

    const initialValues: FormValues = {
        id: formData?.id,
        name: formData?.name,
        moduleName: { label: formData?.moduleName, value: formData?.moduleName },
        actions: formData?.actions?.map((val) => ({ label: mapRouteActionToLabel(val), value: val }))
    }

    const { handleSubmit, errors, getFieldProps, setFieldValue, values } = useFormik({
        initialValues,
        validationSchema: Yup.object().shape({
            name: Yup.string().required('Name is required').min(3, 'Name must be at least 3 characters'),
            moduleName: Yup.object().shape({
                label: Yup.string().required("Module Name is required"),
                value: Yup.string().required("Module Name is required")
            }).required("Module Name is required"),
            actions: Yup.array().of(
                Yup.object().shape({
                    label: Yup.string().required("Permission is required"),
                    value: Yup.string().required("Permission is required")
                })
            ).required("Permission is required")

        }),
        onSubmit: (values, { resetForm }) => handelUpdatePermission(values, resetForm)
    })

    const handelUpdatePermission = (values: FormValues, resetForm: any) => {

        updatedPermission({
            id: values?.id,
            name: values?.name,
            moduleName: values?.moduleName?.value,
            actions: values?.actions?.map(val => val.value)
        },
            {
                onSuccess: () => {
                    resetForm({ values: '' })
                    closeModal();
                }
            }
        )
    }

    return (
        <>
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
                            name="moduleName"
                            list={permissionModuleList?.map((val) => ({ label: val, value: val }))}
                            value={values?.moduleName}
                            //@ts-ignore
                            onChange={(val, { action }) => {
                                if (action === "clear") {
                                    setFieldValue("moduleName", null)
                                }
                                setFieldValue("moduleName", val)
                            }}
                            isMulti={false}
                            label={"Select Module"}
                            errorMsg={t(errors?.moduleName as string)}
                            placeHolder='Select Module'
                        />
                        <CustomSelect
                            name="actions"
                            list={Object.values(RouteActions)?.map((val) => ({
                                label: mapRouteActionToLabel(val),
                                value: val
                            }))}
                            value={values?.actions}
                            //@ts-ignore
                            onChange={(val, { action }) => {
                                if (action === "clear") {
                                    setFieldValue("actions", null)
                                }
                                setFieldValue("actions", val)
                            }}
                            isMulti={true}
                            label={"Select Permissions"}
                            errorMsg={t(errors?.actions as string)}
                            placeHolder='Select Permissions'
                        />

                    </Box>
                    <DialogActions>
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


export default EditPermissionForm;
