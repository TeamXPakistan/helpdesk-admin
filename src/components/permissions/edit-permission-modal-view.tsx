import { Fragment, useState } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import { useModal } from '@store/apps/modal'
import { useRoleQuery } from '@data/roles/role-query'
import Spinner from '@components/common/spinner/spinner'
import CustomError from '@components/common/error/custom-error'
import { useSinglePermissionQuery } from '@data/permissions/single-permission-query'

const EditPermissionView = () => {
    const { closeModal, modalState } = useModal();
    const [open, setOpen] = useState<boolean>(true)

    const handleClose = () => {
        setOpen(false)
        closeModal()
    }

    const { data, isLoading: fetchingPermission, error: permissionError } = useSinglePermissionQuery(modalState?.data?.permissionId)

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
                {fetchingPermission && <Spinner />}
                {permissionError && <CustomError sx={{ justifyContent: 'center' }} errorMsg={permissionError?.message} />}
                {!fetchingPermission && !permissionError &&
                    <>
                        <DialogTitle align='center' typography={"h5"} id='alert-dialog-title'>Edit Permission</DialogTitle>
                        <DialogContent>
                            {/* <EditRoleForm closeModal={handleClose} formData={data} /> */}
                        </DialogContent>
                    </>
                }
            </Dialog>
        </Fragment>
    )
}

export default EditPermissionView;
