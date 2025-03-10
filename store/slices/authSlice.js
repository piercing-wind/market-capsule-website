import { apiEndPoints } from '@/utils/apiEndPoints';
import { getMethod, postMethod } from '@/utils/apiServices';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getFetchAuth = createAsyncThunk('authSlice/getFetchAuth', async () => {
    const response = await getMethod(`${apiEndPoints.authUserDetail}`);
    return (response)
});

export const getProfessionList = createAsyncThunk('authSlice/getProfeessionList', async () => {
    const response = await getMethod(`${apiEndPoints.getProfessionList}`);
    return (response)
});

const loginModalObj = {
    showForm: false,
    authType: "login"
}

const professionDataObj = {
    loader: false,
    professionData: {},
    error: false
}

export const authSlice = createSlice({
    name: 'authSlice',
    initialState: {
        loader: false,
        jwt: '',
        userDetails: {},
        upgradeNow: false,
        userprofile: {
            isDisabled: true
        },
        authenticationPaths: ['verify'],
        protectedRoutes: ['/subscription', "/account-settings", "/manage-subscription", "/notifications"],

        loginModal: loginModalObj,
        professionDataObj
    },
    reducers: {
        setResetSlice: (state, action) => {
            state.jwt = '';
            state.userDetails = {}
        },
        setUpdateJwtToken: (state, action) => {
            state.jwt = action.payload
        },
        setUpdateProfileDetails: (state, action) => {
            state.userDetails = action.payload
        },
        setResetLoader: (state, action) => {
            state.loader = action.payload
        },
        setIsUpdateProfile: (state, action) => {
            state.userprofile.isDisabled = action.payload
        },

        setShowForm(state, action) {
            state.loginModal.showForm = action.payload
        },
        setAuthType(state, action) {
            state.loginModal.authType = action.payload
        },
        setUpgradeNow(state, action) {
            state.upgradeNow = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getFetchAuth.pending, (state, action) => {
                state.loader = true;
            })
            .addCase(getFetchAuth.fulfilled, (state, action) => {
                state.loader = false;
                state.userDetails = action.payload
            })
            .addCase(getFetchAuth.rejected, (state, action) => {
                state.loader = false;
                state.error = true;
            })
            .addCase(getProfessionList.pending, (state, action) => {
                state.professionDataObj.loader = true;
            })
            .addCase(getProfessionList.fulfilled, (state, action) => {
                state.professionDataObj.loader = false;
                state.professionDataObj.professionData = action.payload
            })
            .addCase(getProfessionList.rejected, (state, action) => {
                state.professionDataObj.loader = false;
                state.professionDataObj.error = true;
            });
    }
});

export const { setUpgradeNow, setShowForm, setAuthType, setResetSlice, setUpdateJwtToken, setUpdateProfileDetails, setResetLoader, setIsUpdateProfile } = authSlice.actions

export default authSlice.reducer

export const socialLoginApi = async (data = {}, success, error) => {
    new Promise((resolve, reject) => {
        postMethod(`authentication/socialLogin`, (data)).then((response) => {
            if (response?.error?.status) {
                error({ success: false, message: response?.error?.message })
            } else {
                success({ success: true, message: response?.message, data: response?.data })
            }
        })
    })
}