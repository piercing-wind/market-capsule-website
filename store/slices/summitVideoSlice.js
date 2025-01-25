import { getMethod } from "@/utils/apiServices";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getSummitVideos = createAsyncThunk('getSummitSliceVideos/summit-videos', async (params) => {
    const response = await getMethod(`summit-videos?filters[summit][id][$eq]=${params?.slug}&populate=video&populate=thumbnail&populate=document`);
    return response;
});

export const summitVideoSlice = createSlice({
    name: 'summitVideoSlice',
    initialState : {
        loading: false,
        error: false,
        summitVideosData: [],
        activeVideo: [],
    },
    reducers: {
        setActiveVideo: (state, action) => {
            state.activeVideo = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getSummitVideos.pending, (state) => {
                state.loading = true;
            })
            .addCase(getSummitVideos.fulfilled, (state, action) => {
                state.loading = false;
                // Sort the data before setting it in the state
                const sortedData = action.payload.data.sort((a, b) => {
                    // Handle missing or null order values by assigning a default value
                    const orderA = a.attributes.order ?? Number.MAX_SAFE_INTEGER;
                    const orderB = b.attributes.order ?? Number.MAX_SAFE_INTEGER;
                    return orderA - orderB;
                });
                state.summitVideosData = sortedData;
                if (sortedData.length > 0) {
                    state.activeVideo = sortedData[0] || [];
                }
            })
            .addCase(getSummitVideos.rejected, (state) => {
                state.loading = false;
                state.error = true;
            });
    },
});

export const { setActiveVideo } = summitVideoSlice.actions;

export default summitVideoSlice.reducer;