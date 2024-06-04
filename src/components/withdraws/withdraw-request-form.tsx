import CustomTextField1 from '@components/common/text-field/custom-text-field-1'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { t } from 'i18next';
import { useCreateWithdrawRequestMutation } from '@data/withdraws/create-withdraw-request-mutation';
import { WithdrawRequest } from '@ts-types/generated';
import CircularProgress from '@mui/material/CircularProgress';

interface Props {
    closeModal: () => void;
}

const WithdrawRequestForm = ({ closeModal }: Props) => {
    const { mutate, isLoading } = useCreateWithdrawRequestMutation()

    const initialValues: WithdrawRequest = {
        amount: '',
        requestSpecialNote: '',
    }

    const { handleSubmit, errors, getFieldProps } = useFormik({
        initialValues,
        validationSchema: Yup.object().shape({
            amount: Yup.string().required('Amount is required').min(1, 'amount should not be less than 1'),
            requestSpecialNote: Yup.string(),
        }),
        onSubmit: (values, { resetForm }) => handleCreateRequest(values, resetForm)
    })

    const handleCreateRequest = (values: WithdrawRequest, resetForm: any) => {
        mutate({ ...values },
            {
                onSuccess: () => {
                    resetForm({ values: '' })
                    closeModal();
                }
            }
        )
    }

    if (isLoading) return <CircularProgress />

    return (
        <form noValidate autoComplete='off' onSubmit={handleSubmit}>
            <Grid>
                <Grid sx={{ marginBottom: 2 }}>
                    <Grid item xs={6}>
                        <Typography mb={2} mt={2} fontSize={15} fontWeight={500}>Amount</Typography>
                        <CustomTextField1
                            type={'number'}
                            errorMsg={t(errors?.amount as string)}
                            fullWidth
                            sx={{ mt: 5 }}
                            {...getFieldProps('amount')}
                        />
                    </Grid>
                </Grid>
                <Grid sx={{ marginBottom: 2 }}>
                    <Grid item xs={6}>
                        <Typography mb={2} mt={3} fontSize={15} fontWeight={500}>Special Instruction</Typography>
                        <CustomTextField1
                            multiline
                            rows={4}
                            errorMsg={t(errors?.requestSpecialNote as string)}
                            fullWidth
                            sx={{ mt: 5 }}
                            {...getFieldProps('requestSpecialNote')}
                        />
                    </Grid>
                </Grid>
                <Grid>
                    <Button fullWidth type='submit' variant='contained' sx={{ mt: 5, mb: 5 }}>
                        Create Request
                    </Button>
                </Grid>
            </Grid>
        </form>
    )
}

export default WithdrawRequestForm
