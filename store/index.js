import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import authSlice from './slices/authSlice';
import subscriptionSlice from './slices/subscriptionSlice';
import homePageSlice from './slices/homePageSlice';
import notificationSlice from './slices/notificationSlice';
import searchResultsSlice from './slices/searchResultsSlice';
const rootReducer = combineReducers({
    authSlice: authSlice,
    subscriptionSlice: subscriptionSlice,
    homePageSlice,
    notificationSlice,
    searchResultsSlice
});


const makeStore = () => configureStore({
    reducer: rootReducer
});

export const wrapper = createWrapper(makeStore);