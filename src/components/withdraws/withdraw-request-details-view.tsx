import { Fragment, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { useModal } from '@store/apps/modal';
import Box from '@mui/system/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import CustomTextField from '@components/common/text-field/custom-text-field';
import CustomChip from 'src/@core/components/mui/chip'
import { MerchantWithDrawalStatus } from '@utils/constants';

const WithdrawRequestDetailsView = () => {
    const { closeModal, modalState } = useModal();
    const [open, setOpen] = useState<boolean>(true);
    const withdrawData = modalState?.data;

    const handleClose = () => {
        setOpen(false);
        closeModal();
    };

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
                            Withdraw Request Information
                        </Typography>
                        <Grid container spacing={2} sx={{ marginBottom: 2 }}>
                            <Grid item xs={6}>
                                <Typography mb={2} fontSize={15} fontWeight={500}>Withdraw Status</Typography>
                                <CustomChip
                                    rounded
                                    skin='light'
                                    size='small'
                                    label={withdrawData?.status}
                                    color={
                                        withdrawData?.status === MerchantWithDrawalStatus.ACCEPTED ? 'success'
                                            : withdrawData?.status === MerchantWithDrawalStatus.REJECTED ? "error" : "info"}
                                    sx={{
                                        textTransform: 'capitalize'
                                    }}
                                />
                            </Grid>
                        </Grid>
                        <Grid sx={{ marginBottom: 2 }}>
                            <Grid item xs={6}>
                                <Typography mb={2} mt={2} fontSize={15} fontWeight={500}>Amount</Typography>
                                <CustomTextField
                                    fullWidth
                                    value={withdrawData?.amount}
                                    disabled
                                />
                            </Grid>
                        </Grid>
                        {withdrawData?.requestSpecialNote &&
                            <Grid sx={{ marginBottom: 2 }}>
                                <Grid item xs={6}>
                                    <Typography mb={2} mt={2} fontSize={15} fontWeight={500}>Special Instruction</Typography>
                                    <CustomTextField
                                        multiline
                                        rows={4}
                                        fullWidth
                                        value={withdrawData?.requestSpecialNote}
                                        disabled
                                    />
                                </Grid>
                            </Grid>
                        }
                        {withdrawData?.status == MerchantWithDrawalStatus.ACCEPTED && withdrawData?.specialNote &&
                            <Grid sx={{ marginBottom: 2 }}>
                                <Grid item xs={6}>
                                    <Typography mb={2} mt={2} fontSize={15} fontWeight={500}>Admin Special Instruction</Typography>
                                    <CustomTextField
                                        multiline
                                        rows={4}
                                        fullWidth
                                        value={withdrawData?.specialNote}
                                        disabled
                                    />
                                </Grid>
                            </Grid>
                        }
                        {withdrawData?.status == MerchantWithDrawalStatus.REJECTED && withdrawData?.reason &&
                            <Grid sx={{ marginBottom: 2 }}>
                                <Grid item xs={6}>
                                    <Typography mb={2} mt={2} fontSize={15} fontWeight={500}>Reason</Typography>
                                    <CustomTextField
                                        multiline
                                        rows={4}
                                        fullWidth
                                        value={withdrawData?.reason}
                                        disabled
                                    />
                                </Grid>
                            </Grid>
                        }
                        {
                            withdrawData?.screenShort && (
                                <Grid sx={{ marginBottom: 2 }}>
                                    <Grid item xs={12} md={6}>
                                        <Typography mb={2} mt={2} fontSize={15} fontWeight={500}>Screen Shot</Typography>
                                        <Grid sx={{ maxWidth: 520, height: 300 }}>
                                            <img src={withdrawData?.screenShort} alt='screen_shot' height='100%' style={{ maxWidth: '100%' }} />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            )
                        }
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography variant={'h5'} mt={5} mb={5} fontWeight={500}>Bank Account Details</Typography>
                                <Grid container spacing={1}>
                                    <Grid item xs={12}>
                                        <Typography mb={3}>
                                            <span style={{ fontWeight: 'bold' }}>Title: </span>
                                            {withdrawData?.bankDetails?.accountHolderName}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography mb={3}>
                                            <span style={{ fontWeight: 'bold' }}>Email: </span>
                                            {withdrawData?.bankDetails?.accountHolderEmail}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography mb={3}>
                                            <span style={{ fontWeight: 'bold' }}>Account Number: </span>
                                            {withdrawData?.bankDetails?.accountNumber}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography>
                                            <span style={{ fontWeight: 'bold' }}>Bank Name: </span>
                                            {withdrawData?.bankDetails?.bankName}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>
                </DialogContent>
            </Dialog>
        </Fragment>
    );
};

export default WithdrawRequestDetailsView;
