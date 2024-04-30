import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import authSlice from './slices/authSlice';
import subscriptionSlice from './slices/subscriptionSlice';
const rootReducer = combineReducers({
    authSlice: authSlice,
    subscriptionSlice: subscriptionSlice
});


const makeStore = () => configureStore({
    reducer: rootReducer
});

export const wrapper = createWrapper(makeStore);