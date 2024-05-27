import { getMethod, postMethod } from '@/utils/apiServices';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// Action

export const getCapsulePlusCompanyData = createAsyncThunk('capsulePlusSlice/getCapsulePlusCompanyData', async (params = {}) => {
    const response = await getMethod(`company/list`, params);
    console.log("response", response)
    return (response)
});

export const getFilterSectionList = createAsyncThunk('capsulePlusSlice/getFilterSectionList', async (params) => {
    const response = await getMethod(`company/filter`);
    return (response)
});

export const getCapsulePlusHeadingData = createAsyncThunk('capsulePlusSlice/getCapsulePlusHeadingData', async (params) => {
    const response = await getMethod(`capsuleplus?fields[0]=title&fields[1]=description&fields[2]=metaTitle&fields[3]=metaDescription`);
    return (response)
});



const getCapsulePlusCompanyDataObj = {
    loading: false,
    error: false,
    capsulePlus: false,
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

const getCapsulePlusCompanyHeadingObj = {
    loading: false,
    error: false,
    capsulePlusHeadingData: {},

}

const seoObj = {
    loading: false,
    error: false,
    seo: ""
}

export const capsulePlusSlice = createSlice({
    name: 'capsulePlusSlice',
    initialState: {
        getCapsulePlusCompanyDataObj,
        getFilterSectionObj,
        getCapsulePlusCompanyHeadingObj,
        seoObj
    },
    reducers: {
        setCompanyList: (state, action) => {
            state.getCapsulePlusCompanyDataObj.companyList = [...state?.getCapsulePlusCompanyDataObj?.companyList, ...action?.payload]
        },
        setCompanyListCurrentPage: (state, action) => {
            state.getCapsulePlusCompanyDataObj.companyListCurrentPage = action?.payload
        },
        setCompanyListTotalList: (state, action) => {
            state.getCapsulePlusCompanyDataObj.companyTotalList = action?.payload
        },
        setCompanyListEmpty: (state, action) => {
            state.getCapsulePlusCompanyDataObj.companyList = []
        },


        setCompanyTypeId: (state, action) => {
            state.getCapsulePlusCompanyDataObj.companyTypeId = action?.payload
        },
        setCompanySectorId: (state, action) => {
            state.getCapsulePlusCompanyDataObj.sectorId = action?.payload
        },
        setCompanyIndustryId: (state, action) => {
            state.getCapsulePlusCompanyDataObj.industryId = action?.payload
        },
        setCompanyName: (state, action) => {
            state.getCapsulePlusCompanyDataObj.companyName = action?.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCapsulePlusCompanyData.pending, (state, action) => {
                state.getCapsulePlusCompanyDataObj.loading = true;
            })
            .addCase(getCapsulePlusCompanyData.fulfilled, (state, action) => {
                state.getCapsulePlusCompanyDataObj.loading = false;
                state.getCapsulePlusCompanyDataObj.companyList = [...state?.getCapsulePlusCompanyDataObj?.companyList, ...action?.payload?.data];
                state.getCapsulePlusCompanyDataObj.companyTotalList = action?.payload?.count
                state.getCapsulePlusCompanyDataObj.capsulePlus = action?.payload?.capsuleplus

            })
            .addCase(getCapsulePlusCompanyData.rejected, (state, action) => {
                state.getCapsulePlusCompanyDataObj.loading = false;
                state.getCapsulePlusCompanyDataObj.error = true;
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
            .addCase(getCapsulePlusHeadingData.pending, (state, action) => {
                state.getCapsulePlusCompanyHeadingObj.loading = true;
            })
            .addCase(getCapsulePlusHeadingData.fulfilled, (state, action) => {
                state.getCapsulePlusCompanyHeadingObj.loading = false;
                state.getCapsulePlusCompanyHeadingObj.capsulePlusHeadingData = action?.payload?.data
                const seo = (action?.payload?.data?.attributes ? ({
                    title: action?.payload?.data?.attributes?.metaTitle ? action?.payload?.data?.attributes?.metaTitle : '',
                    description: action?.payload?.data?.attributes?.metaDescription ? action?.payload?.data?.attributes?.metaDescription : '',
                }) : null)
                state.seoObj.seo = seo;


            })
            .addCase(getCapsulePlusHeadingData.rejected, (state, action) => {
                state.getCapsulePlusCompanyHeadingObj.loading = false;
                state.getCapsulePlusCompanyHeadingObj.error = true;
            })
    },
});

export const { setCompanyTypeId, setCompanySectorId, setCompanyIndustryId, setCompanyName, setCompanyListEmpty, setCompanyList, setCompanyListCurrentPage, setCompanyListTotalList } = capsulePlusSlice.actions

export default capsulePlusSlice.reducer



