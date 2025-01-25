import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import authSlice from './slices/authSlice';
import subscriptionSlice from './slices/subscriptionSlice';
import homePageSlice from './slices/homePageSlice';
import notificationSlice from './slices/notificationSlice';
import searchResultsSlice from './slices/searchResultsSlice';
import screenerSlice from './slices/screenerSlice';
import screenerIdSlice from './slices/screenerIdSlice';
import watchListSlice from './slices/watchListSlice';
import manageSubscriptionSlice from './slices/manageSubscriptionSlice';
import screenerSlugDetailSlice from './slices/screenerSlugDetailSlice';
import ipoDetailSlice from './slices/ipoDetailSlice';
import capsuleDetailSlice from './slices/capsuleDetailSlice';
import ipoSlice from './slices/ipoSlice';
import capsulePlusSlice from './slices/capsulePlusSlice';
import privacyPolicySlice from './slices/privacyPolicySlice';
import termsAndConditionsSlice from './slices/termsAndConditionsSlice';
import feedDetailSlice from './slices/feedDetailSlice';
import summitSlice  from './slices/summitSlice';
import summitVideoSlice from "./slices/summitVideoSlice"

const rootReducer = combineReducers({
    authSlice: authSlice,
    subscriptionSlice: subscriptionSlice,
    homePageSlice,
    notificationSlice,
    searchResultsSlice,
    screenerSlice,
    screenerIdSlice,
    watchListSlice,
    manageSubscriptionSlice,
    screenerSlugDetailSlice,
    ipoDetailSlice,
    capsuleDetailSlice,
    ipoSlice,
    capsulePlusSlice,
    privacyPolicySlice,
    termsAndConditionsSlice,
    feedDetailSlice,
    summitSlice,
    summitVideoSlice
});


const makeStore = () => configureStore({
    reducer: rootReducer
});

export const wrapper = createWrapper(makeStore);