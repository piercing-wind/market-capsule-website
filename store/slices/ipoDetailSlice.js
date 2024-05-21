import { getMethod, postMethod } from '@/utils/apiServices';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// Action

export const getIpoCompanyDetailData = createAsyncThunk('ipoDetailSlice/getIpoCompanyDetailData', async (params) => {
    const response = await getMethod(`company/detail?slug=${params?.slug}&pageName=${params?.pageName}`,);
    return (response)
});

const getIpoCompanyDetailObj = {
    loading: false,
    error: false,
    ipoCompanyDetailData: {},
    capsulePlus: false

}

export const ipoDetailSlice = createSlice({
    name: 'ipoDetailSlice',
    initialState: {
        getIpoCompanyDetailObj,
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getIpoCompanyDetailData.pending, (state, action) => {
                state.getIpoCompanyDetailObj.loading = true;
            })
            .addCase(getIpoCompanyDetailData.fulfilled, (state, action) => {
                state.getIpoCompanyDetailObj.loading = false;
                state.getIpoCompanyDetailObj.ipoCompanyDetailData = action?.payload?.data
                state.getIpoCompanyDetailObj.capsulePlus = action?.payload?.capsuleplus
            })
            .addCase(getIpoCompanyDetailData.rejected, (state, action) => {
                state.getIpoCompanyDetailObj.loading = false;
                state.getIpoCompanyDetailObj.error = true;
            })
    },
});

export const { } = ipoDetailSlice.actions

export default ipoDetailSlice.reducer



