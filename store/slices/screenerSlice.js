import { apiEndPoints } from '@/utils/apiEndPoints';
import { getMethod } from '@/utils/apiServices';
import { fi } from '@faker-js/faker';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
// Action

export const getScreenerHeading = createAsyncThunk('screenerSlice/getScreenerHeading', async (params) => {
    const response = await getMethod(`screener?fields[0]=title&fields[1]=description&fields[2]=metaTitle&fields[3]=metaDescription`);
    return (response)
});

export const getFilterList = createAsyncThunk('screenerSlice/getFilterList', async (params) => {
    const response = await getMethod(`categories?pagination[page]=${params?.page}&pagination[pageSize]=${params?.limit}&sort=${params?.sort}`);
    return (response)
});


export const getBucketList = createAsyncThunk('screenerSlice/getBucketList', async (params) => {
    const response = await getMethod(`bucket/list?limit=${params?.limit}&page=${params?.page}&categoryId=${params?.categoryId}`);
    return (response)
});

const getScreenerHeadingObj = {
    loading: false,
    error: false,
    screenerHeadingData: {},
}

const getFilterObj = {
    loading: false,
    error: false,
    filterList: [
        {
            "id": 0,
            "attributes": {
                "name": "All",
                "slug": "all",
                "metaTitle": null,
                "metaDescription": null,
                "createdAt": "2024-04-15T18:20:16.559Z",
                "updatedAt": "2024-04-15T18:20:19.341Z",
                "publishedAt": "2024-04-15T18:20:19.331Z"
            }
        }
    ],
    filterTotalList: 0,
    filterId: 0
}

const bucketObj = {
    loading: false,
    bucketList: [],
    bucketCurrentPage: 1,
    bucketTotalList: 100,
    error: false,
}

const seoObj = {
    loading: false,
    error: false,
    seo: ""
}
export const screenerSlice = createSlice({
    name: 'screenerSlice',
    initialState: {
        getScreenerHeadingObj,
        getFilterObj,
        bucketObj,
        seoObj
    },
    reducers: {
        setFilterList: (state, action) => {
            state.getFilterObj.filterList = [...state?.getFilterObj?.filterList, ...action?.payload];
        },
        setFilterId: (state, action) => {
            state.getFilterObj.filterId = action?.payload;
        },
        setBucketList: (state, action) => {
            state.bucketObj.bucketList = [...state?.bucketObj?.bucketList, ...action?.payload]
        },
        setBucketCurrentPage: (state, action) => {
            state.bucketObj.bucketCurrentPage = action.payload
        },
        setBucketTotalList: (state, action) => {
            state.bucketObj.bucketTotalList = action.payload
        },
        setBucketListEmpty: (state, action) => {
            state.bucketObj.bucketList = [];
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getScreenerHeading.pending, (state, action) => {
                state.getScreenerHeadingObj.loading = true;
                state.getScreenerHeadingObj.error = false;
            })
            .addCase(getScreenerHeading.fulfilled, (state, action) => {
                state.getScreenerHeadingObj.loading = false;
                state.getScreenerHeadingObj.error = false;
                state.getScreenerHeadingObj.screenerHeadingData = action?.payload?.data
                const seo = (action?.payload?.data?.attributes ? ({
                    title: action?.payload?.data?.attributes?.metaTitle ? action?.payload?.data?.attributes?.metaTitle : '',
                    description: action?.payload?.data?.attributes?.metaDescription ? action?.payload?.data?.attributes?.metaDescription : '',
                }) : null)
                state.seoObj.seo = seo;

            })
            .addCase(getScreenerHeading.rejected, (state, action) => {
                state.getScreenerHeadingObj.loading = false;
                state.getScreenerHeadingObj.error = true;
            })
            .addCase(getFilterList.pending, (state, action) => {
                state.getFilterObj.loading = true;
                state.getFilterObj.error = false;
            })
            .addCase(getFilterList.fulfilled, (state, action) => {
                state.getFilterObj.loading = false;
                state.getFilterObj.error = false;
                state.getFilterObj.filterList = [...state?.getFilterObj?.filterList, ...action?.payload?.data]
                state.getFilterObj.filterTotalList = action?.payload?.meta?.pagination?.total

            })
            .addCase(getFilterList.rejected, (state, action) => {
                state.getFilterObj.loading = false;
                state.getFilterObj.error = true;
            })
            .addCase(getBucketList.pending, (state, action) => {
                state.bucketObj.loading = true;
            })
            .addCase(getBucketList.fulfilled, (state, action) => {
                state.bucketObj.loading = false;
                state.bucketObj.bucketList = [...state?.bucketObj?.bucketList, ...action?.payload?.data];
                state.bucketObj.bucketTotalList = action?.payload?.count

            })
            .addCase(getBucketList.rejected, (state, action) => {
                state.bucketObj.loading = false;
                state.bucketObj.error = true;
            })
    },
});

export const { setBucketListEmpty, setFilterList, setFilterId, setBucketList, setBucketCurrentPage, setBucketTotalList } = screenerSlice.actions

export default screenerSlice.reducer

