
// ** React Imports
import { Fragment, useState } from 'react'

import Grid from '@mui/material/Grid'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import { useModal } from '@store/apps/modal'
import Spinner from '@components/common/spinner/spinner'
import CustomError from '@components/common/error/custom-error'
import { useParcelQuery } from '@data/parcels/parcel-query'
import ParcelDetailsCard from '@components/parcels/parcel-details-card'
import UserProfileCard from '@components/users/user-profile-card'
import { Box } from '@mui/system'
import { Typography } from '@mui/material'

const DriverParcelDetailsView = () => {
    const { closeModal, modalState } = useModal();
    const { data: parcel, isLoading, error } = useParcelQuery(modalState?.data?.id);
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
                maxWidth={"xl"}
                fullWidth={true}
                aria-labelledby='scroll-dialog-title'
                aria-describedby='scroll-dialog-description'
            >
                {isLoading && <Spinner />}
                {error && <CustomError sx={{ justifyContent: 'center' }} errorMsg={error?.message} />}
                {!isLoading && !error &&
                    <DialogContent>
                        <>
                            <Box
                                sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', mb: 5 }}
                            >
                                <Typography variant='h4' sx={{ color: "text.primary" }}>
                                    Parcel Details
                                </Typography>
                            </Box>

                            <Grid container spacing={6}>
                                <Grid item xs={12} md={7} lg={8}>
                                    <ParcelDetailsCard parcel={parcel} />
                                </Grid>

                                <Grid item xs={12} md={5} lg={4}>
                                    <UserProfileCard userDetails={parcel?.senderId} />
                                </Grid>
                            </Grid>
                        </>
                    </DialogContent>
                }
            </Dialog>
        </Fragment>
    )
}

export default DriverParcelDetailsView;
