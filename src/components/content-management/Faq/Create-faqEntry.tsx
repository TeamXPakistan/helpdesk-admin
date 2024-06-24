import CustomButton from "@components/common/Button/custom-button";
import CustomTextField1 from "@components/common/text-field/custom-text-field-1";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { useCreateFaqMutation } from "@data/faq-entries/faq-entry-create-mutate";
import { DialogActions, Typography } from "@mui/material";
import { useFaqEntriesQuery } from "@data/faq-entries/faq-entries-query";
import { FaqEntry } from "@utils/constants";
import { Box } from "@mui/system";

type FormValues = {
    title: string;
    description: string;
    type: string
}

const initialValues: FormValues = {
    title: "",
    description: "",
    type: ""
}

const CreateFaqForm = () => {
    const { t } = useTranslation(['form'])
    const { mutate: createFaq, isLoading } = useCreateFaqMutation();

    const { handleSubmit, errors, getFieldProps, setFieldValue, values } = useFormik({
        initialValues,
        // validationSchema: createFaqSchema,
        onSubmit: (values, { resetForm }) => handelCreateFAQ(values, resetForm)
    })

    const handelCreateFAQ = (values: FormValues, resetForm: any) => {
        createFaq(
            {
                title: values?.title,
                description: values?.description,
                type: FaqEntry.FAQ,

            },
            {
                onSuccess: () => {
                    resetForm({ values: '' })
                }
            }
        )
    }

    return (
        
            <form noValidate autoComplete='off' onSubmit={handleSubmit}
            >
                <Box
                    sx={{
                        display: 'flex',
                        textAlign: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        '& svg': { mb: 6, color: 'warning.main' },
                    }}
                >
                    <Box>
                        <CustomTextField1
                            errorMsg={t(errors?.title as string)}
                            fullWidth
                            sx={{
                                mt: "4px"
                            }}
                            label={t(`Question`)}
                            {...getFieldProps('title')}

                        />
                        <CustomTextField1
                            errorMsg={t(errors?.description as string)}
                            fullWidth
                            sx={{
                                mt: "4px"
                            }}
                            label={t(`Answer`)}
                            {...getFieldProps('description')}
                        />
                        <CustomTextField1
                            errorMsg={t(errors?.type as string)}
                            fullWidth
                            label={t(`Type`)}
                            {...getFieldProps('type')}
                        />
                    </Box>
                    <DialogActions>

                        <CustomButton
                            variant='contained'
                            disabled={isLoading}
                            loading={isLoading}
                            type='submit'
                        >
                            {t(`Create`)}
                        </CustomButton>
                    </DialogActions>
                </Box>
            </form>
    )
}

export default CreateFaqForm;
