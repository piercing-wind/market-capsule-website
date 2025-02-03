import { deleteMethod, getMethod, postMethod } from '@/utils/apiServices';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// Action

export const getRefundPolicy = createAsyncThunk('refundPolicySlice/getRefundPolicy', async (params) => {
    const response = await getMethod(`refund-policy`);
    return (response)
})



const getRefundPolicyObj = {
    loading: false,
    error: false,
    refundAndPolicy: {}
}



export const refundPolicySlice = createSlice({
    name: 'refundPolicySlice',
    initialState: {
        getRefundPolicyObj,
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getRefundPolicy.pending, (state, action) => {
                state.getRefundPolicyObj.loading = true;
            })
            .addCase(getRefundPolicy.fulfilled, (state, action) => {
                state.getRefundPolicyObj.loading = false;
                state.getRefundPolicyObj.refundAndPolicy = action?.payload?.data

            })
            .addCase(getRefundPolicy.rejected, (state, action) => {
                state.getRefundPolicyObj.loading = false;
                state.getRefundPolicyObj.error = true;
            })

    },
});

export const { } = refundPolicySlice.actions

export default refundPolicySlice.reducer


