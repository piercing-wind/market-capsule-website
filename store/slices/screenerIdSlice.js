import { apiEndPoints } from '@/utils/apiEndPoints';
import { getMethod, postMethod } from '@/utils/apiServices';
import { fi } from '@faker-js/faker';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
// Action

export const getScreenerIdData = createAsyncThunk('screenerIdSlice/getScreenerIdData', async (params) => {
    const response = await getMethod(`bucket/detail?slug=${params?.slug}`);
    return (response)
});

export const getFilterSectionList = createAsyncThunk('screenerIdSlice/getFilterSectionList', async (params) => {
    const response = await getMethod(`bucket/filter/top-it-company`);
    return (response)
});



const getScreenerIdDataObj = {
    loading: false,
    error: false,
    screenerIdData: {},
}

const getFilterSectionObj = {
    loading: false,
    error: false,
    filterSectionList: []
}

export const screenerIdSlice = createSlice({
    name: 'screenerIdSlice',
    initialState: {
        getScreenerIdDataObj,
        getFilterSectionObj
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder

            .addCase(getScreenerIdData.pending, (state, action) => {
                state.getScreenerIdDataObj.loading = true;
            })
            .addCase(getScreenerIdData.fulfilled, (state, action) => {
                state.getScreenerIdDataObj.loading = false;
                state.getScreenerIdDataObj.screenerIdData = action?.payload?.data

            })
            .addCase(getScreenerIdData.rejected, (state, action) => {
                state.getScreenerIdDataObj.loading = false;
                state.getScreenerIdDataObj.error = true;
            })
            .addCase(getFilterSectionList.pending, (state, action) => {
                state.getFilterSectionObj.loading = true;
            })
            .addCase(getFilterSectionList.fulfilled, (state, action) => {
                state.getFilterSectionObj.loading = false;
                state.getFilterSectionObj.filterSectionList = action?.payload?.filters

            })
            .addCase(getFilterSectionList.rejected, (state, action) => {
                state.getFilterSectionObj.loading = false;
                state.getFilterSectionObj.error = true;
            })
    },
});

export const { } = screenerIdSlice.actions

export default screenerIdSlice.reducer



