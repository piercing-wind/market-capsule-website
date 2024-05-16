import { apiEndPoints } from '@/utils/apiEndPoints';
import { getMethod } from '@/utils/apiServices';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';



// Action

export const getTopGainerList = createAsyncThunk('homePageSlice/getTopGainerList', async (params) => {
    const response = await getMethod(`${apiEndPoints.getTopGainerList}?filters[exchangeType][$eq]=${params.filter}&pagination[page]=${params.page}&pagination[pageSize]=${params.limit}&sort=${params.sort}&populate[company][fields][0]=${params.populate}`);
    return (response)
});

export const getTopLosersList = createAsyncThunk('homePageSlice/getTopLosersList', async (params) => {
    const response = await getMethod(`${apiEndPoints.getTopLosersList}?filters[exchangeType][$eq]=${params.filter}&pagination[page]=${params.page}&pagination[pageSize]=${params.limit}&sort=${params.sort}&populate[company][fields][0]=${params.populate}`);
    return (response)
});
export const getTrandingNewsList = createAsyncThunk('homePageSlice/getTrandingNewsList', async (params) => {
    const response = await getMethod(`news?pagination[page]=${params?.page}&pagination[pageSize]=${params?.limit}&fields[0]=${params?.title}&fields[1]=${params?.url}&fields[2]=${params?.source}&populate[image][fields][0]=${params?.image}&populate[image][fields][1]=${params?.alternativeText}&sort=${params.sort}`);
    return (response)
});

export const getWhatsNewInCapsulePlusList = createAsyncThunk('homePageSlice/getWhatsNewInCapsulePlusList', async (params) => {
    const response = await getMethod(`companies?fields[0]=${params?.title}&pagination[page]=${params?.page}&pagination[pageSize]=${params?.limit}&populate[whatsNewInCapsulePlusImage][fields][0]=${params?.url}&populate[whatsNewInCapsulePlusImage][fields][1]=${params?.alternativeText}&sort=${params.sort}`);
    return (response)
});


export const getIndustriesList = createAsyncThunk('homePageSlice/getIndustriesList', async (params) => {
    const response = await getMethod(`industries?fields[0]=${params?.industryName}&fields[1]=${params?.industrySlug}&populate[tag][fields][0]=${params?.industryTag}&populate[tag][fields][1]=${params?.industryColorHash}`);
    return (response)
});

export const getFeedList = createAsyncThunk('homePageSlice/getFeedList', async (params) => {
    const response = await getMethod(`feed/list?limit=${params?.limit}&page=${params?.page}&industryId=${params?.industryId}`);
    return (response)
});


const filterBtnObj = {
    showFilterModalForm: false,

}

const topGainerObj = {
    loading: false,
    error: false,
    topGainerList: [],
    topGainerTotalList: 0,
}

const topLosersObj = {
    loading: false,
    error: false,
    topLosersList: [],
    topLosersTotalList: 0,
}

const trandingNewsObj = {
    loading: false,
    error: false,
    trandingNewsList: [],
    trandingNewsTotalList: 0,
}



const whatsNewInCapsulePlusObj = {
    loading: false,
    error: false,
    whatsNewInCapsulePlusList: [],
    whatsNewInCapsulePlusTotalList: 0,
}



const industriesObj = {
    loading: false,
    error: false,
    industryList: [
        {
            "id": 0,
            "attributes": {
                "name": "All",
                "slug": "all",
                "tag": {
                    "data": {
                        "id": 2,
                        "attributes": {
                            "name": "green",
                            "colorHash": "#008000"
                        }
                    }
                }
            }
        }
    ],
    industryTotalList: 0,
    industryId: 0

}

const feedListObj = {
    loading: false,
    error: false,
    feedList: [],
    feedCurrentPage: 1,
    feedTotalList: 0,
}

