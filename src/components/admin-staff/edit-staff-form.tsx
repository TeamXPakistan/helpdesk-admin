import CustomButton from "@components/common/Button/custom-button";
import CustomSelect from "@components/common/select/custom-select";
import CustomTextField1 from "@components/common/text-field/custom-text-field-1";
import { useRolesQuery } from "@data/roles/roles-query";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import createStaffSchema from "./create-staff-schema";
import PhoneNumberField from "@components/common/text-field/phone-number-field";
import { User } from "@ts-types/generated";
import { useUpdateStaffMutation } from "@data/admin-staff/update-staff-mutation";


type PropType = {
    formData: User
}

type FormValues = {
    name: string | undefined;
    email: string | undefined;
    contact: string | undefined;
    dynamicRole: { label: string; value: string }
}

const EditStaffForm = ({ formData }: PropType) => {

    const { t } = useTranslation(['form'])
    const { mutate, isLoading } = useUpdateStaffMutation();
    const { data: allRoles, isLoading: fetchingRoles } = useRolesQuery({
        limit: 9999,
        page: 1,
    });

    const initialValues: FormValues = {
        name: formData?.name,
        email: formData?.email,
        contact: formData?.contact,
        dynamicRole: { label: formData?.dynamicRole?.name as string, value: formData?.dynamicRole?._id as string },
    }


    const { handleSubmit, errors, getFieldProps, setFieldValue, values } = useFormik({
        initialValues,
        validationSchema: createStaffSchema,
        onSubmit: (values, { resetForm }) => handelCreateStaff(values, resetForm)
    })

    const handelCreateStaff = (values: FormValues, resetForm: any) => {
        const { name, dynamicRole } = values
        mutate(
            {
                id: formData?._id,
                name: name,
                dynamicRole: dynamicRole?.value
            },
            {
                onSuccess: () => {
                    resetForm({ values: '' })
                }
            }
        )
    }

    return (
        <>
            <form noValidate autoComplete='off' onSubmit={handleSubmit}>
                <CustomTextField1
                    errorMsg={t(errors?.name as string)}
                    fullWidth
                    sx={{ mb: 5 }}
                    label={t(`Name`)}
                    placeholder={t(`Full Name`) as string}
                    {...getFieldProps('name')}
                />
                <CustomTextField1
                    disabled={true}
                    errorMsg={t(errors?.email as string)}
                    fullWidth
                    sx={{ mb: 4, "& .css-cn1auu-MuiInputBase-input-MuiFilledInput-input.Mui-disabled": { background: "white" } }}
                    label={t(`Email (Disabled)`)}
                    placeholder={t(`form:form-register-email-label`) as string}
                    {...getFieldProps('email')}
                />

                <PhoneNumberField
                    disabled={true}
                    label={t(`Phone (Disabled)`)}
                    errorMsg={t(errors?.contact as string)}
                    value={values?.contact as string}
                    placeholder={t(`form:form-register-phone-label`)}
                    onChange={value => setFieldValue('contact', value)}
                />

                <CustomSelect
                    name="dynamicRole"
                    list={allRoles?.roles.data.map((role) => ({ label: role.name, value: role._id }))}
                    value={values?.dynamicRole as FormValues["dynamicRole"]}
                    onChange={(val, { action }) => {
                        if (action === "clear") {
                            setFieldValue("dynamicRole", null)
                        }
                        setFieldValue("dynamicRole", val)
                    }}
                    isMulti={false}
                    label={"Role"}
                    errorMsg={t(errors?.dynamicRole as string)}
                    placeHolder='Select role'
                    isLoading={fetchingRoles}
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


export default EditStaffForm;