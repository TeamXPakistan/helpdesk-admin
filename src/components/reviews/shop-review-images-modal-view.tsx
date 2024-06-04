
import { Fragment, useState } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import { useModal } from '@store/apps/modal'
import SimpleImageSwiper from '@components/common/image-swiper/simple-image-swiper'
import { Typography } from '@mui/material'

const ShopReviewImagesModal = () => {
    const { closeModal, modalState } = useModal();
    const [open, setOpen] = useState<boolean>(true);

    const handleClose = () => {
        setOpen(false)
        closeModal()
    }

    return (
        <Fragment>
            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth={"lg"}
                fullWidth={true}
                aria-labelledby='scroll-dialog-title'
                aria-describedby='scroll-dialog-description'
            >
                <DialogContent dividers sx={{ px: theme => theme.spacing(0.5) + '!important' }}>
                    {modalState?.data?.images?.length ?
                        < SimpleImageSwiper images={modalState?.data?.images} /> :
                        <Typography> No images </Typography>
                    }
                </DialogContent>
            </Dialog>
        </Fragment >
    )
}

export default ShopReviewImagesModal
