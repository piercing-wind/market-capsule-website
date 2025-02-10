// import { getFetchAuth, setUpdateJwtToken } from '@/store/slices/authSlice';
import { setAuthorizationToken } from '@/utils/apiServices';
import { parse } from 'cookie';
import React, { createContext, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';

const generateUniqueIdOnServer = () => {
    const uniqueId = uuidv4();
    return uniqueId;
};

const SSRContext = createContext();
export const SSRProvider = ({ children }) => {
    const uniqueId = generateUniqueIdOnServer();

    return (
        <SSRContext.Provider value={uniqueId}>
            {children}
        </SSRContext.Provider>
    );
};

export const useSSRId = () => {
    const uniqueId = useContext(SSRContext);
    return uniqueId;
};

export const middleWareSSRAuth = async (req, store) => {
    const rawCookies = req?.headers?.cookie || '';
    const cookies = parse(rawCookies);
    if (cookies?._jwt) {
        setAuthorizationToken(cookies?._jwt);
        await store.dispatch(setUpdateJwtToken(cookies?._jwt))
        await store.dispatch(getFetchAuth())
    }
}