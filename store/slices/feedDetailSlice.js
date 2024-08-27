import { getMethod, postMethod } from '@/utils/apiServices';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// Action

export const getFeedDetailData = createAsyncThunk('feedDetailSlice/getFeedDetailData', async (params) => {
    // api/feeds/4
    const response = await getMethod(`feed/${params?.id}`);
    return (response)
});



const getFeedDetailObj = {
    loading: false,
    error: false,
    feedDetailData: {},
    capsulePlus: false

}

const seoObj = {
    loading: false,
    error: false,
    seo: ""
}



export const feedDetailSlice = createSlice({
    name: 'feedDetailSlice',
    initialState: {
        getFeedDetailObj,
        seoObj
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getFeedDetailData.pending, (state, action) => {
                state.getFeedDetailObj.loading = true;
            })
            .addCase(getFeedDetailData.fulfilled, (state, action) => {
                state.getFeedDetailObj.loading = false;
                state.getFeedDetailObj.feedDetailData = action?.payload?.data
                const seo = (action?.payload?.data ? ({
                    title: action?.payload?.data?.metaTitle ? action?.payload?.data?.metaTitle : '',
                    description: action?.payload?.data?.metaDescription ? action?.payload?.data?.metaDescription : '',
                }) : null)
                state.seoObj.seo = seo;

            })
            .addCase(getFeedDetailData.rejected, (state, action) => {
                state.getFeedDetailObj.loading = false;
                state.getFeedDetailObj.error = true;
            })
    },
});

export const { } = feedDetailSlice.actions

export default feedDetailSlice.reducer



