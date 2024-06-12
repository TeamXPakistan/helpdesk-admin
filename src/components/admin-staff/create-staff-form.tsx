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
    email: string;
    contact: string;
    role: { label: string; value: string } | null;
    password: string;
    username: string;
    firstName: string;
    lastName: string;
}

const initialValues: FormValues = {
    email: "",
    contact: "",
    role: null,
    password: "",
    username: "",
    firstName: "",
    lastName: "",
}

const CreateStaffForm = () => {

    const { t } = useTranslation(['form'])
    const { mutate: createStaff, isLoading } = useCreateStaffMutation();

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
        createStaff(
            {
                email: values?.email,
                contact: values?.contact,
                role: values?.role?.value,
                password: values?.password,
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
                    sx={{ mb: 5 }}
                    label={t(`User Name`)}
                    {...getFieldProps('username')}
                />
                <CustomTextField1
                    errorMsg={t(errors?.email as string)}
                    fullWidth
                    sx={{ mb: 4 }}
                    label={t(`Email`)}
                    {...getFieldProps('email')}
                />
                <CustomTextField1
                    errorMsg={t(errors?.password as string)}
                    fullWidth
                    sx={{ mb: 4 }}
                    label={t(`Password`)}
                    {...getFieldProps('password')}
                />
                <PhoneNumberField
                    label={t(`form:form-register-phone-label`)}
                    errorMsg={t(errors?.contact as string)}
                    value={values?.contact}
                    placeholder={t(`form:form-register-phone-label`)}
                    onChange={value => setFieldValue('contact', value)}
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
                    {t(`Create`)}
                </CustomButton>
            </form>
        </>)
}


export default CreateStaffForm;