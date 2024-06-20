import { Fragment, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { useModal } from '@store/apps/modal';
import Box from '@mui/system/Box';
import Typography from '@mui/material/Typography';
import DialogActions from '@mui/material/DialogActions';
import CustomButton from '@components/common/Button/custom-button';
import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';
import { User_Helper_Message } from '@ts-types/generated';
import CustomTextField from 'src/@core/components/mui/text-field';
import CustomTextField1 from '@components/common/text-field/custom-text-field-1';

const HelpersUsersBanUnBanModal = () => {
    const { t } = useTranslation(['form']);
    const { closeModal, modalState } = useModal();

    const [open, setOpen] = useState<boolean>(true);
    const [searchUser, setSearchUser] = useState<string>('');
    const [searchVal, setSearchVal] = useState<string>('')

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
                        <h2>Ban/ UnBan User</h2>

                        <form onSubmit={(e) => {
                            e.preventDefault()
                            setSearchUser(searchVal)
                        }}>
                            <CustomTextField1 fullWidth value={searchVal} placeholder='Search by name or email to Ban user' onChange={e => setSearchUser(e.target.value)} />
                        </form>
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

export default HelpersUsersBanUnBanModal;
