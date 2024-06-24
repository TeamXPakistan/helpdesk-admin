import CustomButton from "@components/common/Button/custom-button";
import CustomTextField1 from "@components/common/text-field/custom-text-field-1";
import { useRolesQuery } from "@data/roles/roles-query";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { Faq, Scalars } from "@ts-types/generated";
import { UseFaqEntryUpdateMutation } from "@data/faq-entries/faq-entry-update.mutate";
import updatefaqSchema from "./update-schema";
import { useModal } from "@store/apps/modal";
import { Fragment, useState } from "react";
import { Dialog } from "@mui/material";
import { useFaqEntryQuery } from "@data/faq-entries/faq-entry-query";

type PropType = {
    formData: Faq
}

type FormValues = {
    title: string | undefined;
    description: string | null | undefined;

}

const EditFaqModal = ({ formData }: PropType) => {
    const { t } = useTranslation(['form'])
    const [open, setOpen] = useState<boolean>(true);

    const { mutate: updateFaqEntry, isLoading } = UseFaqEntryUpdateMutation();
    const { closeModal, modalState } = useModal();

    const FaqEntriesData: Faq = modalState?.data;


    const initialValues: FormValues = {
        title: FaqEntriesData.title,
        description: FaqEntriesData.description,
    }

    const { handleSubmit, errors, getFieldProps, setFieldValue, values } = useFormik({
        initialValues,
        enableReinitialize: true,
        validationSchema: updatefaqSchema,
        onSubmit: (values, { resetForm }) => handelUpdateFaq(values, resetForm)
    })
    const handelUpdateFaq = (values: FormValues, resetForm: any) => {
        updateFaqEntry(
            {
                title: FaqEntriesData.title,
                description: FaqEntriesData.description,
                id: FaqEntriesData.id
            },
            {
                onSuccess: () => {
                    resetForm({ values: '' })
                }
            }
        )
    }
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
            <form noValidate autoComplete='off' onSubmit={handleSubmit}>
                <CustomTextField1
                    errorMsg={t(errors?.title as string)}
                    fullWidth
                    sx={{ mb: 5 }}
                    label={t(`Question`)}
                    {...getFieldProps('title')}
                />
                <CustomTextField1
                    errorMsg={t(errors?.description as string)}
                    fullWidth
                    sx={{ mb: 5 }}
                    label={t(`Answer`)}
                    {...getFieldProps('description')}
                />
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
            </form>
            </Dialog>
        </Fragment>)
}

export default EditFaqModal;
