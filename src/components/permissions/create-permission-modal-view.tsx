import { useState } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import { useModal } from '@store/apps/modal'
import CreatePermissionForm from './create-permission-form'

const CreatePermissionView = () => {
    const { closeModal } = useModal();
    const [open, setOpen] = useState<boolean>(true)

    const handleClose = () => {
        setOpen(false)
        closeModal()
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth={"xs"}
            fullWidth={true}
            aria-labelledby='scroll-dialog-title'
            aria-describedby='scroll-dialog-description'
        >
            <DialogTitle align='center' typography={"h5"} id='alert-dialog-title'>Create Permission</DialogTitle>
            <DialogContent>
                <CreatePermissionForm closeModal={handleClose} />
            </DialogContent>
        </Dialog>
    )
}

export default CreatePermissionView
