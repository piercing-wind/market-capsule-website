import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

const loginModalObj = {
    showForm: false,
    authType: "login"

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
        setAuthType(state, action) {
            state.loginModal.authType = action.payload
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

export const { setShowForm, setAuthType } = authSlice.actions

export default authSlice.reducer

