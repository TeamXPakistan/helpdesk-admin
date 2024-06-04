
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
import { useChangeShopStatusMutation } from '@data/shop/change-shop-status-mutation'

const AcceptShopModalView = () => {
    const { closeModal, modalState } = useModal();
    const { mutate } = useChangeShopStatusMutation()
    const [open, setOpen] = useState<boolean>(true)

    const handleClose = () => {
        setOpen(false)
        closeModal()
    }
    const handleAccept = () => {
        mutate({
            status: modalState.data.status,
            shopId: modalState.data.shopId
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
                <DialogTitle align='center' typography={"h5"} id='alert-dialog-title'>Accept Shop</DialogTitle>
                <DialogContent>
                    <DialogContentText align='center' id='alert-dialog-description'>
                        Are you sure you want to accept this shop?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <CustomButton type="button" variant='contained' onClick={handleAccept}>Accept</CustomButton>
                    <CustomButton type="button" variant='outlined' onClick={handleClose}>Cancel</CustomButton>
                </DialogActions>
            </Dialog>
        </Fragment>
    )
}

export default AcceptShopModalView
