
// ** React Imports
import { Fragment, useState } from 'react'

// ** MUI Imports
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'
import { useModal } from '@store/apps/modal'
import CustomButton from '@components/common/Button/custom-button'
import CustomTextField1 from '@components/common/text-field/custom-text-field-1'
import { useChangeShopStatusMutation } from '@data/shop/change-shop-status-mutation'

const RejectShopModalView = () => {
    const { closeModal, modalState } = useModal();
    const { mutate } = useChangeShopStatusMutation()
    const [open, setOpen] = useState<boolean>(true)
    const [reasonToReject, setReasonToReject] = useState<string>("")


    const handleClose = () => {
        setOpen(false)
        closeModal()
    }
    const handleReject = () => {
        mutate({
            status: modalState.data.status,
            shopId: modalState.data.shopId,
            reasonToRejectShop: reasonToReject.trim()
        })
        setOpen(false)
        closeModal()
    }

    return (
        <Fragment>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby='alert-dialog-title'
                aria-describedby='alert-dialog-description'
            >
                <DialogTitle align='center' typography={"h5"} id='alert-dialog-title'>Reject Shop</DialogTitle>
                <DialogContent>
                    <DialogContentText align='center' id='alert-dialog-description'>
                        Are you sure you want to reject this shop?
                    </DialogContentText>
                    <DialogContentText sx={{ mt: 10 }} align='left' id='alert-dialog-description'>
                        Reason to reject:
                    </DialogContentText>
                    <DialogContentText align='left' id='alert-dialog-description'>
                        <CustomTextField1
                            rows={3}
                            multiline
                            fullWidth={true}
                            placeholder='Add your Comment...'
                            onChange={(e) => setReasonToReject(e.target.value)}
                        />
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <CustomButton type="button" variant='contained' onClick={handleReject}>Reject</CustomButton>
                    <CustomButton type="button" variant='outlined' onClick={handleClose}>Cancel</CustomButton>
                </DialogActions>
            </Dialog>
        </Fragment>
    )
}

export default RejectShopModalView
