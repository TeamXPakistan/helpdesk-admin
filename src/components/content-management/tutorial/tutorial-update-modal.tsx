import CustomButton from "@components/common/Button/custom-button";
import CustomTextField1 from "@components/common/text-field/custom-text-field-1";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { Faq } from "@ts-types/generated";
import { UseFaqEntryUpdateMutation } from "@data/faq-entries/faq-entry-update.mutate";
import updatefaqSchema from "./update-schema";
import { useModal } from "@store/apps/modal";
import { Fragment, useState } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { Box } from "@mui/system";
import { useFaqEntriesQuery } from "@data/faq-entries/faq-entries-query";

type PropType = {
    formData: Faq
}

type FormValues = {
    title: string | undefined;
    description: string | null | undefined;
}

const EditTutorialModal = ({ formData }: PropType) => {
    const { t } = useTranslation(['form'])
    const [open, setOpen] = useState<boolean>(true);

    const { mutate: updateFaqEntry, isLoading } = UseFaqEntryUpdateMutation();
    const { data: faqEntries, isLoading: fetchingRoles } = useFaqEntriesQuery({
        limit: 9999,
        page: 1,
    });

    const { closeModal, modalState } = useModal();
    const FaqEntriesData: Faq = modalState?.data;

    const initialValues: FormValues = {
        title: FaqEntriesData.title,
        description: FaqEntriesData.description,
    }

    const { handleSubmit, errors, getFieldProps, setFieldValue, values } = useFormik({
        initialValues,
        enableReinitialize: true,
        validationSchema: updatefaqSchema,
        onSubmit: (values, { resetForm }) => handelUpdateFaq(values, resetForm)
    })

    const handelUpdateFaq = (values: FormValues, resetForm: any) => {
        updateFaqEntry(
            {
                title: FaqEntriesData.title,
                description: FaqEntriesData.description,
                id: FaqEntriesData.id
            },
            {
                onSuccess: () => {
                    resetForm({ values: '' })
                }
            }
        )
    }

    const handleClose = () => {
        setOpen(false);
        closeModal();
    };
    const { data, isLoading: fetchingFaqEntry, error: faqEntryError } = useFaqEntriesQuery(modalState?.data?.permissionId)

    return (
        <Fragment>
            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth="sm"
                fullWidth={true}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle align='center' typography={"h4"} id='alert-dialog-title'>Edit Faq Entry</DialogTitle>
                <DialogContent>
                    <form noValidate autoComplete='off' onSubmit={handleSubmit}>
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
                                    sx={{ mb: 5 }}
                                    label={t(`Question`)}
                                    {...getFieldProps('title')}
                                />
                                <CustomTextField1
                                    errorMsg={t(errors?.description as string)}
                                    fullWidth
                                    sx={{ mb: 5 }}
                                    label={t(`Answer`)}
                                    {...getFieldProps('description')}
                                />
                            </Box>
                            <DialogActions>
                                <CustomButton
                                    variant='contained'
                                    disabled={isLoading}
                                    loading={isLoading}
                                    type='submit'
                                    fullWidth={true}
                                >
                                    {t(`Update`)}
                                </CustomButton>
                            </DialogActions>
                        </Box>
                    </form>
                </DialogContent>


            </Dialog>
        </Fragment>
    )
}

export default EditTutorialModal;
