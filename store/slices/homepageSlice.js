import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

const filterBtnObj = {
    showFilterModalForm: true,

}
export const homepageSlice = createSlice({
    name: 'homepageSlice',
    initialState: {
        showFilterModal: filterBtnObj,
    },
    reducers: {
        setShowFilterModalForm(state, action) {
            state.showFilterModal.showFilterModalForm = action.payload
        },

    },
    // extraReducers: {
    //     [HYDRATE]: (state, action) => {
    //         return {
    //             ...state,
    //             ...action.payload.homepageSlice,
    //         };
    //     },
    // }
});

export const { setShowFilterModalForm } = homepageSlice.actions

export default homepageSlice.reducer

