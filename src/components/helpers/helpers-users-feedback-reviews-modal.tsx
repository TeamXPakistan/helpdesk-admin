import { Fragment, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { useModal } from '@store/apps/modal';
import Box from '@mui/system/Box';
import Typography from '@mui/material/Typography';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';
import { User_Helper_Message } from '@ts-types/generated';
import CustomTextField from 'src/@core/components/mui/text-field';

const HelpersUsersFeedbackReviewsModal = () => {
    const { t } = useTranslation(['form']);
    const [open, setOpen] = useState<boolean>(true);
    const { closeModal, modalState } = useModal();

    const userHelperData: User_Helper_Message = modalState?.data

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
                    <Box
                        sx={{
                            display: 'flex',
                            textAlign: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            '& svg': { mb: 6, color: 'warning.main' }
                        }}
                    >
                        <h2>{modalState?.heading?.slice(0, modalState?.heading?.length - 1)}</h2>
                        <CustomTextField
                            label="Message"
                            multiline
                            rows={4}
                            fullWidth
                            defaultValue={userHelperData}
                        />
                    </Box>
                </DialogContent>
                <DialogActions
                    sx={{
                        justifyContent: 'center',
                        px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
                        pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
                    }}
                >
                    <Button variant='tonal' color='secondary' onClick={handleClose}>
                        {t('Close')}
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    );
};

export default HelpersUsersFeedbackReviewsModal;
