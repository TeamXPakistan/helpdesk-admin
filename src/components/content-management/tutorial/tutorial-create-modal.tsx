import { Fragment, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import { useModal } from '@store/apps/modal';
import { DialogContent, DialogTitle } from '@mui/material';
import CreateTutorialForm from './create-tutorial';

const FaqEntriesCreateModal = () => {
    const [open, setOpen] = useState<boolean>(true);
    const { closeModal, modalState } = useModal();

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
                <CreateTutorialForm closeModal={handleClose} />
                </DialogContent >
            </Dialog>
        </Fragment>
    );
};

export default FaqEntriesCreateModal;
