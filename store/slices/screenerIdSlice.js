import { apiEndPoints } from '@/utils/apiEndPoints';
import { getMethod, postMethod } from '@/utils/apiServices';
import { fi } from '@faker-js/faker';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
// Action

export const getScreenerIdData = createAsyncThunk('screenerIdSlice/getScreenerIdData', async (params) => {
    let { companyTypeId = "", peGte = "", peLte = "", marketCapLte = "", marketCapGte = "" } = params;
    const response = await getMethod(`company/list?bucketSlug=${params?.slug}&page=${params?.page}&limit=${params?.limit}&companyTypeId=${companyTypeId}&pe[gte]=${peGte}&pe[lte]=${peLte}&marketCap[lte]=${marketCapLte}&marketCap[gte]=${marketCapGte}&sort=${params?.sort}`,);
    return (response)
});

export const getFilterSectionList = createAsyncThunk('screenerIdSlice/getFilterSectionList', async (params) => {
    const response = await getMethod(`bucket/filter/top-it-company`);
    return (response)
});



const getScreenerIdDataObj = {
    loading: false,
    error: false,
    screenerIdData: {},
    companyList: [],
    companyListCurrentPage: 1,
    companyTotalList: 100,
    sortCompany: `lowHighMarketCap`

}

const getFilterSectionObj = {
    loading: false,
    error: false,
    filterSectionList: []
}

export const screenerIdSlice = createSlice({
    name: 'screenerIdSlice',
    initialState: {
        getScreenerIdDataObj,
        getFilterSectionObj
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
            state.getScreenerIdDataObj.sortCompany = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getScreenerIdData.pending, (state, action) => {
                state.getScreenerIdDataObj.loading = true;
            })
            .addCase(getScreenerIdData.fulfilled, (state, action) => {
                state.getScreenerIdDataObj.loading = false;
                // state.getScreenerIdDataObj.screenerIdData = action?.payload?.data
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
    },
});

export const { setCompanySorting, setCompanyListEmpty, setCompanyList, setCompanyListCurrentPage, setCompanyListTotalList } = screenerIdSlice.actions

export default screenerIdSlice.reducer



