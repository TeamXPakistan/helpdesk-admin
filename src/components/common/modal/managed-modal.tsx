import { useModal } from '@store/apps/modal';
import dynamic from 'next/dynamic';

const CreateRoleModalView = dynamic(() => import('@components/roles/create-role-modal-view'))
const EditRoleView = dynamic(() => import('@components/roles/edit-role-modal-view'))
const GeneralDeleteView = dynamic(() => import('./general-delete-view'))
const UserStatusModal = dynamic(() => import('@components/users/user-status-modal'));
const HelperStatusModal = dynamic(() => import('@components/helpers/helper-status-modal'));
const CreatePermissionView = dynamic(() => import('@components/permissions/create-permission-modal-view'));

const ManagedModal = () => {
    const { modalState: { view } } = useModal();

    return (
        <>
            {view === "GENERAL_DELETE_VIEW" && < GeneralDeleteView />}
            {view === "CREATE_ROLE_VIEW" && < CreateRoleModalView />}
            {view === "CREATE_PERMISSION_VIEW" && < CreatePermissionView />}
            {view === "EDIT_ROLE_VIEW" && < EditRoleView />}
            {view === "USER_STATUS_MODAL" && <UserStatusModal />}
            {view === "HELPER_STATUS_MODAL" && <HelperStatusModal />}
        </>
    );
};

export default ManagedModal;
