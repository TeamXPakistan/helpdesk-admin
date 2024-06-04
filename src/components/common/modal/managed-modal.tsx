import { useModal } from '@store/apps/modal';
import dynamic from 'next/dynamic';

const AcceptShopModalView = dynamic(() => import('@components/shop/accept-shop-modal-view'))
const RejectShopModalView = dynamic(() => import('@components/shop/reject-shop-modal-view'))
const CancelOrderModalView = dynamic(() => import('@components/orders/cancel-order-modal-view'))
const CreateRoleModalView = dynamic(() => import('@components/roles/create-role-modal-view'))
const EditRoleView = dynamic(() => import('@components/roles/edit-role-modal-view'))
const UserOrderDetailsView = dynamic(() => import('@components/users/user-order-details-modal-view'))
const ShopReviewImagesModal = dynamic(() => import('@components/reviews/shop-review-images-modal-view'))
const DriverOrderDetailsView = dynamic(() => import('@components/drivers/driver-order-details-modal-view'))
const DriverParcelDetailsView = dynamic(() => import('@components/drivers/driver-parcel-details-modal-view'))
const DriverCurrentOrderDetailsView = dynamic(() => import('@components/drivers/driver-current-order-details-modal-view'))
const DriverCurrentParcelDetailsView = dynamic(() => import('@components/drivers/driver-current-parcel-details-modal-view'))
const GeneralDeleteView = dynamic(() => import('./general-delete-view'))
const WithdrawRequestDetailsView = dynamic(() => import('@components/withdraws/withdraw-request-details-view'))
const CreateWithdrawRequest = dynamic(() => import('@components/withdraws/create-withdraw-request'))
const AdminProcessWithdrawRequest = dynamic(() => import('@components/withdraws/admin-process-withdraw-request'))

const ManagedModal = () => {
    const { modalState: { view } } = useModal();

    return (
        <>
            {view === "ACCEPT_SHOP_VIEW" && < AcceptShopModalView />}
            {view === "REJECT_SHOP_VIEW" && < RejectShopModalView />}
            {view === "GENERAL_DELETE_VIEW" && < GeneralDeleteView />}
            {view === "CANCEL_ORDER_VIEW" && < CancelOrderModalView />}
            {view === "CREATE_ROLE_VIEW" && < CreateRoleModalView />}
            {view === "EDIT_ROLE_VIEW" && < EditRoleView />}
            {view === "USER_ORDER_DETAILS_VIEW" && < UserOrderDetailsView />}
            {view === "SHOP_REVIEW_IMAGES_VIEW" && < ShopReviewImagesModal />}
            {view === "DRIVER_ORDER_DETAILS_VIEW" && < DriverOrderDetailsView />}
            {view === "DRIVER_PARCEL_DETAILS_VIEW" && < DriverParcelDetailsView />}
            {view === "DRIVER_CURRENT_ORDER_DETAILS_VIEW" && < DriverCurrentOrderDetailsView />}
            {view === "DRIVER_CURRENT_PARCEL_DETAILS_VIEW" && < DriverCurrentParcelDetailsView />}
            {view === "WITHDRAW_REQUEST" && < WithdrawRequestDetailsView />}
            {view === "CREATE_WITHDRAW_REQUEST" && < CreateWithdrawRequest />}
            {view === "PROCESS_WITHDRAW_REQUEST" && < AdminProcessWithdrawRequest />}
        </>
    );
};

export default ManagedModal;