import { apiEndPoints } from '@/utils/apiEndPoints';
import { deleteMethod, getMethod, postMethod } from '@/utils/apiServices';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// Action

export const getWatchListHeader = createAsyncThunk('watchListSlice/getWatchListHeader', async (params) => {
    const response = await getMethod(`wachlist?fields[0]=title&fields[1]=description`);
    return (response)
})

export const getWatchListData = createAsyncThunk('watchListSlice/getWatchListData', async (params) => {
    const response = await getMethod(`wishlist/list?sort=${params?.sort}&page=${params?.page}&limit=${params?.limit}`);
    return (response)
});

const getWatchListObj = {
    loading: false,
    error: false,
    watchList: [],
    watchListCurrentPage: 1,
    watchListTotalList: 100,

}
const getWatchListHeaderObj = {
    loading: false,
    error: false,
    watchListHeading: `123`,
    watchListDescription: ``

}

export const watchListSlice = createSlice({
    name: 'watchListSlice',
    initialState: {
        getWatchListObj,
        getWatchListHeaderObj
    },
    reducers: {
        setWatchList: (state, action) => {
            state.getWatchListObj.watchList = [...state?.getWatchListObj?.watchList, ...action?.payload]
        },
        setWatchListCurrentPage: (state, action) => {
            state.getWatchListObj.watchListCurrentPage = action.payload
        },
        setWatchListTotalList: (state, action) => {
            state.getWatchListObj.watchListTotalList = action.payload
        },
        setWatchListEmpty: (state, action) => {
            state.getWatchListObj.watchList = []
        },
        setError: (state, action) => {
            state.getWatchListObj.error = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getWatchListData.pending, (state, action) => {
                state.getWatchListObj.loading = true;
            })
            .addCase(getWatchListData.fulfilled, (state, action) => {
                state.getWatchListObj.loading = false;
                state.getWatchListObj.watchList = [...state?.getWatchListObj?.watchList, ...action?.payload?.data];
                state.getWatchListObj.watchListTotalList = action?.payload?.count

            })
            .addCase(getWatchListData.rejected, (state, action) => {
                state.getWatchListObj.loading = false;
                state.getWatchListObj.error = true;
            })
            .addCase(getWatchListHeader.pending, (state, action) => {
                state.getWatchListHeaderObj.loading = true;
            })
            .addCase(getWatchListHeader.fulfilled, (state, action) => {
                state.getWatchListHeaderObj.loading = false;
                state.getWatchListHeaderObj.watchListHeading = action?.payload?.data?.attributes?.title;
                state.getWatchListHeaderObj.watchListDescription = action?.payload?.data?.attributes?.description;

            })
            .addCase(getWatchListHeader.rejected, (state, action) => {
                state.getWatchListHeaderObj.loading = false;
                state.getWatchListHeaderObj.error = true;
            })
    },
});

export const { setError, setWatchList, setWatchListCurrentPage, setWatchListTotalList, setWatchListEmpty } = watchListSlice.actions

export default watchListSlice.reducer

export const addToWatchList = async (data = {}, success, error) => {
    new Promise((resolve, reject) => {
        postMethod(`wishlist/add`, (data)).then((response) => {
            if (response?.error?.status) {
                error({ success: false, message: response?.error?.message })
            } else {
                success({ success: true, message: `message.addedToWatchlist` })
            }
        })
    })
}

export const removeToWatchList = async (data = {}, success, error) => {
    new Promise((resolve, reject) => {
        deleteMethod(`wishlist/${data?.companyId}`).then((response) => {
            if (response?.error?.status) {
                error({ success: false, message: response?.error?.message })
            } else {
                success({ success: true, message: `message.removedFromWatchlist` })
            }
        })
    })
}

