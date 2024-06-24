import { Fragment, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import { useModal } from '@store/apps/modal';
import { Helpers } from '@ts-types/generated';
import { useTranslation } from 'react-i18next';
import { useCreateFaqMutation } from '@data/faq-entries/faq-entry-create-mutate';
import CreateFaqForm from './Create-faqEntry';
import { DialogContent, DialogTitle } from '@mui/material';

const FaqEntriesCreateModal = () => {
    const { t } = useTranslation(['form']);
    const [open, setOpen] = useState<boolean>(true);
    const { closeModal, modalState } = useModal();
    const FaqEntriesData: Helpers = modalState?.data;

    const { mutate: toggleHelperStatus, isLoading } = useCreateFaqMutation();

    const handleSubmit = () => {
        toggleHelperStatus(
            {
                ...(FaqEntriesData?.email ? { email: FaqEntriesData?.email } : { phone: FaqEntriesData?.contact }),
                isActive: !FaqEntriesData?.isActive,
            },

            {
                onSuccess: () => {
                    handleClose();
                },
            }
        );
    };

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
                <DialogTitle align='center' typography={"h4"} id='alert-dialog-title'>Create Faq Entry</DialogTitle>
                <DialogContent>
                <CreateFaqForm/>
                </DialogContent>
            </Dialog>
        </Fragment>
    );
};

export default FaqEntriesCreateModal;
