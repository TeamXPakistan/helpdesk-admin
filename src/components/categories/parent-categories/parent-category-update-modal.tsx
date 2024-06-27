import { Fragment, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { useModal } from '@store/apps/modal';
import Box from '@mui/system/Box';
import Typography from '@mui/material/Typography';
import { ParentCategories } from '@ts-types/generated';
import DialogActions from '@mui/material/DialogActions';
import CustomButton from '@components/common/Button/custom-button';
import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';
import { useUpdateUserMutation } from '@data/users/user-update-mutation';
import CustomTextField1 from '@components/common/text-field/custom-text-field-1';
import { useFormik } from 'formik';
import updateParentCategorySchema from './update-parent-category-schema';

type FormValues = {
    id: string | number | undefined;
    parentId: string | number | null | undefined;
    callTime: number | null | undefined;
    ratePerHour: number | null | undefined;
    Translations:
    {
        en: { id: number, name: string, language: string },
        ar: { id: number, name: string, language: string },
    }
    // { label: string; value: string } | null;
}


const UserParentCategoryUpdateModal = () => {
    const { t } = useTranslation(['form']);
    const [open, setOpen] = useState<boolean>(true);
    const { closeModal, modalState } = useModal();

    const userData: ParentCategories = modalState?.data

    const { mutate: toggleUserStatus, isLoading } = useUpdateUserMutation();

    const handleBan = () => {
        toggleUserStatus(
            {
                ...(userData?.email ? { email: userData?.email } : { phone: userData?.contact }),
                isActive: !userData?.isActive,
            },
            {
                onSuccess: () => {
                    handleClose()
                }
            }
        )
    }

    const handleClose = () => {
        setOpen(false);
        closeModal();
    };

    const initialValues: FormValues = {
        id: userData?.id,
        parentId: userData?.parentId,
        callTime: userData?.callTime,
        ratePerHour: userData?.ratePerHour,
        Translations: {
            en: { id: userData?.translations?.id, name: userData?.translations?.name, language: 'en' },
            ar: { id: userData?.translations?.id, name: userData?.translations?.name, language: 'ar' },
        },
        // { label: formData?.role?.name as string, 
        //     value: formData?.role?.id as string },
    }

    const { handleSubmit, errors, getFieldProps, setFieldValue, values } = useFormik({
        initialValues,
        enableReinitialize: true,
        validationSchema: updateParentCategorySchema,
        onSubmit: (values, { resetForm }) => handelUpdateStaff(values, resetForm)
    })

    const handelUpdateStaff = (values: FormValues, resetForm: any) => {
        // updateStaff(
        //     {
        //         id: formData?.id,
        //         email: values?.email,
        //         phone: values?.phone,
        //         roleId: values?.role?.value,
        //         username: values?.username,
        //         firstName: values?.firstName,
        //         lastName: values?.lastName,
        //     },
        //     {
        //         onSuccess: () => {
        //             resetForm({ values: '' })
        //         }
        //     }
        // )
    }
    // {
    //     "id": 2,
    //     "ratePerHour": 201,
    //     "callTime": 20,
    //     // "parentId": 26  // optional
    //     "translations": [
    //         {
    //             "id": 49,
    //             "name": "category number 4",
    //             "language": "en"
    //         },
    //         {
    //             "id": 50,
    //             "name": "الفئ العرب 2",
    //             "language": "ar"
    //         }
    //     ]
    // }
    return (
        <Fragment>
            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth={"md"}
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
                        <Typography variant='h4'>Update Category</Typography>

                        <form autoComplete='off' onSubmit={handleSubmit}>
                            <CustomTextField1
                                errorMsg={t(errors?.id as string)}
                                fullWidth
                                sx={{ mb: 5 }}
                                label={t(`ID`)}
                                {...getFieldProps('id')}


                            />
                            <CustomTextField1
                                errorMsg={t(errors?.parentId as string)}
                                fullWidth
                                sx={{ mb: 5 }}
                                label={t(`Parent ID`)}
                                {...getFieldProps('parentId')}
                            />
                            <CustomTextField1
                                errorMsg={t(errors?.ratePerHour as string)}
                                fullWidth
                                sx={{ mb: 5 }}
                                label={t(`Rate Per Hour`)}
                                {...getFieldProps('ratePerHour')}


                            />
                            <CustomTextField1
                                errorMsg={t(errors?.callTime as string)}
                                fullWidth
                                sx={{ mb: 5 }}
                                label={t(`Call Time`)}
                                {...getFieldProps('callTime')}
                            />
                            <Typography variant='h6' sx={{ mb: 5 }}>{t('English Translation')}</Typography>
                            <div className='flex' style={{ display: 'flex' }}>
                                <CustomTextField1
                                    errorMsg={t(errors?.Translations?.en?.name as string)}
                                    fullWidth
                                    sx={{ mb: 5, mr: 1 }}
                                    label={t(`Name`)}
                                    {...getFieldProps('Translations.en.name')}
                                />
                                <CustomTextField1
                                    errorMsg={t(errors?.Translations?.en?.language as string)}
                                    fullWidth
                                    sx={{ mb: 5, ml: 1 }}
                                    label={t(`Language`)}
                                    disabled
                                    {...getFieldProps('Translations.en.language')}
                                />
                            </div>

                            <Typography variant='h6' sx={{ mb: 5 }}>{t('Arabic Translation')}</Typography>
                            <div className='flex' style={{ display: 'flex' }}>
                                <CustomTextField1
                                    errorMsg={t(errors?.Translations?.ar?.name as string)}
                                    fullWidth
                                    sx={{ mb: 5, mr: 1 }}
                                    label={t(`Name`)}
                                    {...getFieldProps('Translations.ar.name')}
                                />
                                <CustomTextField1
                                    errorMsg={t(errors?.Translations?.ar?.language as string)}
                                    fullWidth
                                    sx={{ mb: 5, ml: 1 }}
                                    disabled
                                    label={t(`Language`)}
                                    {...getFieldProps('Translations.ar.language')}
                                />
                            </div>
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
                    <CustomButton loading={isLoading} fullWidth={false} variant='contained' sx={{ mr: 2 }} onClick={handleBan} type={'button'}>
                        {t('Update')}
                    </CustomButton>
                    <Button variant='tonal' color='secondary' onClick={handleClose}>
                        {t('Cancel')}
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment >
    );
};

export default UserParentCategoryUpdateModal;
