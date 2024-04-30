import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import authSlice from './slices/authSlice';
import subscriptionSlice from './slices/subscriptionSlice';
import homepageSlice from './slices/homepageSlice';
const rootReducer = combineReducers({
    authSlice: authSlice,
    subscriptionSlice: subscriptionSlice,
    homepageSlice
});


const makeStore = () => configureStore({
    reducer: rootReducer
});

export const wrapper = createWrapper(makeStore);