import "@/styles/globals.scss";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from "react-redux";
import { wrapper } from "@/store";
import { appWithTranslation } from "next-i18next";
import { Plus_Jakarta_Sans } from "next/font/google";
import clsx from "clsx";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import MiddleWare from "@/components/MiddleWare";
import SeoHeader from "@/seo/SeoHeader";
import { GoogleOAuthProvider } from "@react-oauth/google";

const NavbarLayout = dynamic(() => import('@/components/Module/Navbar/Navbar'))
const Navbar404 = dynamic(() => import('@/components/Module/Navbar/Navbar404'))
const Footer = dynamic(() => import('@/components/Module/footer'))

const Toaster = dynamic(
  () => import("react-hot-toast").then((c) => c.Toaster),
  {
    ssr: false,
  }
);
const plus_Jakarta_Sans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
});

const App = ({ Component, ...rest }) => {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;
  const router = useRouter()
  const validPaths = [
    "/subscription/payment-successfull",
    "/subscription/payment-failure",
  ];
  const isSpecialPath = validPaths.includes(router.asPath);
  

  return (
    <Provider store={store}>
      <GoogleOAuthProvider clientId={process.env.GOOGLE_CLIENT_ID}>
        <MiddleWare>
          <SeoHeader
            {...(pageProps?.seo ? pageProps?.seo : "")}
            backUrl={rest?.router?.pathname ? ((rest?.router?.asPath)) : "/"}
          />
          <main className={clsx(plus_Jakarta_Sans.className, !isSpecialPath ? "gray-bg" : "")}>
            {
              router?.pathname !== "/404" ? (
                <NavbarLayout />
              ) : (
                <Navbar404 />
              )
            }
            <Component {...pageProps} />
            <Footer/>
          </main>

          <Toaster
            position="bottom-center"
            reverseOrder={true}
            containerClassName="toasterCss"
          />
        </MiddleWare>
      </GoogleOAuthProvider>
    </Provider>
  )
}

export default appWithTranslation(App);