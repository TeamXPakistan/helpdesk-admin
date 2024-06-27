import CustomButton from "@components/common/Button/custom-button";
import CustomTextField1 from "@components/common/text-field/custom-text-field-1";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { DialogActions, Typography } from "@mui/material";
import { Tutorial } from "@utils/constants";
import { Box } from "@mui/system";
import { useCreateTutorialMutation } from "@data/tutorial/tutorial-create-mutation";
import createtutorialSchema from "./create-schema";

type FormValues = {
    title: string;
    description: string;
    type: string;
    video: File | null;
};

type propTypes = {
    closeModal: () => void;
};

const initialValues: FormValues = {
    title: "",
    description: "",
    type: "",
    video: null,
};

const CreateTutorialForm = ({ closeModal }: propTypes) => {
    const { t } = useTranslation(["form"]);
    const { mutate: createTutorial, isLoading } = useCreateTutorialMutation();

    const { handleSubmit, errors, getFieldProps, setFieldValue } = useFormik({
        initialValues,
        enableReinitialize: true,
        validationSchema: createtutorialSchema,
        onSubmit: (values, { resetForm }) => handelCreateTutorial(values, resetForm),
    });

    const handelCreateTutorial = (values: FormValues, resetForm: any) => {
        const formData = new FormData();
        formData.append('title', values.title);
        formData.append('description', values.description);
        formData.append('type', Tutorial.TUTORIAL);
        if (values.video) {
            formData.append('video', values.video);
        }

        createTutorial(
            formData,
            {
                onSuccess: () => {
                    resetForm({ values: initialValues });
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

                    <Grid sx={{ marginBottom: "10px" }}>
                        <Typography>{t('Upload-Video')}</Typography>
                        <VideoUploader
                            data={values?.video}
                            setFieldValue={(val: string) => setFieldValue("video", val)}
                            videoWidth={1200}
                            videoHeight={680}
                        />
                    </Grid>
                </Box>
                <DialogActions>
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

export default CreateTutorialForm;