import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';


const promoCodeModalObj = {
    showForm: false,

}


export const subscriptionSlice = createSlice({
    name: 'subscriptionSlice',
    initialState: {
        promoCodeModal: promoCodeModalObj,
    },
    reducers: {
        setShowForm(state, action) {
            state.promoCodeModal.showForm = action.payload
        },

    },
    extraReducers: (builder) => {

    }

});

export const {
    setShowForm,

} = subscriptionSlice.actions

export default subscriptionSlice.reducer

