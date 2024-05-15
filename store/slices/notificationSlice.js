import { apiEndPoints } from '@/utils/apiEndPoints';
import { getMethod } from '@/utils/apiServices';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';


export const getNotificationList = createAsyncThunk('notificationSlice/getNotificationList', async (params) => {
    const response = await getMethod(`${apiEndPoints.notificationList}`, params);
    return (response)
});





export const notificationSlice = createSlice({
    name: 'notificationSlice',
    initialState: {
        loader: false,
        notificationList: [],
        notificationCurrentPage: 1,
        notificationTotalList: 100,
        error: false
    },
    reducers: {
        setNotificationList: (state, action) => {
            state.notificationList = action.payload
        },
        setNotificationCurrentPage: (state, action) => {
            state.notificationCurrentPage = action.payload
        },
        setNotificationTotalList: (state, action) => {
            state.notificationTotalList = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getNotificationList.pending, (state, action) => {
                state.loader = true;
            })
            .addCase(getNotificationList.fulfilled, (state, action) => {
                state.loader = false;
                state.notificationList = [...state?.notificationList, ...action?.payload?.data];
                state.notificationTotalList = action?.payload?.count

            })
            .addCase(getNotificationList.rejected, (state, action) => {
                state.loader = false;
                state.error = true;
            })

    }
});

export const { setNotificationList, setNotificationCurrentPage, setNotificationTotalList } = notificationSlice.actions

export default notificationSlice.reducer

