import { deleteMethod, getMethod, postMethod } from '@/utils/apiServices';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// Action

export const getContactUs = createAsyncThunk('contactUsSlice/getContactUs', async (params) => {
    const response = await getMethod(`contact-us`);
    return (response)
})



const getContactUsObj = {
    loading: false,
    error: false,
    contactUs: {}
}



export const contactUsSlice = createSlice({
    name: 'contactUsSlice',
    initialState: {
        getContactUsObj,
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getContactUs.pending, (state, action) => {
                state.getContactUsObj.loading = true;
            })
            .addCase(getContactUs.fulfilled, (state, action) => {
                state.getContactUsObj.loading = false;
                state.getContactUsObj.contactUs = action?.payload?.data

            })
            .addCase(getContactUs.rejected, (state, action) => {
                state.getContactUsObj.loading = false;
                state.getContactUsObj.error = true;
            })

    },
});

export const { } = contactUsSlice.actions

export default contactUsSlice.reducer


