import { getMethod, postMethod } from '@/utils/apiServices';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// Action

export const getIpoCompanyDetailData = createAsyncThunk('ipoDetailSlice/getIpoCompanyDetailData', async (params) => {
    const response = await getMethod(`ipo/detail/${params?.slug}`,);
    return (response)
});



const getIpoCompanyDetailObj = {
    loading: false,
    error: false,
    ipoCompanyDetailData: {},
    capsulePlus: false

}

const seoObj = {
    loading: false,
    error: false,
    seo: ""
}



export const ipoDetailSlice = createSlice({
    name: 'ipoDetailSlice',
    initialState: {
        getIpoCompanyDetailObj,
        seoObj
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
                // state.getIpoCompanyDetailObj.capsulePlus = action?.payload?.capsuleplus
                const seo = (action?.payload?.data ? ({
                    title: action?.payload?.data?.metaTitle ? action?.payload?.data?.metaTitle : '',
                    description: action?.payload?.data?.metaDescription ? action?.payload?.data?.metaDescription : '',
                }) : null)
                state.seoObj.seo = seo;

            })
            .addCase(getIpoCompanyDetailData.rejected, (state, action) => {
                state.getIpoCompanyDetailObj.loading = false;
                state.getIpoCompanyDetailObj.error = true;
            })
    },
});

export const { } = ipoDetailSlice.actions

export default ipoDetailSlice.reducer



