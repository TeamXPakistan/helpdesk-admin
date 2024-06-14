import CustomButton from "@components/common/Button/custom-button";
import CustomSelect from "@components/common/select/custom-select";
import CustomTextField1 from "@components/common/text-field/custom-text-field-1";
import { useRolesQuery } from "@data/roles/roles-query";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import PhoneNumberField from "@components/common/text-field/phone-number-field";
import { User } from "@ts-types/generated";
import { useUpdateStaffMutation } from "@data/admin-staff/update-staff-mutation";
import updateStaffSchema from "./update-staff-schema";

type PropType = {
    formData: User
}

type FormValues = {
    email: string | undefined;
    phone: string | null | undefined;
    role: { label: string; value: string } | null;
    username: string | undefined;
    firstName: string | undefined;
    lastName: string | undefined;
}

const EditStaffForm = ({ formData }: PropType) => {
    const { t } = useTranslation(['form'])
    const { mutate: updateStaff, isLoading } = useUpdateStaffMutation();

    const { data: allRoles, isLoading: fetchingRoles } = useRolesQuery({
        limit: 9999,
        page: 1,
    });

    const initialValues: FormValues = {
        email: formData?.email,
        phone: formData?.phone,
        role: { label: formData?.role?.name as string, value: formData?.role?.id as string },
        username: formData?.username,
        firstName: formData?.firstName,
        lastName: formData?.lastName,
    }

    const { handleSubmit, errors, getFieldProps, setFieldValue, values } = useFormik({
        initialValues,
        enableReinitialize: true,
        validationSchema: updateStaffSchema,
        onSubmit: (values, { resetForm }) => handelUpdateStaff(values, resetForm)
    })

    const handelUpdateStaff = (values: FormValues, resetForm: any) => {
        updateStaff(
            {
                id: formData?.id,
                email: values?.email,
                phone: values?.phone,
                roleId: values?.role?.value,
                username: values?.username,
                firstName: values?.firstName,
                lastName: values?.lastName,
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
                    errorMsg={t(errors?.firstName as string)}
                    fullWidth
                    sx={{ mb: 5 }}
                    label={t(`First Name`)}
                    {...getFieldProps('firstName')}
                />
                <CustomTextField1
                    errorMsg={t(errors?.lastName as string)}
                    fullWidth
                    sx={{ mb: 5 }}
                    label={t(`Last Name`)}
                    {...getFieldProps('lastName')}
                />
                <CustomTextField1
                    errorMsg={t(errors?.username as string)}
                    fullWidth
                    disabled
                    sx={{ mb: 5 }}
                    label={t(`User Name`)}
                    {...getFieldProps('username')}
                />
                <CustomTextField1
                    errorMsg={t(errors?.email as string)}
                    fullWidth
                    disabled
                    sx={{ mb: 4 }}
                    label={t(`Email`)}
                    {...getFieldProps('email')}
                />
                <PhoneNumberField
                    label={t(`form:form-register-phone-label`)}
                    errorMsg={t(errors?.phone as string)}
                    value={values?.phone}
                    placeholder={t(`form:form-register-phone-label`)}
                    onChange={value => setFieldValue('phone', value)}
                />

                <CustomSelect
                    name="role"
                    list={allRoles?.roles.data.map((role) => ({ label: role.name, value: role.id }))}
                    value={values?.role}
                    //@ts-ignore
                    onChange={(val, { action }) => {
                        if (action === "clear") {
                            setFieldValue("role", null)
                        }
                        setFieldValue("role", val)
                    }}
                    isMulti={false}
                    label={"Role"}
                    errorMsg={t(errors?.role as string)}
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
