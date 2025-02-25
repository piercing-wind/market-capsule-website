import { postMethod } from "@/utils/apiServices";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const createOrder = async (data)=>{
    try{
        const response = await postMethod(`summit-payments/initiatePayment`, data)
        return response;
    }catch(err){
        console.error(err);
    }
}

export const getUserPaymentInfo = createAsyncThunk('summitPaymentSlice/getUserPaymentInfo', async (data) => {
    try{
        const response = await postMethod(`summit-payments/hasaccess`, data );
        return response;
    }catch(err){
        console.error(err);
    }
})


export const summitPayment = createSlice({
    name: 'summitPaymentSlice',
    initialState: {
        loader: false,
        error: null,
        data: {}
    },
    reducers: {
        setHasAccess: (state, action) => {
            state = action.payload
        },
    },
    extraReducers: (builder)=>{
        builder.addCase(getUserPaymentInfo.pending,(state, action)=>{
            state.loader = true;
        })
        .addCase(getUserPaymentInfo.fulfilled,(state, action)=>{
            state.loader = false;
            state.data = action.payload.data || {};
        })
        .addCase(getUserPaymentInfo.rejected,(state, action)=>{
            state.loader = false;
            state.error = action.error.message;
        })
    }
});

export const { setHasAccess } = summitPayment.actions;

export default summitPayment.reducer;