import { deleteMethod, getMethod, postMethod } from '@/utils/apiServices';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// Action

export const getAboutUs = createAsyncThunk('aboutUsSlice/getAboutUs', async (params) => {
    const response = await getMethod(`about-us`);
    return (response)
})



const getAboutUsObj = {
    loading: false,
    error: false,
    aboutUs: {}
}



export const aboutUsSlice = createSlice({
    name: 'aboutUsSlice',
    initialState: {
        getAboutUsObj,
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getAboutUs.pending, (state, action) => {
                state.getAboutUsObj.loading = true;
            })
            .addCase(getAboutUs.fulfilled, (state, action) => {
                state.getAboutUsObj.loading = false;
                state.getAboutUsObj.aboutUs = action?.payload?.data

            })
            .addCase(getAboutUs.rejected, (state, action) => {
                state.getAboutUsObj.loading = false;
                state.getAboutUsObj.error = true;
            })

    },
});

export const { } = aboutUsSlice.actions

export default aboutUsSlice.reducer


