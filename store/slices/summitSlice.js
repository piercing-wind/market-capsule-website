import { apiEndPoints } from "@/utils/apiEndPoints";
import { getMethod } from "@/utils/apiServices";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getSummitList = createAsyncThunk('getSummitSlice/summits', async (params) => {
    const response = await getMethod(`summits?populate=thumbnail`, params );
    return response;
});


export const getSummitById = createAsyncThunk('getSummitSlice/summitById', async (id) => {
    const response = await getMethod(`summits/${id}?populate=thumbnail`);
    return response;
});

const summitData={
    loader:false,
    summitList:[],
    summit : {},
    error:false
}

export const summitSlice = createSlice({
    name: 'summitSlice',
    initialState: summitData,
    reducers: {
        setResetSummitSlice: (state, action) => {
            state.summitList = [];
            state.summit = null;
        },
        setUpdateSummitList: (state, action) => {
            state.summitList = action.payload
        },
        setResetSummitLoader: (state, action) => {
            state.loader = action.payload
        },
    },
    extraReducers: (builder)=>{
        builder.addCase(getSummitList.pending,(state, action)=>{
            state.loader = true;
        })
        .addCase(getSummitList.fulfilled,(state, action)=>{
            state.loader = false;
            state.summitList = action.payload.data
            ?.filter(summit => {
                const organized_on = summit.attributes.organized_on ? new Date(summit.attributes.organized_on) : new Date(summit.attributes.createdAt);
                
                const futureDate = new Date(organized_on)
                futureDate.setFullYear(futureDate.getFullYear() + 1);
                const currentDate = new Date();
                
                return currentDate < futureDate;
            })
            .sort((a, b) => new Date(b.attributes.createdAt) - new Date(a.attributes.createdAt)) || [];

        })
        .addCase(getSummitList.rejected,(state, action)=>{
            state.loader = false;
            state.error = action.error.message;
        })
        .addCase(getSummitById.pending,(state, action)=>{
            state.loader = true;
        })
        .addCase(getSummitById.fulfilled,(state, action)=>{
            state.loader = false;
            state.summit = action.payload.data;
        })
        .addCase(getSummitById.rejected,(state, action)=>{
            state.loader = false;
            state.error = action.error.message;
        })
    }
});

export const { setResetSummitSlice, setUpdateSummitList, setResetSummitLoader } = summitSlice.actions;
export default summitSlice.reducer;