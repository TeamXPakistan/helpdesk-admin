
// ** React Imports
import { Fragment, useState } from 'react'

// ** MUI Imports
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import { useModal } from '@store/apps/modal'
import Spinner from '@components/common/spinner/spinner'
import CustomError from '@components/common/error/custom-error'
import { useCurrentOrderQuery } from '@data/drivers/current-order-query'
import DriverCurrentOrderDetails from './driver-current-order-details'

const DriverCurrentOrderDetailsView = () => {
    const { closeModal, modalState } = useModal();
    const { data, isLoading, error } = useCurrentOrderQuery(modalState?.data?.driverId);
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
                {isLoading && <Spinner />}
                {error && <CustomError sx={{ justifyContent: 'center' }} errorMsg={error?.message} />}
                {!isLoading && !error &&
                    <DialogContent>
                        <DriverCurrentOrderDetails order={data} />
                    </DialogContent>
                }
            </Dialog>
        </Fragment>
    )
}

export default DriverCurrentOrderDetailsView;
