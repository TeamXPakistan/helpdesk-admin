import CustomButton from "@components/common/Button/custom-button";
import CustomSelect from "@components/common/select/custom-select";
import CustomTextField1 from "@components/common/text-field/custom-text-field-1";
import { useRolesQuery } from "@data/roles/roles-query";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import createStaffSchema from "./create-staff-schema";
import PhoneNumberField from "@components/common/text-field/phone-number-field";
import { useCreateStaffMutation } from "@data/admin-staff/create-staff-mutation";


type FormValues = {
    name: string;
    email: string;
    contact: string;
    dynamicRole: { label: string; value: string } | null
}

const initialValues: FormValues = {
    name: "",
    email: "",
    contact: "",
    dynamicRole: null,
}

const CreateStaffForm = () => {

    const { t } = useTranslation(['form'])
    const { mutate, isLoading } = useCreateStaffMutation()
    const { data: allRoles, isLoading: fetchingRoles } = useRolesQuery({
        limit: 9999,
        page: 1,
    });

    const { handleSubmit, errors, getFieldProps, setFieldValue, values } = useFormik({
        initialValues,
        validationSchema: createStaffSchema,
        onSubmit: (values, { resetForm }) => handelCreateStaff(values, resetForm)
    })

    const handelCreateStaff = (values: FormValues, resetForm: any) => {

        console.log(values)
        mutate(
            {
                name: values?.name,
                contact: values?.contact,
                email: values?.email,
                dynamicRole: values?.dynamicRole?.value
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
                    errorMsg={t(errors?.email as string)}
                    fullWidth
                    sx={{ mb: 4 }}
                    label={t(`form:form-register-email-label`)}
                    placeholder={t(`form:form-register-email-label`) as string}
                    {...getFieldProps('email')}
                />

                <PhoneNumberField
                    label={t(`form:form-register-phone-label`)}
                    errorMsg={t(errors?.contact as string)}
                    value={values?.contact}
                    placeholder={t(`form:form-register-phone-label`)}
                    onChange={value => setFieldValue('contact', value)}
                />

                <CustomSelect
                    name="dynamicRole"
                    list={allRoles?.roles.data.map((role) => ({ label: role.name, value: role._id }))}
                    value={values?.dynamicRole}
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
                    {t(`Create`)}
                </CustomButton>
            </form>
        </>)
}


export default CreateStaffForm;