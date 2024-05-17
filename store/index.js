import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import authSlice from './slices/authSlice';
import subscriptionSlice from './slices/subscriptionSlice';
import homePageSlice from './slices/homePageSlice';
import notificationSlice from './slices/notificationSlice';
import searchResultsSlice from './slices/searchResultsSlice';
import screenerSlice from './slices/screenerSlice';
const rootReducer = combineReducers({
    authSlice: authSlice,
    subscriptionSlice: subscriptionSlice,
    homePageSlice,
    notificationSlice,
    searchResultsSlice,
    screenerSlice
});


const makeStore = () => configureStore({
    reducer: rootReducer
});

export const wrapper = createWrapper(makeStore);