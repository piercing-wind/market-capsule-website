import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

const promoCodeModalObj = {
    showForm: true,

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
    // extraReducers: {
    //     [HYDRATE]: (state, action) => {
    //         return {
    //             ...state,
    //             ...action.payload.subscriptionSlice,
    //         };
    //     },
    // }
});

export const { setShowForm } = subscriptionSlice.actions

export default subscriptionSlice.reducer

