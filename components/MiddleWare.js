import { getFetchAuth, setResetLoader, setUpdateJwtToken, setResetSlice, setShowForm } from "@/store/slices/authSlice";
import { getCookiesStorage } from "@/utils/storageService";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAuthorizationToken } from "@/utils/apiServices";
import LoderModule from "./Module/LoaderModule";

const MiddleWare = ({ children }) => {
  const router = useRouter();
  const { pathname } = router;

  const authSlice = useSelector((state) => state.authSlice);
  const { authenticationPaths, loader, protectedRoutes, loginModal, userDetails } = authSlice;
  const dispatch = useDispatch();
  useEffect(() => {
    const token = getCookiesStorage("_jwt");
    const isAuthenticated = Boolean(token);
    const isProtectedRoute = protectedRoutes?.includes(pathname);
    const isAuthenticationPath = authenticationPaths?.includes(loginModal?.authType);

    if (isAuthenticated) {
      setAuthorizationToken(token);
      dispatch(setUpdateJwtToken(token));
      const length = Object?.keys(userDetails)?.length;

      if (length === 0) {
        dispatch(getFetchAuth());
      }
      dispatch(setResetLoader(false));

      if (isAuthenticationPath) {
        // window.open(window.location.pathname, "_self");
      }
    } else {
      setAuthorizationToken('');
      dispatch(setUpdateJwtToken(''));
      dispatch(setResetLoader(false));
      dispatch(setResetSlice());

      if (isProtectedRoute) {

        window.open("/", "_self");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, loginModal?.authType, pathname, router]);

  return (
    <>{children}{loader ? <LoderModule /> : null}</>
  )
}
export default MiddleWare;