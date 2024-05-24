import { getMethod, postMethod } from '@/utils/apiServices';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

export const getPlanData = createAsyncThunk('subscriptionSlice/getPlanData', async () => {
    const response = await getMethod(`plans`);
    return (response)
});

const promoCodeModalObj = {
    showForm: false,
    discountAmount: 0,
    checkoutData: {}

}

const getPlanDataObj = {
    data: [],
    loading: false,
    error: null,
    planId: "",
    buyPlanData: {}
}

export const subscriptionSlice = createSlice({
    name: 'subscriptionSlice',
    initialState: {
        promoCodeModalObj,
        getPlanDataObj
    },
    reducers: {
        setShowForm(state, action) {
            state.promoCodeModalObj.showForm = action.payload
        },
        setPlanId(state, action) {
            state.getPlanDataObj.planId = action.payload
        },
        setDiscountAmount(state, action) {
            state.promoCodeModalObj.discountAmount = action.payload
        },
        setCheckoutData(state, action) {
            state.promoCodeModalObj.checkoutData = action.payload
        },
        setBuyPlanData(state, action) {
            state.getPlanDataObj.buyPlanData = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPlanData.pending, (state, action) => {
                state.getPlanDataObj.loading = true;
                state.getPlanDataObj.error = false;
            })
            .addCase(getPlanData.fulfilled, (state, action) => {
                state.getPlanDataObj.loading = false;
                state.getPlanDataObj.error = false;
                state.getPlanDataObj.data = action?.payload?.data

            })
            .addCase(getPlanData.rejected, (state, action) => {
                state.getPlanDataObj.loading = false;
                state.getPlanDataObj.error = true;
            })
    }

});

export const {
    setShowForm,
    setPlanId,
    setDiscountAmount,
    setCheckoutData,
    setBuyPlanData
} = subscriptionSlice.actions

export default subscriptionSlice.reducer

export const checkPromoCode = async (data = {}, success, error) => {
    new Promise((resolve, reject) => {
        postMethod(`promo-codes/check`, (data)).then((response) => {
            if (response?.error?.status) {
                error({ success: false, message: response?.error?.message })
            } else {
                success({ success: true, message: response?.message, data: response?.data })
            }
        })
    })
}


export const checkoutApi = async (data = {}, success, error) => {
    new Promise((resolve, reject) => {
        postMethod(`plan/checkout`, (data)).then((response) => {
            if (response?.error?.status) {
                error({ success: false, message: response?.error?.message })
            } else {
                success({ success: true, message: response?.message, data: response?.data })
            }
        })
    })
}


export const buyPlanApi = async (data = {}, success, error) => {
    new Promise((resolve, reject) => {
        postMethod(`plan/buy`, (data)).then((response) => {
            if (response?.error?.status) {
                error({ success: false, message: response?.error?.message })
            } else {
                success({ success: true, message: response?.message, data: response?.data })
            }
        })
    })
}


export const paymentVerification = async (data = {}, success, error) => {
    new Promise((resolve, reject) => {
        postMethod(`plan/paymentVerify`, (data)).then((response) => {
            if (response?.error?.status) {
                error({ success: false, message: response?.error?.message })
            } else {
                success({ success: true, message: response?.message, data: response?.data })
            }
        })
    })
}
