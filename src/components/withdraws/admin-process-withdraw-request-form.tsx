import CustomTextField1 from '@components/common/text-field/custom-text-field-1'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { t } from 'i18next';
import { MerchantWithdraw } from '@ts-types/generated';
import CircularProgress from '@mui/material/CircularProgress';
import DropzoneWrapper from "src/@core/styles/libs/react-dropzone"
import SingleImageUploader from "@components/common/file-uploader/single-image-uploader"
import { useProcessWithdrawRequestMutation } from '@data/withdraws/process-withdraw-request-mutation';
import { MerchantWithDrawalStatus } from '@utils/constants';
import CustomSelect from '@components/common/select/custom-select';

type FormValues = {
    id: string,
    amount: number,
    specialNote: string,
    requestSpecialNote: string,
    status: {
        value: string,
        label: string,
    },
    screenShort: string,
    reason: string | undefined,
}
interface Props {
    closeModal: () => void;
    withdrawData: MerchantWithdraw;
}

const AdminProcessWithdrawRequestForm = ({ closeModal, withdrawData }: Props) => {
    const { mutate, isLoading } = useProcessWithdrawRequestMutation()

    const statusType = [
        {
            value: MerchantWithDrawalStatus.ACCEPTED,
            label: "Accepted",
        },
        {
            value: MerchantWithDrawalStatus.REJECTED,
            label: "Rejected",
        },
    ]

    const initialValues: FormValues = {
        id: withdrawData?._id,
        amount: withdrawData?.amount,
        specialNote: withdrawData?.status == MerchantWithDrawalStatus.PENDING ? '' : withdrawData?.specialNote,
        requestSpecialNote: withdrawData?.requestSpecialNote,
        status: {
            value: withdrawData?.status == MerchantWithDrawalStatus.PENDING ? '' : withdrawData?.status,
            label: withdrawData?.status == MerchantWithDrawalStatus.PENDING ? '' : withdrawData?.status,
        },
        screenShort: withdrawData?.status == MerchantWithDrawalStatus.PENDING ? '' : withdrawData?.screenShort,
        reason: withdrawData?.status == MerchantWithDrawalStatus.PENDING ? '' : withdrawData?.reason,
    }

    const { handleSubmit, errors, getFieldProps, values, setFieldValue } = useFormik({
        initialValues,
        validationSchema: Yup.object().shape({
            status: Yup.object().shape({
                label: Yup.string().required("Status label is required"),
                value: Yup.string().required("Status value is required")
            }).required("Status is required"),
            screenShort: Yup.string().when(['status'], (status, schema) => {
                return status && status[0]?.value === MerchantWithDrawalStatus.ACCEPTED ? schema.required("ScreenShort is required") : schema.notRequired()
            })
        }),
        onSubmit: (values, { resetForm }) => handleCreateRequest(values, resetForm)
    })

    const handleCreateRequest = (values: FormValues, resetForm: any) => {

        const updatedValues = {
            ...values,
            status: values?.status?.value,
        }

        mutate({ ...updatedValues },
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
                            disabled
                            type={'number'}
                            errorMsg={t(errors?.amount as string)}
                            fullWidth
                            sx={{ mt: 5 }}
                            {...getFieldProps('amount')}
                        />
                    </Grid>
                </Grid>
                <Grid item xs={6}>
                    <Typography mb={2} mt={3} fontSize={15} fontWeight={500}>Status</Typography>
                    <CustomSelect
                        name="status"
                        list={statusType?.map((status) => ({ label: status.label, value: status.value }))}
                        value={values?.status as FormValues["status"]}
                        onChange={(val, { action }) => {
                            if (action === "clear") {
                                setFieldValue("status", null)
                            }
                            setFieldValue("status", val)
                        }}
                        isMulti={false}
                        errorMsg={t(errors?.status?.value as string)}
                        placeHolder='Select status'
                    />
                </Grid>
                {withdrawData?.requestSpecialNote &&
                    <Grid sx={{ marginBottom: 2 }}>
                        <Grid item xs={6}>
                            <Typography mb={2} mt={3} fontSize={15} fontWeight={500}>User Special Instruction</Typography>
                            <CustomTextField1
                                disabled
                                multiline
                                rows={4}
                                errorMsg={t(errors?.requestSpecialNote as string)}
                                fullWidth
                                sx={{ mt: 5 }}
                                {...getFieldProps('requestSpecialNote')}
                            />
                        </Grid>
                    </Grid>
                }
                {values?.status?.value != MerchantWithDrawalStatus.REJECTED && withdrawData?.status !== MerchantWithDrawalStatus.REJECTED ?
                    <Grid sx={{ marginBottom: 2 }}>
                        <Grid item xs={6}>
                            <Typography mb={2} mt={3} fontSize={15} fontWeight={500}>Special Instruction</Typography>
                            <CustomTextField1
                                multiline
                                rows={4}
                                fullWidth
                                sx={{ mt: 5 }}
                                {...getFieldProps('specialNote')}
                            />
                        </Grid>
                    </Grid>
                    :
                    <Grid sx={{ marginBottom: 2 }}>
                        <Grid item xs={6}>
                            <Typography mb={2} mt={3} fontSize={15} fontWeight={500}>Reason</Typography>
                            <CustomTextField1
                                multiline
                                rows={4}
                                fullWidth
                                sx={{ mt: 5 }}
                                {...getFieldProps('reason')}
                            />
                        </Grid>
                    </Grid>
                }
                <Grid sx={{ marginBottom: 2 }}>
                    <Grid item xs={6}>
                        <Typography mb={2} mt={3} fontSize={15} fontWeight={500}>Image</Typography>
                        <DropzoneWrapper>
                            <SingleImageUploader
                                errorMsg={t(errors.screenShort as string)}
                                getFile={(val) => setFieldValue("screenShort", val)}
                                removeFile={() => setFieldValue("screenShort", "")}
                                data={initialValues?.screenShort}
                            />
                        </DropzoneWrapper>
                    </Grid>
                </Grid>
                {withdrawData?.status == MerchantWithDrawalStatus.PENDING &&
                    <Grid>
                        <Button fullWidth type='submit' variant='contained' sx={{ mt: 5, mb: 5 }}>
                            Process Request
                        </Button>
                    </Grid>
                }
            </Grid>
        </form>
    )
}

export default AdminProcessWithdrawRequestForm
