// ** MUI Imports
import { Typography } from '@mui/material'
import Alert from '@mui/material/Alert'
import { useAuthCredentials } from '@store/apps/auth'
import { ShopApprovalStatus } from '@utils/constants'

const ShopStatusAlert = () => {
    const { authValues } = useAuthCredentials()

    if (authValues.user?.shop?.status === ShopApprovalStatus.reject) {
        return (
            <Alert severity='error' variant="filled">
                <Typography color="white" variant='h5'>
                    Shop Rejected !
                </Typography>
                {authValues?.user?.shop?.reasonToRejectShop && <Typography color="white" variant='body1'>
                    <strong>Reason: </strong>
                    {authValues?.user?.shop?.reasonToRejectShop}
                </Typography>}
            </Alert >
        )
    }
    if (authValues.user?.shop?.status === ShopApprovalStatus.pending) {
        return (
            <Alert severity='info' variant="filled">
                <Typography color="white" variant='h5'>
                    Shop approval is in pending...
                </Typography>
            </Alert >
        )
    }
    return null
}

export default ShopStatusAlert;
