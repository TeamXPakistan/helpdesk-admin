
import { useTranslation } from "react-i18next";
import { FaqEntries } from "@ts-types/generated";
import { useModal } from "@store/apps/modal";
import { Fragment, useState } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";

import { useFaqEntryQuery } from "@data/faq-entries/faq-entry-query";
import Spinner from "@components/common/spinner/spinner";
import CustomError from "@components/common/error/custom-error";
import { Box } from "@mui/system";
import CustomButton from "@components/common/Button/custom-button";
import CustomTextField1 from "@components/common/text-field/custom-text-field-1";



const ViewFaqModal = () => {
    const { t } = useTranslation(['form'])
    const { closeModal, modalState } = useModal();
    const [open, setOpen] = useState<boolean>(true);
    const { data: faqEntry, isLoading: fetchingFaq, error: faqError } = useFaqEntryQuery(modalState?.data?.id)
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
                fullWidth
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                {fetchingFaq && <Spinner />}
                {faqError && <CustomError sx={{ justifyContent: 'center' }} errorMsg={faqError?.message} />}
                {!fetchingFaq && !faqError &&
                    <>
                        <DialogTitle align='center' typography={"h4"} id='alert-dialog-title'>Detail Faq Entry</DialogTitle>
                        <DialogContent>
                            <Box

                                sx={{

                                    display: 'flex',

                                    textAlign: 'start',
                                    alignItems: 'center',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    '& svg': { mb: 6, color: 'warning.main' },
                                }}
                            >
                                
                                <Box>
                                    <CustomTextField1
                                        fullWidth
                                        multiline
                                        rows={2}
                                        sx={{ mb: 5 }}
                                        label={t(`Question`)}
                                        placeholder={t(`Question`) as string}
                                        defaultValue={faqEntry.data.title || 'No question provided'}
                                        disabled
                                    />

                                    <CustomTextField1
                                        fullWidth
                                        multiline
                                        rows={4}
                                        sx={{ mb: 4 }}
                                        label={t(`Description`)}
                                        placeholder={t(`Description`) as string}
                                        defaultValue={faqEntry.data.description || 'No answer provided'}
                                        disabled
                                    />
                                </Box>


                                <DialogActions>
                                    <CustomButton
                                        fullWidth={true}
                                        type="button"
                                        variant="outlined"
                                        onClick={closeModal}
                                        sx={{ mt: 4 }}
                                    >
                                        {t('Cancel')}
                                    </CustomButton>
                                </DialogActions>
                            </Box>

                        </DialogContent>
                    </>}

            </Dialog>
        </Fragment>
    )
}

export default ViewFaqModal;
