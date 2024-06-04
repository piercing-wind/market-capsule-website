import { deleteMethod, getMethod, postMethod } from '@/utils/apiServices';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// Action

export const getTermsAndConditions = createAsyncThunk('termsAndConditionsSlice/getTermsAndConditions', async (params) => {
    const response = await getMethod(`term-and-condition`);
    return (response)
})



const getTermsAndConditionsObj = {
    loading: false,
    error: false,
    termsAndConditions: {}
}



export const termsAndConditionsSlice = createSlice({
    name: 'termsAndConditionsSlice',
    initialState: {
        getTermsAndConditionsObj,
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getTermsAndConditions.pending, (state, action) => {
                state.getTermsAndConditionsObj.loading = true;
            })
            .addCase(getTermsAndConditions.fulfilled, (state, action) => {
                state.getTermsAndConditionsObj.loading = false;
                state.getTermsAndConditionsObj.termsAndConditions = action?.payload?.data

            })
            .addCase(getTermsAndConditions.rejected, (state, action) => {
                state.getTermsAndConditionsObj.loading = false;
                state.getTermsAndConditionsObj.error = true;
            })

    },
});

export const { } = termsAndConditionsSlice.actions

export default termsAndConditionsSlice.reducer


