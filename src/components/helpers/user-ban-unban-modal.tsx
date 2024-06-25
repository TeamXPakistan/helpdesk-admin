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
import CustomTextField1 from '@components/common/text-field/custom-text-field-1';
import { useSearchUserQuery } from '@data/helpers-users-feedback/search-user-query';
import { Grid } from '@mui/material';
import Image from 'next/image';
import { fullName, getUserInitials } from '@utils/helper-functions';

const UserBanUnBanModal = () => {
    const { t } = useTranslation(['form']);
    const { openModal, closeModal } = useModal();


    const [open, setOpen] = useState<boolean>(true);
    const [text, setText] = useState<string>('');
    const [searchVal, setSearchVal] = useState<string>('');
    const [showResult, setShowResult] = useState<boolean>(false);

    const handleClose = () => {
        setOpen(false);
        closeModal();
        setShowResult(false);
    };

    const { data: user } = useSearchUserQuery(text);

    const handleSearch = (e: any) => {
        e.preventDefault();
        if (searchVal.trim() !== '') {
            setShowResult(true)
            setText(searchVal);
        }
        else {
            setText('');
            setShowResult(false)
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
                        <h2>Ban/ UnBan User</h2>

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

                        {user && user.length === 1 && (
                            <Grid container style={{
                                margin: '10px 0px',
                                padding: '10px 0px',
                                backgroundColor: '#F8F7FA',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <Grid item xs={3}>
                                    {user[0]?.img ? <Image
                                        src={user[0]?.img}
                                        alt={'Logo'}
                                        width={100}
                                        height={100}
                                        style={{ borderRadius: '100%' }}
                                    />
                                        : <div className='name-initials'>
                                            {getUserInitials(fullName(user[0]?.firstName, user[0]?.lastName) || "User")}
                                        </div>
                                    }
                                </Grid>
                                <Grid item xs={7} sx={{ mb: 5 }}>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <Typography>Username: </Typography>
                                        <Typography className='show-dot-long-text'>&nbsp; {fullName(user[0]?.firstName, user[0]?.lastName) ?? '-'}</Typography>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <Typography>Email:</Typography>
                                        <Typography className='show-dot-long-text'> &nbsp; {user[0]?.email}</Typography>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <Typography>Contact:</Typography>
                                        <Typography className='show-dot-long-text'>&nbsp; {user[0]?.contact ?? '-'}</Typography>
                                    </div>
                                </Grid>
                            </Grid>)}
                        {showResult && user?.length != 1 &&
                            <Typography sx={{ mt: 3 }}>No User Found!</Typography>
                        }
                    </Box>
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

                    {user && user.length === 1 && <Box style={{ display: 'flex', alignItems: 'center' }}>
                        <CustomButton
                            variant='contained'
                            sx={{ mb: 4, mt: 4, ml: 2 }}
                            type='submit'
                            onClick={() => openModal({
                                view: "USER_STATUS_MODAL",
                                data: user[0]
                            })}
                        >
                            {`${user[0]?.isActive ? 'Ban' : 'Un-Ban'} User`}
                        </CustomButton>
                    </Box>
                    }
                </DialogActions>
            </Dialog>
        </Fragment >
    );
};

export default UserBanUnBanModal;
