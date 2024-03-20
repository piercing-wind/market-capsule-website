import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

export const authSlice = createSlice({
    name: 'authSlice',
    initialState: {
        counter: 0
    },
    reducers: {
        counterAdd: (state, action) => {
            state.counter = action.payload
        }
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

export const { counterAdd } = authSlice.actions

export default authSlice.reducer

