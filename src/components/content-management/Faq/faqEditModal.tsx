import CustomButton from "@components/common/Button/custom-button";
import CustomTextField1 from "@components/common/text-field/custom-text-field-1";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { Faq, FaqUpdate, UpdateFaqEntryInput } from "@ts-types/generated";
import { UseFaqEntryUpdateMutation } from "@data/faq-entries/faq-entry-update.mutate";
import updatefaqSchema from "./update-schema";
import { useModal } from "@store/apps/modal";
import { Fragment, useState } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { Box } from "@mui/system";

type PropType = {
    formData: Faq
}



const EditFaqModal = ({ formData }: PropType) => {
    const { t } = useTranslation(['form'])
    const [open, setOpen] = useState<boolean>(true);
    const { mutate: updateFaqEntry, isLoading } = UseFaqEntryUpdateMutation();
    const { closeModal, modalState } = useModal();
    const FaqEntriesData: UpdateFaqEntryInput = modalState?.data;

    const initialValues  = {
        title: FaqEntriesData.title,
        description: FaqEntriesData.description,
        id: FaqEntriesData.id
    }

    const { handleSubmit, errors, getFieldProps } = useFormik({
        initialValues,
        enableReinitialize: true,
        validationSchema: updatefaqSchema,
        onSubmit: (values, { resetForm }) => handelUpdateFaq(values, resetForm)
    })

    const handelUpdateFaq = (values: UpdateFaqEntryInput, resetForm: any) => {
        updateFaqEntry(
            {
                title: values.title,
                description: values.description,
                id: FaqEntriesData.id
            },
            {
                onSuccess: () => {
                    resetForm({ values: '' })
                    closeModal()
                }
            }
        )
    }

    const handleClose = () => {
        setOpen(false);
        closeModal();
    };

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
                <DialogTitle align='center' typography={"h4"} id='alert-dialog-title'>Edit FAQ Entry</DialogTitle>
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
                                    multiline
                                    rows={2}
                                    sx={{ mb: 5 }}
                                    label={t(`Question`)}
                                    placeholder={t(`Question`) as string}
                                    {...getFieldProps('title')}
                                    
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
                </DialogContent>
            </Dialog>
        </Fragment>
    )
}

export default EditFaqModal;