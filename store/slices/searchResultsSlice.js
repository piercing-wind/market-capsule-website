import { apiEndPoints } from '@/utils/apiEndPoints';
import { getMethod } from '@/utils/apiServices';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
// Action

export const getGlobalSearchList = createAsyncThunk('searchResultsSlice/getGlobalSearchList', async (params) => {
    const response = await getMethod(`search/globalSearch?search=${params?.search}`);
    return (response)
});

const getGlobalSearchObj = {
    loading: false,
    error: false,
    globalSearchList: {},
    globalSearchTotalList: 0,
}

export const searchResultsSlice = createSlice({
    name: 'searchResultsSlice',
    initialState: {
        getGlobalSearchObj
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(getGlobalSearchList.pending, (state, action) => {
                state.getGlobalSearchObj.loading = true;
                state.getGlobalSearchObj.error = false;
            })
            .addCase(getGlobalSearchList.fulfilled, (state, action) => {
                state.getGlobalSearchObj.loading = false;
                state.getGlobalSearchObj.error = false;
                state.getGlobalSearchObj.globalSearchList = action?.payload?.data
                state.getGlobalSearchObj.globalSearchTotalList = action?.payload?.count;

            })
            .addCase(getGlobalSearchList.rejected, (state, action) => {
                state.getGlobalSearchObj.loading = false;
                state.getGlobalSearchObj.error = true;
            })
    },
});

export const { } = searchResultsSlice.actions

export default searchResultsSlice.reducer

