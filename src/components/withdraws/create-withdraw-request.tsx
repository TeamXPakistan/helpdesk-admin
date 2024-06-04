import { Fragment, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { useModal } from '@store/apps/modal';
import Box from '@mui/system/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { CircularProgress } from '@mui/material';
import CustomError from '@components/common/error/custom-error';
import { useBankDetailsQuery } from '@data/withdraws/bank-detail-query';
import WithdrawRequestForm from './withdraw-request-form';

const CreateWithdrawRequest = () => {
    const [open, setOpen] = useState<boolean>(true);
    const { closeModal } = useModal();

    const { data: withdraws, isLoading, error } = useBankDetailsQuery();

    const bankDetails = withdraws?.withdraws;

    const handleClose = () => {
        setOpen(false);
        closeModal();
    };

    if (isLoading) return <CircularProgress />
    if (error) return <CustomError errorMsg={error.message} />

    return (
        <Fragment>
            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth={"sm"}
                fullWidth={true}
                aria-labelledby='scroll-dialog-title'
                aria-describedby='scroll-dialog-description'
            >
                <DialogContent>
                    <Box sx={{ padding: 2 }}>
                        <Typography variant='h4' sx={{ mb: 4 }}>
                            Create Withdraw Request
                        </Typography>
                        <WithdrawRequestForm closeModal={closeModal} />
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography variant={'h5'} mt={5} mb={5} fontWeight={500}>Bank Account Details</Typography>
                                <Grid container spacing={1}>
                                    <Grid item xs={12}>
                                        <Typography mb={3}>
                                            <span style={{ fontWeight: 'bold' }}>Title: </span>
                                            {bankDetails?.accountHolderName}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography mb={3}>
                                            <span style={{ fontWeight: 'bold' }}>Email: </span>
                                            {bankDetails?.accountHolderEmail}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography mb={3}>
                                            <span style={{ fontWeight: 'bold' }}>Account Number: </span>
                                            {bankDetails?.accountNumber}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography>
                                            <span style={{ fontWeight: 'bold' }}>Bank Name: </span>
                                            {bankDetails?.bankName}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>

                    </Box>
                </DialogContent>
            </Dialog>
        </Fragment >
    );
};

export default CreateWithdrawRequest;
