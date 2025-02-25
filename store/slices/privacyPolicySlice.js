import { deleteMethod, getMethod, postMethod } from '@/utils/apiServices';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// Action

export const getPrivacyPolicy = createAsyncThunk('privacyPolicySlice/getPrivacyPolicy', async (params) => {
    const response = await getMethod(`privacy-policy`);
    return (response)
})



const getPrivacyPolicyObj = {
    loading: false,
    error: false,
    privacyAndPolicy: {}
}



export const privacyPolicySlice = createSlice({
    name: 'privacyPolicySlice',
    initialState: {
        getPrivacyPolicyObj,
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getPrivacyPolicy.pending, (state, action) => {
                state.getPrivacyPolicyObj.loading = true;
            })
            .addCase(getPrivacyPolicy.fulfilled, (state, action) => {
                state.getPrivacyPolicyObj.loading = false;
                state.getPrivacyPolicyObj.privacyAndPolicy = action?.payload?.data

            })
            .addCase(getPrivacyPolicy.rejected, (state, action) => {
                state.getPrivacyPolicyObj.loading = false;
                state.getPrivacyPolicyObj.error = true;
            })

    },
});

export const { } = privacyPolicySlice.actions

export default privacyPolicySlice.reducer


