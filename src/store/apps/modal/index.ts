import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@store/index'


type ModalStatetypes = {
    data?: any
    view:
    "ACCEPT_SHOP_VIEW" |
    "REJECT_SHOP_VIEW" |
    "GENERAL_DELETE_VIEW" |
    "CANCEL_ORDER_VIEW" |
    "CREATE_ROLE_VIEW" |
    "EDIT_ROLE_VIEW" |
    "USER_ORDER_DETAILS_VIEW" |
    "SHOP_REVIEW_IMAGES_VIEW" |
    "DRIVER_ORDER_DETAILS_VIEW" |
    "DRIVER_PARCEL_DETAILS_VIEW" |
    "DRIVER_CURRENT_PARCEL_DETAILS_VIEW" |
    "DRIVER_CURRENT_ORDER_DETAILS_VIEW" |
    "WITHDRAW_REQUEST" |
    "CREATE_WITHDRAW_REQUEST" |
    "PROCESS_WITHDRAW_REQUEST" |
    "USER_STATUS_MODAL" |
    "HELPER_STATUS_MODAL" |
    "SUBSCRIPTIONS_STATUS_MODAL"|
    "SUBSCRIPTIONS_DELETE_MODAL",
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
