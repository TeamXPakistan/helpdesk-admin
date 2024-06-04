import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Settings } from '@ts-types/generated'
import React from 'react'
import CustomTextField1 from '@components/common/text-field/custom-text-field-1'
import * as Yup from 'yup'
import CustomButton from "@components/common/Button/custom-button";
import { useFormik } from 'formik';
import { t } from 'i18next';
import { useSettingsMutation } from '@data/settings/settings-mutation';

interface SettingsDetailProps {
    data: Settings;
}

const SettingsDetail = ({ data }: SettingsDetailProps) => {

    const { mutate, isLoading } = useSettingsMutation()

    const initialValues: Settings = {
        VAT: data?.VAT,
        minPayout: data?.minPayout,
        maxPayout: data?.maxPayout,
        minWallet: data?.minWallet,
        deliveryCharges: data?.deliveryCharges,
        parcelMaxQty: data?.parcelMaxQty,
        parcelMaxWeight: data?.parcelMaxWeight,
        parcelMaxHeight: data?.parcelMaxHeight,
        parcelMaxWidth: data?.parcelMaxWidth,
        parcelMaxLength: data?.parcelMaxLength,
    }

    const { handleSubmit, errors, getFieldProps } = useFormik({
        initialValues,
        validationSchema: Yup.object().shape({
            VAT: Yup.number().required('Vat is required').min(1, 'Vat should not be less than 1'),
            minPayout: Yup.number().required('Min Payout is required').min(1, 'Min Payout should not be less than 1'),
            maxPayout: Yup.number().required('Max Payout is required').min(1, 'Max Payout should not be less than 1'),
            minWallet: Yup.number().required('Min Wallet is required').min(1, 'Min Wallet should not be less than 1'),
            deliveryCharges: Yup.number().required('Delivery charges are required').min(1, 'Delivery charges should not be less than 1'),
            parcelMaxQty: Yup.number().required('Parcel Max quantity is required').min(1, 'Parcel Max quantity should not be less than 1'),
            parcelMaxWeight: Yup.number().required('Parcel Max weight is required').min(1, 'Parcel Max weight should not be less than 1'),
            parcelMaxHeight: Yup.number().required('Parcel Max height is required').min(1, 'Parcel Max height should not be less than 1'),
            parcelMaxWidth: Yup.number().required('Parcel Max width is required').min(1, 'Parcel Max width should not be less than 1'),
            parcelMaxLength: Yup.number().required('Parcel Max length is required').min(1, 'Parcel Max length should not be less than 1'),
        }),
        onSubmit: (values) => handleCreateRequest(values)
    })

    const handleCreateRequest = (values: Settings) => {
        mutate({ ...values }
        )
    }

    return (
        <form noValidate autoComplete='off' onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={12} md={5} lg={4}>
                </Grid>
                <Grid item xs={12} md={7} lg={8} >

                    <Grid mt={5}>
                        <Typography fontSize={15} fontWeight={500}>VAT (%)</Typography>
                        <Typography variant='caption'>The vat should be in percentage and applied on order in percentage.</Typography>
                        <CustomTextField1
                            type={'number'}
                            errorMsg={t(errors?.VAT as string)}
                            fullWidth
                            sx={{ mt: 5 }}
                            {...getFieldProps('VAT')}
                        />
                    </Grid>

                    <Grid mt={5}>
                        <Typography mt={5} fontSize={15} fontWeight={500}>Min Payout</Typography>
                        <Typography variant='caption'>Minimum value for withdrawal, less than that user will not able to withdrawal amount.</Typography>
                        <CustomTextField1
                            type={'number'}
                            errorMsg={t(errors?.minPayout as string)}
                            fullWidth
                            sx={{ mt: 5 }}
                            {...getFieldProps('minPayout')}
                        />
                    </Grid>

                    <Grid mt={5}>
                        <Typography fontSize={15} fontWeight={500}>Max Payout</Typography>
                        <Typography variant='caption'> Maximum value for withdrawal, more than that user will not able to withdrawal amount.</Typography>
                        <CustomTextField1
                            type={'number'}
                            errorMsg={t(errors?.maxPayout as string)}
                            fullWidth
                            sx={{ mt: 5 }}
                            {...getFieldProps('maxPayout')}
                        />
                    </Grid>

                    <Grid mt={5}>
                        <Typography fontSize={15} fontWeight={500}>Min Wallet</Typography>
                        <Typography variant='caption'>Vendors/Drivers wallet should have at least minimum value in the wallet for withdrawal.</Typography>
                        <CustomTextField1
                            type={'number'}
                            errorMsg={t(errors?.minWallet as string)}
                            fullWidth
                            sx={{ mt: 5 }}
                            {...getFieldProps('minWallet')}
                        />
                    </Grid>

                    <Grid mt={5}>
                        <Typography fontSize={15} fontWeight={500}>Delivery Charges</Typography>
                        <Typography variant='caption'>Please enter per KM value.</Typography>
                        <CustomTextField1
                            type={'number'}
                            errorMsg={t(errors?.deliveryCharges as string)}
                            fullWidth
                            sx={{ mt: 5 }}
                            {...getFieldProps('deliveryCharges')}
                        />
                    </Grid>

                    <Grid mt={5}>
                        <Typography fontSize={15} fontWeight={500}>Parcel Max Quantity</Typography>
                        <Typography variant='caption'> Put the limit for parcel quantity.</Typography>
                        <CustomTextField1
                            type={'number'}
                            errorMsg={t(errors?.parcelMaxQty as string)}
                            fullWidth
                            sx={{ mt: 5 }}
                            {...getFieldProps('parcelMaxQty')}
                        />
                    </Grid>

                    <Grid mt={5}>
                        <Typography fontSize={15} fontWeight={500}>Parcel Max Weight</Typography>
                        <Typography variant='caption'>Put the limit for parcel weight (Kilogram unit).</Typography>
                        <CustomTextField1
                            type={'number'}
                            errorMsg={t(errors?.parcelMaxWeight as string)}
                            fullWidth
                            sx={{ mt: 5 }}
                            {...getFieldProps('parcelMaxWeight')}
                        />
                    </Grid>

                    <Grid mt={5}>
                        <Typography fontSize={15} fontWeight={500}>Parcel Max Height</Typography>
                        <Typography variant='caption'>Put the limit for parcel height  (Meter unit).</Typography>
                        <CustomTextField1
                            type={'number'}
                            errorMsg={t(errors?.parcelMaxHeight as string)}
                            fullWidth
                            sx={{ mt: 5 }}
                            {...getFieldProps('parcelMaxHeight')}
                        />
                    </Grid>

                    <Grid mt={5}>
                        <Typography fontSize={15} fontWeight={500}>Parcel Max Width</Typography>
                        <Typography variant='caption'>Put the limit for parcel width.</Typography>
                        <CustomTextField1
                            type={'number'}
                            errorMsg={t(errors?.parcelMaxWidth as string)}
                            fullWidth
                            sx={{ mt: 5 }}
                            {...getFieldProps('parcelMaxWidth')}
                        />
                    </Grid>

                    <Grid mt={5}>
                        <Typography fontSize={15} fontWeight={500}>Parcel Max Length</Typography>
                        <Typography variant='caption'>Put the limit for parcel length</Typography>
                        <CustomTextField1
                            type={'number'}
                            errorMsg={t(errors?.parcelMaxLength as string)}
                            fullWidth
                            sx={{ mt: 5 }}
                            {...getFieldProps('parcelMaxLength')}
                        />
                    </Grid>
                    <Grid>
                        <CustomButton
                            variant='contained'
                            sx={{ mb: 4, mt: 8 }}
                            disabled={isLoading}
                            loading={isLoading}
                            type='submit'
                            fullWidth={true}
                        >
                            {t(`Update`)}
                        </CustomButton>
                    </Grid>

                </Grid>
            </Grid>
        </form>
    )
}

export default SettingsDetail
