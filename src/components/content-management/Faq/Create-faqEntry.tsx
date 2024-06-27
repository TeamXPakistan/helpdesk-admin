import CustomButton from "@components/common/Button/custom-button";
import CustomTextField1 from "@components/common/text-field/custom-text-field-1";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { useCreateFaqMutation } from "@data/faq-entries/faq-entry-create-mutate";
import { DialogActions } from "@mui/material";
import { FaqEntry } from "@utils/constants";
import { Box } from "@mui/system";
import createFaqSchema from "./create-schema";

type FormValues = {
    title: string;
    description: string;
    type: string;
};

type propTypes = {
    closeModal: () => void;
};


const initialValues: FormValues = {
    title: "",
    description: "",
    type: "",
};

const CreateFaqForm = ({ closeModal }: propTypes) => {
    const { t } = useTranslation(["form"]);
    const { mutate: createFaq, isLoading } = useCreateFaqMutation();

    const { handleSubmit, errors, getFieldProps } = useFormik({
        initialValues,
        enableReinitialize: true,
        validationSchema: createFaqSchema,
        onSubmit: (values, { resetForm }) => handelCreateFAQ(values, resetForm),
    });

    const handelCreateFAQ = (values: FormValues, resetForm: any) => {
        createFaq(
            {
                title: values?.title,
                description: values?.description,
                type: FaqEntry.FAQ,
            },
            {
                onSuccess: () => {
                    resetForm({ values: "" });
                    closeModal();
                },
            }
        );
    };

    return (
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <Box
                sx={{
                    display: "flex",
                    textAlign: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    justifyContent: "center",
                    "& svg": { mb: 6, color: "warning.main" },
                }}
            >
                
                <Box>
                    <CustomTextField1
                        errorMsg={t(errors?.title as string)}
                        fullWidth
                        multiline
                        rows={2}
                        sx={{
                            mb: 5,
                        }}
                        label={t(`Question`)}
                        placeholder={t(`Question`) as string}

                        {...getFieldProps("title")}
                    />

                    <CustomTextField1
                        errorMsg={t(errors?.description as string)}
                        fullWidth
                        multiline
                        rows={4}
                        sx={{ mb: 4 }}
                        label={t(`Description`)}
                        placeholder={t(`Description`) as string}
                        {...getFieldProps('description')}
                    />
                </Box>

                <DialogActions
                >
                    <CustomButton
                        variant="contained"
                        disabled={isLoading}
                        loading={isLoading}
                        type="submit"
                    >
                        {t(`Create`)}
                    </CustomButton>
                    <CustomButton
                        fullWidth={true}
                        type="button"
                        variant="outlined"
                        onClick={closeModal}
                    >
                        {t(`Cancel`)}
                    </CustomButton>
                </DialogActions>
            </Box>
        </form>
    );
};

export default CreateFaqForm;
