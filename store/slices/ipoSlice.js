import { getMethod, postMethod } from '@/utils/apiServices';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// Action

export const getIpoCompanyData = createAsyncThunk('ipoSlice/getIpoCompanyData', async (params = {}) => {
    const response = await getMethod(`ipo/list`, params);
    return (response)
});

export const getFilterSectionList = createAsyncThunk('ipoSlice/getFilterSectionList', async (params) => {
    const response = await getMethod(`ipo/filter`);
    return (response)
});

export const getIpoCompanyHeadingData = createAsyncThunk('ipoSlice/getIpoCompanyHeadingData', async (params) => {
    const response = await getMethod(`ipo-zone?fields[0]=title&fields[1]=description&fields[2]=metaTitle&fields[3]=metaDescription`);
    return (response)
});



const getIpoCompanyDataObj = {
    loading: false,
    error: false,
    companyList: [],
    companyListCurrentPage: 1,
    companyTotalList: 100,
    companyTypeId: '',
    sectorId: '',
    industryId: '',
    companyName: '',
}


const getFilterSectionObj = {
    loading: false,
    error: false,
    filterSectionList: []
}

const getIpoCompanyHeadingObj = {
    loading: false,
    error: false,
    ipoHeadingData: {},

}
const seoObj = {
    loading: false,
    error: false,
    seo: ""
}
export const ipoSlice = createSlice({
    name: 'ipoSlice',
    initialState: {
        getIpoCompanyDataObj,
        getFilterSectionObj,
        getIpoCompanyHeadingObj,
        seoObj
    },
    reducers: {
        setCompanyList: (state, action) => {
            state.getIpoCompanyDataObj.companyList = [...state?.getIpoCompanyDataObj?.companyList, ...action?.payload]
        },
        setCompanyListCurrentPage: (state, action) => {
            state.getIpoCompanyDataObj.companyListCurrentPage = action?.payload
        },
        setCompanyListTotalList: (state, action) => {
            state.getIpoCompanyDataObj.companyTotalList = action?.payload
        },
        setCompanyListEmpty: (state, action) => {
            state.getIpoCompanyDataObj.companyList = []
        },


        setCompanyTypeId: (state, action) => {
            state.getIpoCompanyDataObj.companyTypeId = action?.payload
        },
        setCompanySectorId: (state, action) => {
            state.getIpoCompanyDataObj.sectorId = action?.payload
        },
        setCompanyIndustryId: (state, action) => {
            state.getIpoCompanyDataObj.industryId = action?.payload
        },
        setCompanyName: (state, action) => {
            state.getIpoCompanyDataObj.companyName = action?.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getIpoCompanyData.pending, (state, action) => {
                state.getIpoCompanyDataObj.loading = true;
            })
            .addCase(getIpoCompanyData.fulfilled, (state, action) => {
                state.getIpoCompanyDataObj.loading = false;
                state.getIpoCompanyDataObj.companyList = [...state?.getIpoCompanyDataObj?.companyList, ...action?.payload?.data];
                state.getIpoCompanyDataObj.companyTotalList = action?.payload?.count

            })
            .addCase(getIpoCompanyData.rejected, (state, action) => {
                state.getIpoCompanyDataObj.loading = false;
                state.getIpoCompanyDataObj.error = true;
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
            .addCase(getIpoCompanyHeadingData.pending, (state, action) => {
                state.getIpoCompanyHeadingObj.loading = true;
            })
            .addCase(getIpoCompanyHeadingData.fulfilled, (state, action) => {
                state.getIpoCompanyHeadingObj.loading = false;
                state.getIpoCompanyHeadingObj.ipoHeadingData = action?.payload?.data
                const seo = (action?.payload?.data?.attributes ? ({
                    title: action?.payload?.data?.attributes?.metaTitle ? action?.payload?.data?.attributes?.metaTitle : '',
                    description: action?.payload?.data?.attributes?.metaDescription ? action?.payload?.data?.attributes?.metaDescription : '',
                }) : null)
                state.seoObj.seo = seo;

            })
            .addCase(getIpoCompanyHeadingData.rejected, (state, action) => {
                state.getIpoCompanyHeadingObj.loading = false;
                state.getIpoCompanyHeadingObj.error = true;
            })
    },
});

export const { setCompanyTypeId, setCompanySectorId, setCompanyIndustryId, setCompanyName, setCompanyListEmpty, setCompanyList, setCompanyListCurrentPage, setCompanyListTotalList } = ipoSlice.actions

export default ipoSlice.reducer



