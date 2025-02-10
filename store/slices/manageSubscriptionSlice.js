import { getMethod } from '@/utils/apiServices';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

export const getSubscriptionList = createAsyncThunk('manageSubscriptionSlice/getSubscriptionList', async (params) => {
    const response = await getMethod(`subscription/list?page=${params?.page}&limit=${params?.limit}`);
    return (response)
});



const getSubscriptionObj = {
    loading: false,
    error: false,
    subscriptionList: [],
    subscriptionListCurrentPage: 1,
    subscriptionTotalList: 100,
    nextBilingDate: '',

}
export const manageSubscriptionSlice = createSlice({
    name: 'manageSubscriptionSlice',
    initialState: {
        getSubscriptionObj
    },
    reducers: {

        setSubscriptionList: (state, action) => {
            state.getSubscriptionObj.subscriptionList = [...state?.getSubscriptionObj?.subscriptionList, ...action?.payload]
        },


        setSubscriptionListCurrentPage: (state, action) => {
            state.getSubscriptionObj.subscriptionListCurrentPage = action.payload
        },
        setSubscriptionListTotalList: (state, action) => {
            state.getSubscriptionObj.subscriptionTotalList = action.payload
        },
        setSubscriptionListEmpty: (state, action) => {
            state.getSubscriptionObj.subscriptionList = []
        },
        setNextBillingData: (state, action) => {
            state.getSubscriptionObj.nextBilingDate = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getSubscriptionList.pending, (state, action) => {
                state.getSubscriptionObj.loading = true;
            })
            .addCase(getSubscriptionList.fulfilled, (state, action) => {
                state.getSubscriptionObj.loading = false;
                state.getSubscriptionObj.subscriptionList = [...state?.getSubscriptionObj?.subscriptionList, ...action?.payload?.data?.userSubscriptions];
                state.getSubscriptionObj.subscriptionTotalList = action?.payload?.count
                state.getSubscriptionObj.nextBilingDate = action?.payload?.data?.nextBillingDate

            })
            .addCase(getSubscriptionList.rejected, (state, action) => {
                state.getSubscriptionObj.loading = false;
                state.getSubscriptionObj.error = true;
            })

    }

});

export const {
    setShowForm,
    setSubscriptionList,
    setSubscriptionListCurrentPage,
    setSubscriptionListTotalList,
    setSubscriptionListEmpty,
    setNextBillingData
} = manageSubscriptionSlice.actions

export default manageSubscriptionSlice.reducer

