import { apiEndPoints } from '@/utils/apiEndPoints';
import { getMethod, postMethod } from '@/utils/apiServices';
import { fi } from '@faker-js/faker';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
// Action

export const getScreenerCompanyData = createAsyncThunk('screenerSlugDetailSlice/getScreenerCompanyData', async (params) => {
    const response = await getMethod(`company/detail?slug=${params?.slug}&pageName=${params?.pageName}`,);
    return (response)
});

export const getDisclaimerData = createAsyncThunk('screenerSlugDetailSlice/getDisclaimerData', async (params) => {
    const response = await getMethod(`disclaimer?fields[0]=description`,);
    return (response)
});
const getScreenerCompanyDetailObj = {
    loading: false,
    error: false,
    screenerCompanyDetailData: {},
    capsulePlus: false

}

const getDisclaimerDataObj = {
    loading: false,
    error: false,
    description: {},

}


const seoObj = {
    loading: false,
    error: false,
    seo: ""
}

export const screenerSlugDetailSlice = createSlice({
    name: 'screenerSlugDetailSlice',
    initialState: {
        getScreenerCompanyDetailObj,
        getDisclaimerDataObj,
        seoObj
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getScreenerCompanyData.pending, (state, action) => {
                state.getScreenerCompanyDetailObj.loading = true;
            })
            .addCase(getScreenerCompanyData.fulfilled, (state, action) => {
                state.getScreenerCompanyDetailObj.loading = false;
                state.getScreenerCompanyDetailObj.screenerCompanyDetailData = action?.payload?.data
                state.getScreenerCompanyDetailObj.capsulePlus = action?.payload?.capsuleplus
                const seo = (action?.payload?.data ? ({
                    title: action?.payload?.data?.metaTitle ? action?.payload?.data?.metaTitle : '',
                    description: action?.payload?.data?.metaDescription ? action?.payload?.data?.metaDescription : '',
                }) : null)
                state.seoObj.seo = seo;

            })
            .addCase(getScreenerCompanyData.rejected, (state, action) => {
                state.getScreenerCompanyDetailObj.loading = false;
                state.getScreenerCompanyDetailObj.error = true;
            })
            .addCase(getDisclaimerData.pending, (state, action) => {
                state.getDisclaimerDataObj.loading = true;
            })
            .addCase(getDisclaimerData.fulfilled, (state, action) => {
                state.getDisclaimerDataObj.loading = false;
                state.getDisclaimerDataObj.description = action?.payload?.data

            })
            .addCase(getDisclaimerData.rejected, (state, action) => {
                state.getDisclaimerDataObj.loading = false;
                state.getDisclaimerDataObj.error = true;
            })

    },
});

export const { } = screenerSlugDetailSlice.actions

export default screenerSlugDetailSlice.reducer



