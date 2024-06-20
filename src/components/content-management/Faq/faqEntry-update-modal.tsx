import { Fragment, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { useModal } from '@store/apps/modal';
import Box from '@mui/system/Box';
import Typography from '@mui/material/Typography';
import Icon from 'src/@core/components/icon';
import { Helpers } from '@ts-types/generated';
import DialogActions from '@mui/material/DialogActions';
import CustomButton from '@components/common/Button/custom-button';
import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';
import { UseFaqEntryUpdateMutation } from '@data/faq-entries/faq-entry-update.mutate';

const FaqEntriesUpdateModal = () => {
    const { t } = useTranslation(['form']);
    const [open, setOpen] = useState<boolean>(true);
    const { closeModal, modalState } = useModal();
    const FaqEntriesData: Helpers = modalState?.data;

    const { mutate: toggleHelperStatus, isLoading } = UseFaqEntryUpdateMutation();

    const handleDelete = () => {
        toggleHelperStatus(
            {
                ...(FaqEntriesData?.email ? { email: FaqEntriesData?.email } : { phone: FaqEntriesData?.contact }),
                isActive: !FaqEntriesData?.isActive,
            },
            {
                onSuccess: () => {
                    handleClose();
                },
            }
        );
    };

    const handleClose = () => {
        setOpen(false);
        closeModal();
    };

    return (
        <Fragment>
            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth="sm"
                fullWidth
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogContent>
                    <Box
                        sx={{
                            display: 'flex',
                            textAlign: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            '& svg': { mb: 6, color: 'warning.main' },
                        }}
                    >
                        <Icon color="black" icon="dashicons:update-alt" fontSize="5.5rem" />
                        <Typography>{`Are you sure you would like to "Update" this FAQ-Entry?`}</Typography>
                    </Box>
                </DialogContent>
                <DialogActions
                    sx={{
                        justifyContent: 'center',
                        px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
                        pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`],
                    }}
                >
                    <CustomButton loading={isLoading} fullWidth={false} variant="contained" sx={{ mr: 2 }} onClick={handleDelete} type="button">
                        {t('Yes')}
                    </CustomButton>
                    <Button variant="tonal" color="secondary" onClick={handleClose}>
                        {t('Cancel')}
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    );
};

export default FaqEntriesUpdateModal;
