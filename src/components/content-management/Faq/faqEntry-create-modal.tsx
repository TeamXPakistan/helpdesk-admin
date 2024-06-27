import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import { useModal } from '@store/apps/modal';
import CreateFaqForm from './Create-faqEntry';
import { DialogContent, DialogTitle } from '@mui/material';

const FaqEntriesCreateModal = () => {
    const [open, setOpen] = useState<boolean>(true);
    const { closeModal } = useModal();

    const handleClose = () => {
        setOpen(false);
        closeModal();
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="sm"
            fullWidth
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
        >
            <DialogTitle align='center' typography={"h4"} id='alert-dialog-title'>Create FAQ</DialogTitle>
            <DialogContent>
                <CreateFaqForm closeModal={handleClose} />
            </DialogContent >
        </Dialog>
    );
};

export default FaqEntriesCreateModal;
