
import { useModal } from '@store/apps/modal';
import dynamic from 'next/dynamic';

const CreateRoleModalView = dynamic(() => import('@components/roles/create-role-modal-view'))
const EditRoleView = dynamic(() => import('@components/roles/edit-role-modal-view'))
const GeneralDeleteView = dynamic(() => import('./general-delete-view'))
const UserStatusModal = dynamic(() => import('@components/users/user-status-modal'));
const HelperStatusModal = dynamic(() => import('@components/helpers/helper-status-modal'));
const SubscriptionsEditModal = dynamic(() => import('@components/subscriptions/subscriptionEditModal'));
const SubscriptionsDeleteModal = dynamic(() => import('@components/subscriptions/subscriptionDeleteModal'));
const CreatePermissionView = dynamic(() => import('@components/permissions/create-permission-modal-view'));
const EditPermissionView = dynamic(() => import('@components/permissions/edit-permission-modal-view'));
const FaqEntriesDeleteModal = dynamic(() => import('@components/content-management/Faq/faqEntry-Delete-modal'));
const EditFaqModal = dynamic(() => import('@components/content-management/Faq/faqEditModal'));
const FaqEntriesCreateModal = dynamic(() => import('@components/content-management/Faq/faqEntry-create-modal'));

const ManagedModal = () => {
    const { modalState: { view } } = useModal();

    return (
        <>
            {view === "GENERAL_DELETE_VIEW" && < GeneralDeleteView />}
            {view === "CREATE_ROLE_VIEW" && < CreateRoleModalView />}
            {view === "CREATE_PERMISSION_VIEW" && < CreatePermissionView />}
            {view === "EDIT_ROLE_VIEW" && < EditRoleView />}
            {view === "EDIT_PERMISSION_VIEW" && <EditPermissionView />}
            {view === "USER_STATUS_MODAL" && <UserStatusModal />}
            {view === "HELPER_STATUS_MODAL" && <HelperStatusModal />}
            {view === "SUBSCRIPTIONS_STATUS_MODAL" && <SubscriptionsEditModal />}
            {view === "SUBSCRIPTIONS_DELETE_MODAL" && <SubscriptionsDeleteModal />}
            {view === "DELETE_FAQ_ENTRY" && <FaqEntriesDeleteModal />}
            {view === "UPDATE_FAQ_ENTRY" && <EditFaqModal />}
            {view === "CREATE_FAQ_ENTRY" && <FaqEntriesCreateModal />}
       
        </>
    )
};

export default ManagedModal;
