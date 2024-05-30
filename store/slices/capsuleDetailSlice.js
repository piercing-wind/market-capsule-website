import { getMethod, postMethod } from '@/utils/apiServices';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// Action

export const getCapsuleCompanyDetailData = createAsyncThunk('capsuleDetailSlice/getCapsuleCompanyDetailData', async (params) => {
    const response = await getMethod(`company/detail?slug=${params?.slug}&pageName=${params?.pageName}`,);
    return (response)
});

export const getSharePriceAndVolume = createAsyncThunk('capsuleDetailSlice/getSharePriceAndVolume', async (params) => {
    const response = await getMethod(`company-share-price/list`, params);
    return (response)
});

export const getOperationDetailQuetarly = createAsyncThunk('capsuleDetailSlice/getOperationDetailQuetarly', async (params) => {
    const response = await getMethod(`operation-detail/list`, params);
    return (response)
});

export const getOperationDetailYearly = createAsyncThunk('capsuleDetailSlice/getOperationDetailYearly', async (params) => {
    const response = await getMethod(`operation-detail/list`, params);
    return (response)
});

export const getPriceAndVolume = createAsyncThunk('capsuleDetailSlice/getPriceAndVolume', async (params) => {
    const response = await getMethod(`company/priceAndVolume`, params);
    return (response)
});

const getCapsuleCompanyDetailObj = {
    loading: false,
    error: false,
    capsuleCompanyDetailData: {},
    capsulePlus: false

}

const getSharePriceAndVolumeObj = {
    loading: false,
    error: false,
    sharePriceAndVolume: [],

}
const getOperationDetailQuetarlyObj = {
    loading: false,
    error: false,
    quetarlyData: [],

}

const getOperationDetailYearlyObj = {
    loading: false,
    error: false,
    yearlyData: [],

}

const getPriceAndVolumeObj = {
    loading: false,
    error: false,
    priceAndVolumeData: [],

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
        seoObj,
        getOperationDetailQuetarlyObj,
        getOperationDetailYearlyObj,
        getSharePriceAndVolumeObj,
        getPriceAndVolumeObj
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
            .addCase(getOperationDetailQuetarly.pending, (state, action) => {
                state.getOperationDetailQuetarlyObj.loading = true;
            })
            .addCase(getOperationDetailQuetarly.fulfilled, (state, action) => {
                state.getOperationDetailQuetarlyObj.loading = false;
                state.getOperationDetailQuetarlyObj.quetarlyData = action?.payload?.data

            })
            .addCase(getOperationDetailQuetarly.rejected, (state, action) => {
                state.getOperationDetailQuetarlyObj.loading = false;
                state.getOperationDetailQuetarlyObj.error = true;
            })

            .addCase(getOperationDetailYearly.pending, (state, action) => {
                state.getOperationDetailYearlyObj.loading = true;
            })
            .addCase(getOperationDetailYearly.fulfilled, (state, action) => {
                state.getOperationDetailYearlyObj.loading = false;
                state.getOperationDetailYearlyObj.yearlyData = action?.payload?.data

            })
            .addCase(getOperationDetailYearly.rejected, (state, action) => {
                state.getOperationDetailYearlyObj.loading = false;
                state.getOperationDetailYearlyObj.error = true;
            })
            .addCase(getSharePriceAndVolume.pending, (state, action) => {
                state.getSharePriceAndVolumeObj.loading = true;
            })
            .addCase(getSharePriceAndVolume.fulfilled, (state, action) => {
                state.getSharePriceAndVolumeObj.loading = false;
                state.getSharePriceAndVolumeObj.sharePriceAndVolume = action?.payload?.data

            })
            .addCase(getSharePriceAndVolume.rejected, (state, action) => {
                state.getSharePriceAndVolumeObj.loading = false;
                state.getSharePriceAndVolumeObj.error = true;
            })
            .addCase(getPriceAndVolume.pending, (state, action) => {
                state.getPriceAndVolumeObj.loading = true;
            })
            .addCase(getPriceAndVolume.fulfilled, (state, action) => {
                state.getPriceAndVolumeObj.loading = false;
                state.getPriceAndVolumeObj.priceAndVolumeData = action?.payload?.data

            })
            .addCase(getPriceAndVolume.rejected, (state, action) => {
                state.getPriceAndVolumeObj.loading = false;
                state.getPriceAndVolumeObj.error = true;
            })
    },
});

export const { } = capsuleDetailSlice.actions

export default capsuleDetailSlice.reducer



