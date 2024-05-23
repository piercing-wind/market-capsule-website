import { apiEndPoints } from '@/utils/apiEndPoints';
import { getMethod, postMethod } from '@/utils/apiServices';
import { fi } from '@faker-js/faker';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
// Action

export const getScreenerIdData = createAsyncThunk('screenerIdSlice/getScreenerIdData', async (params = {}) => {
    const response = await getMethod(`company/list`, params);
    return (response)
});

export const getFilterSectionList = createAsyncThunk('screenerIdSlice/getFilterSectionList', async (params) => {
    const response = await getMethod(`bucket/filter/top-it-company`);
    return (response)
});

export const getScreenerCompanyData = createAsyncThunk('screenerIdSlice/getScreenerCompanyData', async (params) => {
    const response = await getMethod(`bucket/detail`, params);
    return (response)
});



const getScreenerIdDataObj = {
    loading: false,
    error: false,
    screenerIdData: {},
    companyList: [],
    companyListCurrentPage: 1,
    companyTotalList: 100,
    sortCompany: `highLowMarketCap`,
    companyTypeId: [],
    peLte: '',
    peGte: '',
    marketCapLte: ``,
    marketCapGte: ``

}


const getFilterSectionObj = {
    loading: false,
    error: false,
    filterSectionList: []
}

const getScreenerCompanyDataObj = {
    loading: false,
    error: false,
    screenerIdData: {},

}

export const screenerIdSlice = createSlice({
    name: 'screenerIdSlice',
    initialState: {
        getScreenerIdDataObj,
        getFilterSectionObj,
        getScreenerCompanyDataObj
    },
    reducers: {
        setCompanyList: (state, action) => {
            state.getScreenerIdDataObj.companyList = [...state?.getScreenerIdDataObj?.companyList, ...action?.payload]
        },
        setCompanyListCurrentPage: (state, action) => {
            state.getScreenerIdDataObj.companyListCurrentPage = action.payload
        },
        setCompanyListTotalList: (state, action) => {
            state.getScreenerIdDataObj.companyTotalList = action.payload
        },
        setCompanyListEmpty: (state, action) => {
            state.getScreenerIdDataObj.companyList = []
        },

        setCompanySorting: (state, action) => {
            state.getScreenerIdDataObj.sortCompany = action?.payload
        },
        setCompanyTypeId: (state, action) => {
            state.getScreenerIdDataObj.companyTypeId = action?.payload
        },
        setCompanyPeLte: (state, action) => {
            state.getScreenerIdDataObj.peLte = action?.payload
        },
        setCompanyPeGte: (state, action) => {
            state.getScreenerIdDataObj.peGte = action?.payload
        },
        setCompanyMarketCapLte: (state, action) => {
            state.getScreenerIdDataObj.marketCapLte = action?.payload
        },
        setCompanyMarketCapGte: (state, action) => {
            state.getScreenerIdDataObj.marketCapGte = action?.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getScreenerIdData.pending, (state, action) => {
                state.getScreenerIdDataObj.loading = true;
            })
            .addCase(getScreenerIdData.fulfilled, (state, action) => {
                state.getScreenerIdDataObj.loading = false;
                state.getScreenerIdDataObj.companyList = [...state?.getScreenerIdDataObj?.companyList, ...action?.payload?.data];
                state.getScreenerIdDataObj.companyTotalList = action?.payload?.count

            })
            .addCase(getScreenerIdData.rejected, (state, action) => {
                state.getScreenerIdDataObj.loading = false;
                state.getScreenerIdDataObj.error = true;
            })

            .addCase(getFilterSectionList.pending, (state, action) => {
                state.getFilterSectionObj.loading = true;
            })
            .addCase(getFilterSectionList.fulfilled, (state, action) => {
                state.getFilterSectionObj.loading = false;
                state.getFilterSectionObj.filterSectionList = action?.payload?.filters

            })
            .addCase(getFilterSectionList.rejected, (state, action) => {
                state.getFilterSectionObj.loading = false;
                state.getFilterSectionObj.error = true;
            })
            .addCase(getScreenerCompanyData.pending, (state, action) => {
                state.getScreenerCompanyDataObj.loading = true;
            })
            .addCase(getScreenerCompanyData.fulfilled, (state, action) => {
                state.getScreenerCompanyDataObj.loading = false;
                state.getScreenerCompanyDataObj.screenerIdData = action?.payload?.data

            })
            .addCase(getScreenerCompanyData.rejected, (state, action) => {
                state.getScreenerCompanyDataObj.loading = false;
                state.getScreenerCompanyDataObj.error = true;
            })
    },
});

export const { setCompanyTypeId, setCompanyMarketCapLte, setCompanyMarketCapGte, setCompanyPeLte, setCompanyPeGte, setCompanySorting, setCompanyListEmpty, setCompanyList, setCompanyListCurrentPage, setCompanyListTotalList } = screenerIdSlice.actions

export default screenerIdSlice.reducer



