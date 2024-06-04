import { createSlice } from '@reduxjs/toolkit'
import { RootState, store } from '@store/index'
import { useSelector } from 'react-redux'
import type { PayloadAction } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'


type InitialState = { value: boolean }
const initialState: { value: boolean } = { value: false }

const networkErrorSlice = createSlice({
    name: 'networkError',
    initialState,
    reducers: {
        setNetworkErrorValue: (state: InitialState, action: PayloadAction<InitialState>) => {
            state.value = action.payload.value
        }
    }
})

export const useNetworkError = () => {
    const dispatch = useDispatch()
    const networkError: boolean = useSelector((state: RootState) => state.networkError.value)

    const setNetworkError = (value: boolean) => {
        dispatch(setNetworkErrorValue({ value: value }))
    }

    return { networkError, setNetworkError }
}

export const setNetworkError = (value: boolean) => {
    store.dispatch(setNetworkErrorValue({ value: value }))
}

export const { setNetworkErrorValue } = networkErrorSlice.actions
export default networkErrorSlice.reducer
