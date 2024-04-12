import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

const loginModalObj = {
    showForm: true,

}
export const authSlice = createSlice({
    name: 'authSlice',
    initialState: {
        loginModal: loginModalObj,

    },
    reducers: {
        setShowForm(state, action) {

            state.loginModal.showForm = action.payload
        },
    },
    // extraReducers: {
    //     [HYDRATE]: (state, action) => {
    //         return {
    //             ...state,
    //             ...action.payload.authSlice,
    //         };
    //     },
    // }
});

export const { setShowForm } = authSlice.actions

export default authSlice.reducer

