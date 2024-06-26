
import { useTranslation } from "react-i18next";
import { FaqEntries } from "@ts-types/generated";
import { useModal } from "@store/apps/modal";
import { Fragment, useState } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Icon, Typography } from "@mui/material";

import { useFaqEntryQuery } from "@data/faq-entries/faq-entry-query";
import Spinner from "@components/common/spinner/spinner";
import CustomError from "@components/common/error/custom-error";
import { Box } from "@mui/system";
import CustomButton from "@components/common/Button/custom-button";

type PropType = {
    formData: FaqEntries
}

const ViewFaqModal = ({ formData }: PropType) => {
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
                                <Box
                                sx={{ width: '500px',
                                    height: 'auto', 
                                    padding: 2,
                                }}
                                >
                                    <Typography variant="h5" sx={{ mb: 1 }}>
                                        Question :
                                    </Typography>
                                    <Typography
                                    >
                                        {faqEntry.data.title || 'No question provided'}
                                    </Typography>

                                    <Typography variant="h5" sx={{ mt: 3, mb: 1 }}>
                                        Answer :
                                    </Typography>
                                    <Typography>
                                        {faqEntry.data.description || 'No answer provided'}
                                    </Typography>
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
