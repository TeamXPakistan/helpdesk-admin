
import { useTranslation } from "react-i18next";
import {  FaqEntries } from "@ts-types/generated";
import { useModal } from "@store/apps/modal";
import { Fragment, useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";

import { useFaqEntryQuery } from "@data/faq-entries/faq-entry-query";
import Spinner from "@components/common/spinner/spinner";
import CustomError from "@components/common/error/custom-error";

type PropType = {
    formData: FaqEntries
}

const ViewFaqModal = ({ formData }: PropType) => {
    const { t } = useTranslation(['form'])
    const { closeModal, modalState } = useModal();
    console.log(modalState)
    const [open, setOpen] = useState<boolean>(true);

    const { data: faqEntry , isLoading: fetchingFaq, error: faqError } = useFaqEntryQuery(modalState?.data?.id)
    console.log(faqEntry)
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
                fullWidth={true}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                {fetchingFaq && <Spinner />}
                {faqError && <CustomError sx={{ justifyContent: 'center' }} errorMsg={faqError?.message} />}
                {!fetchingFaq && !faqError &&
                <>
                <DialogTitle align='center' typography={"h4"} id='alert-dialog-title'>Edit Faq Entry</DialogTitle>
                <DialogContent>
                 
                </DialogContent>
                </>}

            </Dialog>
        </Fragment>
    )
}

export default ViewFaqModal;
