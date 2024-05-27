import { getMethod, postMethod } from '@/utils/apiServices';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// Action

export const getCapsuleCompanyDetailData = createAsyncThunk('capsuleDetailSlice/getCapsuleCompanyDetailData', async (params) => {
    const response = await getMethod(`company/detail?slug=${params?.slug}&pageName=${params?.pageName}`,);
    return (response)
});

const getCapsuleCompanyDetailObj = {
    loading: false,
    error: false,
    capsuleCompanyDetailData: {},
    capsulePlus: false

}

const seoObj = {
    loading: false,
    error: false,
    seo: ""
}

export const capsuleDetailSlice = createSlice({
    name: 'capsuleDetailSlice',
    initialState: {
        getCapsuleCompanyDetailObj,
        seoObj
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getCapsuleCompanyDetailData.pending, (state, action) => {
                state.getCapsuleCompanyDetailObj.loading = true;
            })
            .addCase(getCapsuleCompanyDetailData.fulfilled, (state, action) => {
                state.getCapsuleCompanyDetailObj.loading = false;
                state.getCapsuleCompanyDetailObj.capsuleCompanyDetailData = action?.payload?.data
                state.getCapsuleCompanyDetailObj.capsulePlus = action?.payload?.capsuleplus
                const seo = (action?.payload?.data ? ({
                    title: action?.payload?.data?.metaTitle ? action?.payload?.data?.metaTitle : '',
                    description: action?.payload?.data?.metaDescription ? action?.payload?.data?.metaDescription : '',
                }) : null)
                state.seoObj.seo = seo;

            })
            .addCase(getCapsuleCompanyDetailData.rejected, (state, action) => {
                state.getCapsuleCompanyDetailObj.loading = false;
                state.getCapsuleCompanyDetailObj.error = true;
            })
    },
});

export const { } = capsuleDetailSlice.actions

export default capsuleDetailSlice.reducer



