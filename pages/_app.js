import "@/styles/globals.scss";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from "react-redux";
import { wrapper } from "@/store";
import { appWithTranslation } from "next-i18next";
import { Plus_Jakarta_Sans } from "next/font/google";
import clsx from "clsx";
import toast from 'react-hot-toast';
import dynamic from "next/dynamic";
import { useReducer } from "react";
import { useRouter } from "next/router";
const NavbarLayout = dynamic(() => import('@/components/Module/Navbar/Navbar'))
const Navbar404 = dynamic(() => import('@/components/Module/Navbar/Navbar404'))

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
  console.log("router", router)
  return (

    <Provider store={store}>

      <main className={clsx(`${plus_Jakarta_Sans.className}`, "gray-bg")}>

        {
          router?.pathname !== "/404" ? (
            <NavbarLayout />

          ) : (
            <Navbar404 />

          )
        }
        <Component {...pageProps} />
      </main>
      <Toaster
        position="bottom-center"
        reverseOrder={true}
        containerClassName="toasterCss"
      />
    </Provider>

  )
}

export default appWithTranslation(App);