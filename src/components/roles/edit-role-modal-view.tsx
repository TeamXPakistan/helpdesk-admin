
// ** React Imports
import { Fragment, useState } from 'react'

// ** MUI Imports
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import { useModal } from '@store/apps/modal'
import { useRoleQuery } from '@data/roles/role-query'
import Spinner from '@components/common/spinner/spinner'
import CustomError from '@components/common/error/custom-error'
import EditRoleForm from './edit-role-form'

const EditRoleView = () => {
    const { closeModal, modalState } = useModal();
    const [open, setOpen] = useState<boolean>(true)


    const handleClose = () => {
        setOpen(false)
        closeModal()
    }
    const { data, isLoading: fetchingRole, error: roleError } = useRoleQuery(modalState?.data?.roleId)

    return (
        <Fragment>
            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth={"xs"}
                fullWidth={true}
                aria-labelledby='scroll-dialog-title'
                aria-describedby='scroll-dialog-description'
            >
                {fetchingRole && <Spinner />}
                {roleError && <CustomError sx={{ justifyContent: 'center' }} errorMsg={roleError?.message} />}
                {!fetchingRole && !roleError &&
                    <>
                        <DialogTitle align='center' typography={"h5"} id='alert-dialog-title'>Edit Role</DialogTitle>
                        <DialogContent>
                            <EditRoleForm closeModal={handleClose} formData={data} />
                        </DialogContent>
                    </>
                }
            </Dialog>
        </Fragment>
    )
}

export default EditRoleView;
