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
import CustomTextField1 from '@components/common/text-field/custom-text-field-1';
import { useSearchUserQuery } from '@data/helpers-users-feedback/search-user-query';

const HelperBanUnBanModal = () => {
    const { t } = useTranslation(['form']);
    const { openModal, closeModal, modalState } = useModal();

    const userHelperData: User_Helper_Message = modalState?.data;

    const [open, setOpen] = useState<boolean>(true);
    const [text, setText] = useState<string>('');
    const [searchVal, setSearchVal] = useState<string>('');

    const handleClose = () => {
        setOpen(false);
        closeModal();
    };

    const { data: user, isLoading, error } = useSearchUserQuery(text);
    console.log("helloo user front", user);

    const handleSearch = (e: any) => {
        e.preventDefault();
        if (searchVal.trim() !== '') {
            setText(searchVal);
        }
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
                        <h2>Ban/ UnBan Helper</h2>

                        <form onSubmit={handleSearch} style={{ display: 'flex', margin: '10px' }}>
                            <CustomTextField1
                                value={searchVal}
                                placeholder='Search by email'
                                onChange={(e) => setSearchVal(e.target.value)}
                            />
                            <CustomButton
                                variant='contained'
                                sx={{ width: '100px', margin: '0 5px' }}
                                type='submit'
                            >
                                Search
                            </CustomButton>
                        </form>
                    </Box>

                    {user && user.length === 1 ? (
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
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Typography>Username:</Typography>
                                <Typography>{user[0].firstName}</Typography>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Typography>Email:</Typography>
                                <Typography>{user[0].email}</Typography>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Typography>Contact:</Typography>
                                <Typography>{user[0].contact}</Typography>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <CustomButton
                                    variant='contained'
                                    sx={{ mb: 4, mt: 4 }}
                                    type='submit'
                                    onClick={() => openModal({
                                        view: "USER_STATUS_MODAL",
                                        data: user[0]
                                    })}
                                >
                                    {`${user[0]?.isActive ? 'Ban' : 'Un-Ban'} User`}
                                </CustomButton>
                            </div>
                        </Box>
                    ) : (
                        <Typography sx={{ textAlign: 'center' }}>No user found!</Typography>
                    )}
                </DialogContent>
                <DialogActions
                    sx={{
                        justifyContent: 'center',
                        px: (theme) => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
                        pb: (theme) => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
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

export default HelperBanUnBanModal;
