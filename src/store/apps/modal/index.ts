import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@store/index'


type ModalStatetypes = {
    data?: any
    view:
    "GENERAL_DELETE_VIEW" |
    "CREATE_ROLE_VIEW" |
    "EDIT_ROLE_VIEW" |
    "USER_STATUS_MODAL" |
    "HELPER_STATUS_MODAL" |
    "SUBSCRIPTIONS_STATUS_MODAL" |
    "SUBSCRIPTIONS_DELETE_MODAL" |
    "CREATE_PERMISSION_VIEW" |
    "EDIT_PERMISSION_VIEW" |
    "EDIT_FAQ_ENTRY"|
    "DELETE_FAQ_ENTRY"|
    "UPDATE_FAQ_ENTRY"
}

const initialState: ModalStatetypes = { view: '', data: null }

const modalSlice = createSlice({
    name: 'modalSlice',
    initialState,
    reducers: {
        setModalState: (state: ModalStatetypes, action: PayloadAction<ModalStatetypes>) => {
            state.view = action.payload.view;
            state.data = action.payload.data;
        },
        removeModalState: (state: ModalStatetypes) => {
            state.view = ""
            state.data = null;
        }
    }
})

export const useModal = () => {
    const modalState: ModalStatetypes = useSelector((state: RootState) => state.modal);
    const dispatch = useDispatch();

    const openModal = ({ view, data }: ModalStatetypes) => {
        dispatch(setModalState({ view, data }));
    }
    const closeModal = () => {
        dispatch(removeModalState());
    }

    return { modalState, openModal, closeModal }
}

export const { removeModalState, setModalState } = modalSlice.actions;
export default modalSlice.reducer;
