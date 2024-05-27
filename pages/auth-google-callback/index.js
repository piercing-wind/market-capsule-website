import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router';
import { getMethod } from '@/utils/apiServices';
import { setCookiesStorage } from '@/utils/storageService';
const AuthGoogleCallback = () => {
    const [auth, setAuth] = useState("");
    const router = useRouter()
    console.log("router", router)
    // useEffect(() => {
    //     if (router?.query?.id_token) {
    //         setCookiesStorage("_jwt", router?.query?.id_token)
    //         window.open("/", "_self");
    //     }

    // }, [router?.query?.id_token])
    useEffect(() => {
        if (!router?.query?.id_token) {
            return
        }
        axios({
            method: 'GET',
            url: `http://localhost:1337/auth/google/callback?${router?.query?.id_token}`,
        })
            .then((res) => res.data)
            .then(setAuth)
    }, [router?.query?.id_token])

    return (
        <div>
            {auth && (
                <>
                    <div>Jwt: {auth.jwt}</div>
                </>
            )}
        </div>
    )
}

export default AuthGoogleCallback