export const homePageSlice = createSlice({
    name: 'homePageSlice',
    initialState: {
        showFilterModal: filterBtnObj,
        topGainerObj,
        topLosersObj,
        trandingNewsObj,
        whatsNewInCapsulePlusObj,
        industriesObj,
        feedListObj

    },
    reducers: {
        setShowFilterModalForm(state, action) {
            state.showFilterModal.showFilterModalForm = action.payload
        },
        setTopGainerList: (state, action) => {
            state.topGainerObj.topGainerList = action.payload;
        },
        setTopGainerTotalList: (state, action) => {
            state.topGainerObj.topGainerTotalList = action.payload;
        },
        setTopLosersList: (state, action) => {
            state.topLosersObj.topLosersList = action.payload;
        },
        setTopLosersTotalList: (state, action) => {
            state.topLosersObj.topLosersTotalList = action.payload;
        },
        setIndustryList: (state, action) => {
            state.industriesObj.industryList = [...state?.industriesObj?.industryList, ...action?.payload];
        },
        setIndustryId: (state, action) => {
            state.industriesObj.industryId = action?.payload;
        },
        setFeedList: (state, action) => {
            state.feedListObj.feedList = [...state?.feedListObj?.feedList, ...action?.payload];
        },
        setFeedListEmpty: (state, action) => {
            state.feedListObj.feedList = [];
        },
        setFeedTotalList: (state, action) => {
            state.feedListObj.feedTotalList = action.payload;
        },
        setFeedCurrentPage: (state, action) => {
            state.feedListObj.feedCurrentPage = action.payload
        },


    },
    extraReducers: (builder) => {
        builder
            .addCase(getTopGainerList.pending, (state, action) => {
                state.topGainerObj.loading = true;
                state.topGainerObj.error = false;
            })
            .addCase(getTopGainerList.fulfilled, (state, action) => {
                state.topGainerObj.loading = false;
                state.topGainerObj.error = false;
                state.topGainerObj.topGainerList = action?.payload?.data;
                state.topGainerObj.topGainerTotalList = action?.payload?.meta?.pagination?.total;

            })
            .addCase(getTopGainerList.rejected, (state, action) => {
                state.topGainerObj.loading = false;
                state.topGainerObj.error = true;
            })
            .addCase(getTopLosersList.pending, (state, action) => {
                state.topLosersObj.loading = true;
                state.topLosersObj.error = false;
            })
            .addCase(getTopLosersList.fulfilled, (state, action) => {
                state.topLosersObj.loading = false;
                state.topLosersObj.error = false;
                state.topLosersObj.topLosersList = action?.payload?.data;
                state.topLosersObj.topLosersTotalList = action?.payload?.meta?.pagination?.total;

            })
            .addCase(getTopLosersList.rejected, (state, action) => {
                state.topLosersObj.loading = false;
                state.topLosersObj.error = true;
            })
            .addCase(getTrandingNewsList.pending, (state, action) => {
                state.trandingNewsObj.loading = true;
                state.trandingNewsObj.error = false;
            })
            .addCase(getTrandingNewsList.fulfilled, (state, action) => {
                state.trandingNewsObj.loading = false;
                state.trandingNewsObj.error = false;
                state.trandingNewsObj.trandingNewsList = action?.payload?.data;
                state.trandingNewsObj.trandingNewsTotalList = action?.payload?.meta?.pagination?.total;

            })
            .addCase(getTrandingNewsList.rejected, (state, action) => {
                state.trandingNewsObj.loading = false;
                state.trandingNewsObj.error = true;
            })

            .addCase(getWhatsNewInCapsulePlusList.pending, (state, action) => {
                state.whatsNewInCapsulePlusObj.loading = true;
                state.whatsNewInCapsulePlusObj.error = false;
            })
            .addCase(getWhatsNewInCapsulePlusList.fulfilled, (state, action) => {
                state.whatsNewInCapsulePlusObj.loading = false;
                state.whatsNewInCapsulePlusObj.error = false;
                state.whatsNewInCapsulePlusObj.whatsNewInCapsulePlusList = action?.payload?.data;
                state.whatsNewInCapsulePlusObj.whatsNewInCapsulePlusTotalList = action?.payload?.meta?.pagination?.total;

            })
            .addCase(getWhatsNewInCapsulePlusList.rejected, (state, action) => {
                state.whatsNewInCapsulePlusObj.loading = false;
                state.whatsNewInCapsulePlusObj.error = true;
            })
            .addCase(getIndustriesList.pending, (state, action) => {
                state.industriesObj.loading = true;
                state.industriesObj.error = false;
            })
            .addCase(getIndustriesList.fulfilled, (state, action) => {
                state.industriesObj.loading = false;
                state.industriesObj.error = false;

                state.industriesObj.industryList = action?.payload?.data
                state.industriesObj.industryTotalList = action?.payload?.meta?.pagination?.total;

            })
            .addCase(getIndustriesList.rejected, (state, action) => {
                state.industriesObj.loading = false;
                state.industriesObj.error = true;
            })
            .addCase(getFeedList.pending, (state, action) => {
                state.feedListObj.loading = true;
                state.feedListObj.error = false;
            })
            .addCase(getFeedList.fulfilled, (state, action) => {
                state.feedListObj.loading = false;
                state.feedListObj.error = false;
                state.feedListObj.feedList = [...state?.feedListObj?.feedList, ...action?.payload?.data];
                state.feedListObj.feedTotalList = action?.payload?.count;

            })
            .addCase(getFeedList.rejected, (state, action) => {
                state.feedListObj.loading = false;
                state.feedListObj.error = true;
            })
    },
});

export const {
    setShowFilterModalForm,
    setTopGainerList,
    setTopGainerTotalList,
    setTopLosersList,
    setTopLosersTotalList,
    setIndustryList,
    setFeedList,
    setFeedTotalList,
    setFeedCurrentPage,
    setIndustryId,
    setFeedListEmpty
} = homePageSlice.actions

export default homePageSlice.reducer

